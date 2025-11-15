export default class Item {
    type = "";
    name = "";
    value = 0;
    stinging = false;
    stingingRounds = 0;

    constructor(name, value, stinging = false, stingingRounds = 0) {
        this.name = name;
        this.value = value;
        this.stinging = stinging;
        this.stingingRounds = this.stinging ? stingingRounds : 0;
    }
}