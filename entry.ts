import { ImageResource, MTSContentPack, MTSContentPackBuilder } from "./src";
import path from 'node:path'
import { InstrumentComponentJSON, InstrumentJSON } from "./src/json/instrument";
import { GeneralJSON } from "./src/json/general";
import { asset } from "./assets";
import { AnimationJSON, AnimationType } from "./src/json/animation";

//now let's create my content packs
const motorsports = new MTSContentPack({
    packId: "f1_racing_equipment",
    packName: "F1 Racing Equipment",
});

//let's create a new instrument first.
const InstrumentAircraftADF = new InstrumentJSON({
    components: [
        //basically a layer.
        new InstrumentComponentJSON({
            textureXCenter: 128,
            textureYCenter: 960,
			textureWidth: 40,
			textureHeight: 56,
            overlayTexture: true,
            animations: [
                new AnimationJSON({
                    animationType: AnimationType.Translation,
                    variable: 'engine_gear',
                    axis: [80, 0, 0],
                    clampMax: 720, clampMin: -80
                })
            ]
        })
    ],

    general: new GeneralJSON({
        name: "Gear Indicator",
        description: "Indicates current Gear",
        materialLists: [
            ["oredict:ingotIron:1", "oredict:dyeRed:1", "oredict:dyeBlue:1", "oredict:dyeWhite:4"]
        ]
    }),
    textureName: asset("/instruments.png")
})

motorsports.instruments.push(InstrumentAircraftADF)

const builder = new MTSContentPackBuilder({
    contentPacks: [motorsports],
    vingette: new ImageResource("motorsports_vingette.png"),
    name: "F1_racing_equipment"
});

//do not touch this
builder.build(
    path.join(process.cwd())
);