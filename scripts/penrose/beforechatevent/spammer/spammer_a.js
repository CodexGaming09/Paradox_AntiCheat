import * as Minecraft from "mojang-minecraft";
import { flag, getTags } from "../../../util.js";

const World = Minecraft.World;
const Commands = Minecraft.Commands;

const SpammerA = () => {
    World.events.beforeChat.subscribe(msg => {

        const player = msg.sender;

        // get all tags of the player
        let playerTags = getTags(player);

        // Spammer/A = checks if someone sends a message while moving and on ground
        if (playerTags.includes('moving') && playerTags.includes('ground') && !playerTags.includes('jump')) {
            try {
                Commands.run(`testfor @a[name="${player.nameTag}",tag=moving,tag=ground,tag=!jump]`, World.getDimension("overworld"));
                flag(player, "Spammer", "A", "Movement", false, false, true, msg);
            } catch (error) {}
        }
    })
}

export { SpammerA }