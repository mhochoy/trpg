import Attack from '../attack.js'

export default class Slash extends Attack {
    constructor(damageBoost) {
        super("Slash", 7 * damageBoost, 20);
    }
}