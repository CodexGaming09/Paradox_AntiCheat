tellraw @s[tag=!secureOpped] {"rawtext":[{"text":"\n§r§4[§bSecure Network§4]§r §7You are now op!"}]}
tag @s[type=player,tag=!secureOpped] add secureOpped
tellraw @a[tag=secureOpped] {"rawtext":[{"text":"\n§r§4[§bSecure Network§4]§r "},{"selector":"@s"},{"text":" is now Secure Network-Opped."}]}
