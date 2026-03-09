import { mkdirSync, writeFileSync } from 'node:fs'

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
    
    private fileStructure = 0; //this is by default
    packDetails: MTSContentPackConstructorTypes;

    constructor(packDetails: MTSContentPackConstructorTypes) {
        this.packDetails = packDetails;
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
    build() {

        

    }

}