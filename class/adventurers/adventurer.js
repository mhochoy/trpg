import Attack from "../attacks/attack.js";
import Weapon from "../items/weapons/weapon.js";

export default class Adventurer {
    type = null;
    name = "";
    level = 1;
    experience = 0;
    health = 50;
    defence = 10;
    attacks = [];
    items = [];

    effectedBy = null;
    effectedTime = 0;

    value = "";

    constructor(name, attacks, items, health = 50, level = 1, defence = 10) {
        this.name = name;
        this.health = health * level;
        this.attacks = attacks;
        this.items = items;
        this.level = level;
        this.defence = defence * level;
        this.value = this.name;
    }

    reset() {
        this.health = 50 * this.level;
    }

    roundUpdate() {
        // Handle Bleeding Effects
        this.handleBleedingEffect();
    }

    handleBleedingEffect() {
        if (this.effectedBy && this.effectedTime <= this.effectedBy.stingingRounds) {
            if (this.effectedTime == 0) {
                // This is done so the bleeding effects don't begin immediately
                this.effectedTime += 1;
                return;
            }
            else if (this.effectedBy instanceof Attack) {
                const damage = Math.floor(this.effectedBy.damage / 4);
                this.takeDamage(damage);

                console.log("EFF:      " + this.name + " has taken " + damage + " bleed damage!");
            }
            else if (this.effectedBy instanceof Weapon) {
                const damage = Math.floor(this.effectedBy.value / 4);
                this.takeDamage(damage);

                console.log("EFF:      " + this.name + " has taken " + damage + " bleed damage!");
            }

            this.effectedTime += 1;
        }
        else if (this.effectedBy && this.effectedTime > this.effectedBy.stingingRounds) {
            this.effectedBy = null;
            this.effectedTime = 0;
        }
        else {

        }
    }

    takeDamage(value) {
        if (this.health - value < 0) {
            this.health = 0;
        }
        else {
            this.health -= value;
        }
    }

    giveAttack(attack) {
        this.attacks.push(attack);
    }

    giveExperience(value) {
        this.experience += value;
    }

    giveIteem(item) {
        this.items.push(item);
    }

    levelUp(choice) {
        if (choice == "ATK") {
            this.attack = this.attack * 1.5;
        }
        else if (choice == "SPD") {
            this.speed = this.speed * 1.25;
        }

        level += 1;
    }

    print() {
        console.log(this.name + ", the adventurer:");
        console.log("   Level: " + this.level);
        console.log("   Experience: " + this.experience);
        console.log("   Health: " + this.health);
        console.log("   Speed: " + this.speed);
        console.log("   Attacks: " + this.attacks.length + ": ");
        for (var attack of this.attacks) {
            console.log("       Attack: " + attack.name + " | Damage: " + attack.damage + " | Crit Chance: " + attack.criticalChance + " | Bleeding: " + attack.stinging + (attack.stinging ? " | Bleed Time: " + attack.stingingRounds  + " Rounds": ""));
        }
    }

    printAttacks() {
        let counter = 0;
        for (var attack of this.attacks) {
            console.log((counter + 1) + ") " + "Attack: " + attack.name + " | Damage: " + attack.damage + " | Crit Chance: " + attack.criticalChance + " | Bleeding: " + attack.stinging + (attack.stinging ? " | Stinging Rounds: " + attack.stingingRounds + " Rounds": ""));
            counter += 1;
        }
    }

    getSaveData() {
        const items = [];

        if (this.items && this.items.length > 0) {
            for (let item of this.items) {
                items.push(item.type);
            }
        }

        const data = {
            "name": this.name,
            "type": this.type,
            "level": this.level,
            "experience": this.experience,
            "health": this.health,
            "defence": this.defence,
            "items": items,
            "value": this.value
        };

        return data;
    }
}