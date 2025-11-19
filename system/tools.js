import { readFile, writeFile } from 'fs/promises';
import Warrior from '../class/adventurers/warrior.js';
import Mage from '../class/adventurers/mage.js';

import { select } from '@inquirer/prompts';

export function generateRandomNumber(minimum, maximum) {
    const min = Math.ceil(minimum); // rounds up
    const max = Math.floor(maximum); // rounds down

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function saveAdventurer(adventurer) {
    let saveMap = await getAdventurers();
    

    if (saveMap == null) {
        console.log("SYS:   " + "Creating a new save file...");
        const adventurers = [];
        adventurers.push(adventurer.getSaveData());
        saveMap = {
            "adventurers": adventurers
        }
    }
    else {
        let data = saveMap["adventurers"];
        const oldSave = await getAdventurerData(adventurer.name);

        console.log("SYS:   Saving...");

        if (oldSave != undefined) {
            const decision = await select({
                message: "A save has been found for this adventurer. Overwrite?",
                choices: [
                    {
                        name: "Yes",
                        value: true
                    },
                    {
                        name: "No",
                        value: false
                    }
                ]
            })

            if (decision == true) {
                data = data.map(save => {
                    if (save["name"] == adventurer.name) {
                        return adventurer.getSaveData();
                    }

                    return save;
                });

                console.log("SYS:   " + "Save overwritten!")
            }
        }
        else if (oldSave == undefined) {
            data.push(adventurer.getSaveData());
        }
        
        saveMap = {
            "adventurers": data
        }
    }
    
    await writeFile('adventurers.sav', JSON.stringify(saveMap, null, 2));
}

async function getAdventurerData(name) {
    const saveData = await getAdventurers();
    const data = saveData["adventurers"];

    const adventurer = data.find(adventurer => adventurer.name === name);

    return adventurer;
}

export async function getAdventurer(name) {
    const playerData = await getAdventurerData(name);
    
    if (playerData.type === "Warrior") {
        const player = new Warrior(playerData.name, playerData.items, playerData.level);
        player.experience = playerData.experience;

        return player;
    }
    else if (playerData.type === "Mage") {
        const player = new Mage(playerData.name, playerData.items, playerData.level);
        player.experience = playerData.experience;

        return player;
    }
}

export async function getAdventurers() {
    let saveData = await loadAdventurers();

    if (saveData == null) {
        return null;
    }
    else {
        return JSON.parse(saveData);
    }
}

export async function loadAdventurers() {
    try {
        const saveData = await readFile("adventurers.sav", { encoding: 'utf8' });

        return saveData;
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            console.error("SYS:    " + "No save file found...");
        }
        else {
            console.error("ERR:  ", error)
        }

        return null;
    }
}