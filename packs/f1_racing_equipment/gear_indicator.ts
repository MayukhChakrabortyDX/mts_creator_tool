import { asset } from "@packs/assets";
import { AnimationJSON, AnimationType } from "@tools/json/animation";
import { GeneralJSON } from "@tools/json/general";
import { InstrumentComponentJSON, InstrumentJSON } from "@tools/json/instrument";

//Example of A simple Instrument
export default new InstrumentJSON({
    //* This shows the icon in the hud.
    icon: asset("/gear_indicator_icon.png"),
    
    components: [
        new InstrumentComponentJSON({
            textureXCenter: 128,
            textureYCenter: 960,
            textureWidth: 40,
            textureHeight: 56,
            animations: [
                new AnimationJSON({
                    animationType: AnimationType.Translation,
                    axis: [80, 0, 0],
                    variable: "engine_gear",
                    clampMax: 720,
                    clampMin: -80
                }),
            ]
        })
    ],

    //Asset from GustNov's Motosports: https://modrinth.com/mod/gustnovs-motorsport
    //assets are stored in packs/res folder.
    //if packs are not visible, use `bun run dev` to generate them.
    textureName: asset("/instruments.png"),
    general: new GeneralJSON({
        name: "Gear Indicator",
        description: "Indicates Current Gear",
        materialLists: [[
            "oredict:ingotIron:1",
            "oredict:dyeRed:1",
            "oredict:dyeBlue:1",
            "oredict:dyeWhite:4"
        ]]
    }),
})