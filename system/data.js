import Warrior from "../class/adventurers/warrior.js";
import Mage from "../class/adventurers/mage.js";

import { 
    getAdventurer,
    loadAdventurers
 } from "./tools.js";

 import {
    input,
    select
 } from '@inquirer/prompts';

async function loadAdventurerFromSave(data) {
    const name = await select({
        message: "Choose from your saved adventurer",
        choices: JSON.parse(data)["adventurers"]
    });
    const player = await getAdventurer(name);

    return player 
}

export async function chooseAdventurer() {
    const saveData = await loadAdventurers();
    return await loadAdventurerFromSave(saveData);
}

export async function createNewAdventurer() {
    const name = await input({
        message: "What is your name, adventurer?"
    });

    const choice = await select({
        message: "Choose your class",
        choices: [
            {
                name: "Warrior",
                value: Warrior,
            },
            {
                name: "Mage",
                value: Mage
            }
        ]
    });

    const player = new choice(name);

    return player;
}

export async function handleData() {
    const saveData = await loadAdventurers();
    if (saveData == null) {
        return await createNewAdventurer();
    }
    else {
        return await loadAdventurerFromSave(saveData);
    }
}