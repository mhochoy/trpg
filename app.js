// Adventurers
import Warrior from "./class/adventurers/warrior.js"
import Mage from "./class/adventurers/mage.js";

// Potions
import Health from "./class/items/potions/health.js"
import Strength from "./class/items/potions/strength.js"

// System
import fight from "./system/fight.js";
import { 
    generateRandomNumber,
    getAdventurer,
    saveAdventurer,
    loadAdventurers
 } from "./system/tools.js";

// Inquirer Prompts
import { 
    input, 
    select, 
    Separator 
} from '@inquirer/prompts';

let player = null;
let fights = 0;
let wins = 0;
let losses = 0;

async function app() {
    console.log("Welcome adventurer!");

    await handleData();
    await handleMenu();
}

async function handleData() {
    const saveData = await loadAdventurers();
    if (saveData == null) {
        await createNewAdventurer();
    }
    else {
        await loadAdventurerFromSave(saveData);
    }
}

async function loadAdventurerFromSave(data) {
    console.log("SYS:   " + "Save data found!");
    console.log();
    const name = await select({
        message: "Choose from your saved adventurer",
        choices: JSON.parse(data)["adventurers"]
    });

    player = await getAdventurer(name);
}

async function createNewAdventurer() {
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

    player = new choice(name);
}

async function handleMenu() {
    let choice = await getPlayerChoice();

    while (choice != 5) {
        if (choice == 1) {
            let currentSteps = 1;
            const stepsUntilNextEncounter = generateRandomNumber(2, 7);

            const results = await handleExploration(currentSteps, stepsUntilNextEncounter);
        }
        else if (choice == 2) {
            await createNewAdventurer();
            await (saveAdventurer(player));
        }
        else if (choice == 3) {
            const name = await select({
                message: "Choose your adventurer",
                choices: JSON.parse(await loadAdventurers())["adventurers"]
            });
        }
        else if (choice == 4) {
            console.log("Save");
            await saveAdventurer(player);
        }

        choice = await getPlayerChoice();
    }
}

async function handleExploration(currentSteps, stepsUntilNextEncounter) {
    while (currentSteps != 0) {
        const stepChoice = await select({
            message: "Continue on or take a step back home?" + (currentSteps > 1 ? " You are " + currentSteps + " steps in." : ""),
            choices: [
                {
                    name: "Continue",
                    value: 1
                },
                {
                    name: "Go back",
                    value: -1
                }
            ]
        });

        currentSteps += stepChoice;
        if (currentSteps == stepsUntilNextEncounter) {
            console.log("!!! You've encountered an enemy !!!");
            fights += 1;
            const result = await fight(player, new Warrior("Enemy Guy", currentSteps % 10 == 0 ? currentSteps / 10 : Math.ceil(currentSteps / 10)));
            if (result == true) {
                wins += 1;
            }
            else {
                losses += 1;
                currentSteps = 0;
            }

            player.reset();
            stepsUntilNextEncounter = generateRandomNumber(currentSteps + 1, currentSteps + 10);
        }
    }

    return {"fights": fights, "wins": wins, "losses": losses};
}

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

app();