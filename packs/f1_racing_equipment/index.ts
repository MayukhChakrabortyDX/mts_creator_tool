import { MTSContentPack, MTSContentPackBuilder } from "@tools/index";
import gear_indicator from "./gear_indicator";

const defaultPack = new MTSContentPack({
    packId: "f1_racing_equipments",
    packName: "F1 Racing Equipments",
})

defaultPack.instruments.push(
    gear_indicator
)

export default new MTSContentPackBuilder({
    contentPacks: [defaultPack],
    fileName: "f1_racing_equip"
})