import { mkdir, mkdirSync, writeFileSync, existsSync, open } from 'node:fs'
import path from 'node:path';
import {$} from 'bun'

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
    components = {
        vehicles: [],
        parts: [],
        bullets: [],
        panels: [],
        instruments: [],
        decors: [],
        roads: [],
        poles: [],
        signs: [],
        skins: []
    }

    constructor(packDetails: MTSContentPackConstructorTypes) {
        this.packDetails = packDetails;
    }

    addVehicle() {

    }

    addParts() {

    }

    addBullets() {

    }

    addPanels() {

    }
    
    addInstruments() {

    }

    addDecors() {

    }

    addRoads() {

    }

    addPoles() {

    }

    addSigns() {

    }

    addSkins() {

    }
    
}

export class MTSContentPackBuilder {

    private contentPacks: MTSContentPack[] = [];
    private vingette: ImageResource;
    private name: string;

    constructor(builderProps: { contentPacks: MTSContentPack[]; vingette: ImageResource, name: string }) {
        this.contentPacks = builderProps.contentPacks;
        this.vingette = builderProps.vingette;
        this.name = builderProps.name;
    }
    
    //builds the content pack.
    async build(the_path: string) {


        let out_path: string = path.join(the_path, 'output')

        if ( !existsSync(out_path) ) {
            mkdirSync(out_path)
        }

        the_path = out_path

        //create the file
        mkdirSync(path.join(the_path, this.name))
        mkdirSync(path.join(the_path, this.name, 'assets'))

        for ( let content of this.contentPacks ) {
            
            mkdirSync(path.join(the_path, this.name, content.packDetails.packId))
            mkdirSync(path.join(the_path, this.name, 'assets', content.packDetails.packId))

            writeFileSync(path.join(the_path, this.name, content.packDetails.packId, 'packdefinition.json'), JSON.stringify({

                packID: content.packDetails.packId,
                packName: content.packDetails.packName,
                fileStructure: 0

            }))

        }
        //now we will create the java file basically (jar)
        await $`cd output && jar cf ${this.name}.jar -C ${this.name} .`

    }

}