//const prompt = require('prompt-sync')();

import {generateRandomNumber} from './tools.js';
import promptSync from 'prompt-sync';
import { 
    input, 
    select, 
    Separator 
} from '@inquirer/prompts';

const prompt = promptSync();

export default async function fight(adventurer, opponent) {
    console.log("Let the battle begin!");

    while (adventurer.health > 0 && opponent.health > 0) {
        // Handle Updates at the beginning of each round
        adventurer.roundUpdate();
        opponent.roundUpdate();

        if (adventurer.health == 0 || opponent.health == 0) { // Not clean. 
            break;
        }

        console.log("INFO:  " + "Your Health: " + adventurer.health);
        console.log("INFO:  " + "Opponent Health: " + opponent.health);

        await handleDecision(await options(), adventurer, opponent);
    }

    if (adventurer.health > opponent.health) {
        const expGain = 25 * opponent.level;
        console.log("INFO:  " + adventurer.name + " wins!");
        adventurer.giveExperience(expGain);
        console.log("INFO:  " + "You've gained " + expGain + " experience!");
        return true;
    }
    else if (adventurer.health < opponent.health) {
        console.log("INFO:  " + opponent.name + " wins!");
        return false;
    }
    else {
        console.log("Draw, somehow!");
    }
}

async function options() {
    let choice = await select({
        message: "What will you do?",
        choices: [
            {
                value: 1,
                name: "Attack"
            },
            {
                value: 2,
                name: "Defend"
            },
            {
                value: 3,
                name: "Use Item"
            },
            {
                value: 4,
                name: "Run Away"
            }
        ]
    });

    return choice;
}

async function handleDecision(choice, adventurer, opponent) {
    if (choice == "1") {
        const opponentChoice = getBotDecision(1, 2);
        const attack = await selectPlayerAttack(adventurer);

        determineAttackVs(opponentChoice, adventurer, attack, opponent);
    }
    else if (choice == "4") {
        adventurer.health = 0;
    }
}

async function determineAttackVs(opponentChoice, adventurer, attack, opponent) {
    if (opponentChoice == 1) {
            const opponentAttack = opponent.attacks[getBotDecision(0, opponent.attacks.length - 1)];
            console.log("OPP:  " + opponent.name + " has chosen to attack using " + opponentAttack.name);
            if (attack.damage > opponentAttack.damage) {
                let difference = attack.damage - opponentAttack.damage;

                const critResult = generateRandomNumber(0, 100);

                if (critResult <= attack.criticalChance) {
                    console.log("EFF:      " + "CRITICAL DAMAGE");
                    difference = difference * 2;
                }
                
                console.log("RES:      " + "You've damaged " + opponent.name + " for " + difference + " HP!");

                if (attack.stinging && opponent.effectedBy == null) {
                    opponent.effectedBy = attack;
                }

                opponent.takeDamage(difference);
            }
            else if (attack.damage < opponentAttack.damage) {
                let difference = opponentAttack.damage - attack.damage;

                const critResult = generateRandomNumber(0, 100);

                if (critResult <= opponentAttack.criticalChance) {
                    console.log("EFF:      " + "CRITICAL DAMAGE");
                    difference = difference * 2;
                }
                
                console.log("RES:      " + "You've taken " + difference + " HP damage!");

                if (opponentAttack.stinging && adventurer.effectedBy == null) {
                    adventurer.effectedBy = opponentAttack;
                }

                adventurer.takeDamage(difference);
            }
            else {
                console.log("RES:      " + "---CLASH!---");
                console.log("RES:      " + "No damage given!");
                console.log();
            }
        }
        else if (opponentChoice == 2) {
            console.log("OPP:  " + opponent.name + " has chosen to defend.");
            if (attack.damage > opponent.defence) {
                let difference = attack.damage - opponent.defence;

                const critResult = generateRandomNumber(0, 100);

                if (critResult <= attack.criticalChance) {
                    console.log("EFF:      " + "CRITICAL DAMAGE");
                    difference = difference * 2;
                }
                
                console.log("RES:      " + "You've damaged " + opponent.name + " for " + difference + " HP!");

                if (attack.stinging && opponent.effectedBy == null) {
                    opponent.effectedBy = attack;
                }

                opponent.takeDamage(difference);
            }
            else if (attack.damage < opponent.defence) {
                const difference = opponent.defence - attack.damage;
                
                console.log("RES:      " + "You've taken " + difference + " HP damage!");

                adventurer.takeDamage(difference);
            }
            else {
                console.log("RES:      " + "---CLASH!---");
                console.log("RES:      " + "No damage given!");
                console.log();
            }
        }
        else {
            console.log("Unhandled Condition.");
            console.log("Opponent choice was: " + opponentChoice);
        }
}

async function selectPlayerAttack(adventurer) {
    let attack = null;
    if (adventurer.attacks.length > 1) {
        console.log();

        attack = await select({
            message: "Choose Your Attack: ",
            choices: adventurer.attacks,
        })
    }
    else {
        attack = adventurer.attacks[0];
    }

    return attack;
}

function getBotDecision(base, limit) {
    const choice = generateRandomNumber(base, limit);

    return choice;
}