import { 
    select,
 } from "@inquirer/prompts";

import { 
    chooseAdventurer
 } from "./data.js";

 import { 
    handleExploration,
 } from "./exploration.js";

 import { 
    saveAdventurer,
    loadAdventurers,
    generateRandomNumber,
 } from "./tools.js";

 import { 
    createNewAdventurer,
 } from "./data.js";

async function getPlayerChoice() {
    const choice = await select({
        message: "What will you do?",
        choices: [
            {
                name: "Explore",
                value: 1,
            },
            {
                name: "Create New Adventurer",
                value: 2,
            },
            {
                name: "Switch Adventurer",
                value: 3
            },
            {
                name: "Save",
                value: 4
            },
            {
                name: "Quit",
                value: 5
            }
        ]
    });

    return choice;
}

export async function handleMenu(player) {
    let choice = await getPlayerChoice();

    while (choice != 5) {
        if (choice == 1) {
            let currentSteps = 1;
            const stepsUntilNextEncounter = generateRandomNumber(2, 7);
            const results = await handleExploration(player, currentSteps, stepsUntilNextEncounter);
        }
        else if (choice == 2) {
            player = await createNewAdventurer();
            await (saveAdventurer(player));
        }
        else if (choice == 3) {
            await confirmWithSave(player);
            player = await chooseAdventurer();
            console.log("SYS:   You are now playing as: " + player.name);
        }
        else if (choice == 4) {
            await saveAdventurer(player);
        }

        choice = await getPlayerChoice();
    }
}

async function confirmWithSave(player) {
    const decision = await select({
        message: "Do you want to save first?",
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
    });

    if (decision) {
        await saveAdventurer(player);
    }
    else {
        return;
    }
}

