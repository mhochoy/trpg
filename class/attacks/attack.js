export default class Attack {
    name = "";
    damage = 1;
    stinging = false;
    stingingRounds = 0;
    criticalChance = 10;
    value = this;
    description = ""

    constructor(name, damage, criticalChance, stinging = false, stingingRounds = 0) {
        this.name = name;
        this.damage = damage;
        this.stinging = stinging;
        this.stingingRounds = stinging ? stingingRounds : 0;
        this.criticalChance = criticalChance;
        this.value = this;
        this.description = "| Damage : " + this.damage + " | Crit Chance: " + this.criticalChance + (this.stinging ? " | Bleeder for " + this.stingingRounds + " rounds" : "");
    }
}