import { ImageResource, MTSContentPack, MTSContentPackBuilder } from "./src";

//now let's create my content packs
const motorsports = new MTSContentPack({
    packId: "motorsports_pack",
    packName: "Motorsports Pack",
});
    
//you can now add assets, models, textures, etc. to the content pack using the builder.

const builder = new MTSContentPackBuilder({
    contentPacks: [motorsports],
    vingette: new ImageResource("motorsports_vingette.png"),
    name: "Motorsports Pack"
});

builder.build();