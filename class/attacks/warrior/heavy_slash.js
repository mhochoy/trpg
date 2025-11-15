import Attack from '../attack.js'

export default class HeavySlash extends Attack {
    constructor(damageBoost) {
        super("Heavy Slash", 12 * damageBoost, 5, true, 2); // {name, damage, critChance, stinging, stingingRounds}
    }
}