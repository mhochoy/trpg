import Item from "../item.js";

export default class Potion extends Item {
    constructor(name, strength, lingering = false, lingeringRounds = 0) {
        super(name, strength, lingering, lingeringRounds);
    }
}