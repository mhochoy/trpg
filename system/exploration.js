import fight from "./fight.js";
import Warrior from "../class/adventurers/warrior.js";

import { 
    generateRandomNumber,
 } from "./tools.js";

import { 
    select,
 } from "@inquirer/prompts";

export let fights = 0;
export let wins = 0;
export let losses = 0;

export async function handleExploration(player, currentSteps, stepsUntilNextEncounter) {
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