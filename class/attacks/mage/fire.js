import Attack from "../attack.js";

export default class Fire extends Attack {
    constructor(damageBoost) {
        super("Fire", 3 * damageBoost, 10, true, 3);
    }
}