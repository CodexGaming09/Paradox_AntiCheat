import { world } from "mojang-minecraft";
import config from "../../../data/config.js";
import { onJoinData } from "../../../data/onjoindata.js";
import { getPrefix } from "../../../util.js";

const World = world;

const tickEventCallback = World.events.tick;

// This is to allow passing between functions
let player;

function onJoinTime() {
    // Get Dynamic Property
    let lockdownBoolean = World.getDynamicProperty('lockdown_b');
    if (lockdownBoolean === undefined) {
        lockdownBoolean = config.modules.lockDown.enabled;
    }
    try {
        // Loop until player is detected in the world
        player.runCommand(`testfor @s`);

        // Lock down the server if enabled
        if (lockdownBoolean) {
            let reason = "Under Maintenance! Sorry for the inconvenience.";
            try {
                // Kick players from server
                player.runCommand(`kick ${JSON.stringify(player.name)} ${reason}`);
            } catch (error) {
                // Despawn players from server
                player.triggerEvent('paradox:kick');
            }
            return tickEventCallback.unsubscribe(onJoinTime);
        }

        // We execute each command in the list
        for (let i=0; i < onJoinData.length; i++) {
            try {
                player.runCommand(`${onJoinData[i]}`);
            } catch (error) {}
        }
        // Set up custom tag
        // tagRank(player);
        // Set up custom prefix
        getPrefix(player);
        player.check = true;

    } catch (error) {}
    if (player.check) {
        player.check = false;
        return tickEventCallback.unsubscribe(onJoinTime);
    }
}

const onJoin = () => {
    World.events.playerJoin.subscribe(loaded => {
        // Get the name of the player who is joining
        player = loaded.player;
        // Subscribe tick event to the time function
        tickEventCallback.subscribe(onJoinTime);
    });
};

export { onJoin };