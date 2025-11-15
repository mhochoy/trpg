import Adventurer from "./adventurer.js";

import Fire from "../attacks/mage/fire.js";
import Thunder from "../attacks/mage/thunder.js";

export default class Mage extends Adventurer {
    constructor(name, items=null, level=1) {
        var fire = new Fire(level);
        var thunder = new Thunder(level);

        super(name, [fire, thunder], items);

        this.type = "Mage";
    }
}