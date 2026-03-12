import { mkdir, mkdirSync, writeFileSync, existsSync, open, copyFileSync, rmdirSync, rmSync } from 'node:fs'
import path from 'node:path';
import {$} from 'bun'
import { InstrumentJSON } from './json/instrument';

//a resource will always search in src/res folder.
export class Resource {
    constructor(public url: string) {}
}

export class ImageResource extends Resource {
    constructor(url: string) {
        super(url);
    }
}

export type MTSContentPackConstructorTypes = {
    packId: string; 
    packName: string;
}

export class MTSContentPack {
    
    packDetails: MTSContentPackConstructorTypes;
    instruments: InstrumentJSON[] = []

    constructor(packDetails: MTSContentPackConstructorTypes) {
        this.packDetails = packDetails;
    }
    
}

export class MTSContentPackBuilder {

    private contentPacks: MTSContentPack[] = [];
    private vingette: ImageResource;
    name: string;

    constructor(builderProps: { contentPacks: MTSContentPack[]; vingette: ImageResource, name: string }) {
        this.contentPacks = builderProps.contentPacks;
        this.vingette = builderProps.vingette;
        this.name = builderProps.name;
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
                copyFileSync(
                    path.join(process.cwd(), 'packs/res', instrument.props.textureName), 
                    path.join(path.join(the_path, this.name, 'assets', content.packDetails.packId, 'textures', 'instruments', `${++counter}.png`))
                )

                instrument.props.textureName = `instruments/${counter}.png` //rename because the reference changed.
                //write the instrument json file.
                writeFileSync(path.join(the_path, this.name, 'assets', content.packDetails.packId, 'jsondefs', 'instruments', `${++counter}.json`), JSON.stringify(instrument))
            }
            //copy the texture from the instrument content
        }

    }

}