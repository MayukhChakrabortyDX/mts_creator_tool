import { mkdirSync, writeFileSync, copyFileSync, existsSync } from 'node:fs'
import path from 'node:path';
import { InstrumentJSON } from './json/instrument';
import type { Expand } from './util';

export type MTSContentPackConstructorTypes = {
    packId: string; 
    packName: string;
}

export class MTSContentPack {
    
    packDetails: MTSContentPackConstructorTypes;
    instruments: InstrumentJSON[] = []

    constructor(packDetails: Expand<MTSContentPackConstructorTypes>) {
        this.packDetails = packDetails;
    }
    
}

export class MTSContentPackBuilder {

    private contentPacks: MTSContentPack[] = [];
    private vingette?: string;
    name: string;

    constructor(builderProps: { contentPacks: MTSContentPack[]; vingette?: string, fileName: string }) {
        this.contentPacks = builderProps.contentPacks;
        this.vingette = builderProps.vingette;
        this.name = builderProps.fileName;
    }
    
    //builds the content pack.
    async build(the_path: string) {

        let root = the_path;
        let counter = 0; //used for filenames, guaranteed to be unique

        //create the file
        mkdirSync(path.join(the_path, this.name), { recursive: true })
        mkdirSync(path.join(the_path, this.name, 'assets'), { recursive: true })

        //write the pack definitions first.
        for ( let content of this.contentPacks ) {
            
            mkdirSync(path.join(the_path, this.name, content.packDetails.packId))
            mkdirSync(path.join(the_path, this.name, 'assets', content.packDetails.packId))

            writeFileSync(path.join(the_path, this.name, content.packDetails.packId, 'packdefinition.json'), JSON.stringify({

                packID: content.packDetails.packId,
                packName: content.packDetails.packName,
                fileStructure: 0

            }))

            //now let's start by adding the instruments
            //create the instruments folder first
            mkdirSync(path.join(the_path, this.name, 'assets', content.packDetails.packId, 'jsondefs', 'instruments'), { recursive: true })
            mkdirSync(path.join(the_path, this.name, 'assets', content.packDetails.packId, 'textures', 'instruments'), { recursive: true }) //for the texture
            
            for ( let instrument of content.instruments ) {
                //now copy the texture to the actual texture directory
                const partName = ++counter;
                const textureName = ++counter;

                copyFileSync(
                    path.join(process.cwd(), 'packs/res', instrument.props.textureName), 
                    path.join(path.join(the_path, this.name, 'assets', content.packDetails.packId, 'textures', 'instruments', `${textureName}.png`))
                )

                instrument.props.textureName = `instruments/${textureName}.png` //rename because the reference changed.
                //also see if the instrument has a icon property or not
                if ( instrument.props.icon != undefined ) {
                    
                    //we will use part name
                    if (!existsSync( path.join(the_path, this.name, 'assets', content.packDetails.packId, 'textures', 'items', 'instruments') )) {
                        mkdirSync(path.join(the_path, this.name, 'assets', content.packDetails.packId, 'textures', 'items', 'instruments'), { recursive: true })
                        //now we copy
                        copyFileSync(
                            path.join(process.cwd(), 'packs/res', instrument.props.icon),
                            path.join(the_path, this.name, 'assets', content.packDetails.packId, `textures/items/instruments/${partName}.png`)
                        )
                    }

                }
                //write the instrument json file.
                writeFileSync(path.join(the_path, this.name, 'assets', content.packDetails.packId, 'jsondefs', 'instruments', `${partName}.json`), JSON.stringify(instrument))
            }
        }

    }

}