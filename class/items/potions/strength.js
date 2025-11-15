import Potion from "./potion.js";

export default class Strength extends Potion {
    constructor(strength) {
        name = "";
        if (strength == 15) {
            name = "Strong Strength Potion";
        }
        else {
            name = "Weak Strength Potion";
        }

        super(name, strength);

        this.type = "strength";
    }
}