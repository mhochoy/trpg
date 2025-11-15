import Attack from "../attack.js";

export default class Thunder extends Attack {
    constructor(damageBoost) {
        super("Thunder Storm", 6 * damageBoost, 3, true, 3);
    }
}