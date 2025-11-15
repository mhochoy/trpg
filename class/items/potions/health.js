import Potion from "./potion.js";

export default class Health extends Potion {
    constructor(strength) {
        name = "";
        if (strength == 15) {
            name = "Strong Health Potion";
        }
        else {
            name = "Weak Health Potion";
        }

        super(name, strength);

        this.type = "health";
    }
}