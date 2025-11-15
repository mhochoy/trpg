import Weapon from "./weapon.js";

export default class Bomb extends Weapon {
    constructor(damage) {
        super("Bomb", damage);

        this.type = "Bomb";
    }
}