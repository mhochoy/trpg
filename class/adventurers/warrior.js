import Adventurer from "./adventurer.js";

import Slash from "../attacks/warrior/slash.js";
import HeavySlash from "../attacks/warrior/heavy_slash.js";

export default class Warrior extends Adventurer {
    constructor(name, items=null, level = 1) {
        // Assign attacks...
        var slash = new Slash(level);
        var heavySlash = new HeavySlash(level);

        // ...Initialize base class...
        super(name, [slash, heavySlash], items);

        // ...Then finally handle extras
        this.type = "Warrior";
    }
}