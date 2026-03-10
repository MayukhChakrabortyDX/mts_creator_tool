import { ImageResource, MTSContentPack, MTSContentPackBuilder } from "./src";
import path from 'node:path'
import { resources } from "./assets";

//now let's create my content packs
const motorsports = new MTSContentPack({
    packId: "f1_racing_equipment",
    packName: "F1 Racing Equipment",
});

const builder = new MTSContentPackBuilder({
    contentPacks: [motorsports],
    vingette: new ImageResource("motorsports_vingette.png"),
    name: "F1_racing_equipment"
});

//do not touch this
builder.build(
    path.join(process.cwd())
);