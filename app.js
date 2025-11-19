import { 
    handleData
 } from "./system/data.js";

import { 
    handleMenu
 } from "./system/menu.js";

let player = null;

async function app() {
    console.log("Welcome adventurer!");

    player = await handleData();
    await handleMenu(player);
}


app();