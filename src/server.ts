//generates the assets.ts file on refresh.
//! DO NOT MODIFTY THIS FILE UNLESS YOU KNOW WHAT YOU ARE DOING.

//function to give all the files and folders in a directory. 
import path from 'node:path';
import { readdirSync, writeFileSync } from 'node:fs';

class File {
    constructor(public path: string, public name: string) { }

    toString() {
        return `${this.name.replace(".", "_").replace("-", "_").replace(" ", "_")}: ${JSON.stringify(this.path)}`;
    }
}

class Folder {
    constructor(public path: string, public name: string, public files: File[], public folders: Folder[]) { }

    toString() {

        //get the file strings
        let fileStrings = ""
        let folderStrings = ""

        for (let file of this.files) {
            fileStrings += `${file.toString()},`;
        }

        for (let folder of this.folders) {
            folderStrings += `${folder.toString()},`;
        }

        //conver this to inline string
        return `${this.name.replace(".", "_").replace("-", "_").replace(" ", "_")}: {${fileStrings}${folderStrings != "" ? `${folderStrings}` : ""}$$self: ${JSON.stringify(this.path)}}`;

    }

    toRootString() {
        //get the file strings
        let fileStrings = ""
        let folderStrings = ""

        for (let file of this.files) {
            fileStrings += `${file.toString()},`;
        }

        for (let folder of this.folders) {
            folderStrings += `${folder.toString()},`;
        }

        //conver this to inline string
        return `resources = {${fileStrings}${folderStrings != "" ? `${folderStrings}` : ""}$$self: ${JSON.stringify(this.path)}}`;
    }
}

function getRecursiveFileTree(directory: string): Folder {
    let files: File[] = [];
    let folders: Folder[] = [];
    let items = readdirSync(directory, { withFileTypes: true });
    for (let item of items) {
        if (item.isFile()) {
            files.push(new File(path.join(directory, item.name), item.name));
        } else if (item.isDirectory()) {
            folders.push(getRecursiveFileTree(path.join(directory, item.name)));
        }
    }
    return new Folder(directory, path.basename(directory), files, folders);
}

function generateAssetsFile(root: Folder) {

    let file = `/*!DO NOT TOUCH*/export const ${root.toRootString()}`
    writeFileSync(path.join(process.cwd(), 'assets.ts'), file);

}

function diffChangeTree(old: Folder, newFolder: Folder) {

    //this will detect the following changes:
    // - new file - color green
    // - deleted file - color red
    // - new folder - color blue
    // - deleted folder - color yellow
    // and long them to the console.

    //here is the diff implementation
    //check for new files
    for (let file of newFolder.files) {
        if (!old.files.some(f => f.path === file.path)) {
            //the log color will be green for new files
            //use ansi colors for the console log
            console.log(`\x1b[32mNew file: ${file.path}\x1b[0m`);
        }
    }
    //check for deleted files
    for (let file of old.files) {
        if (!newFolder.files.some(f => f.path === file.path)) {
            //the log color will be red for deleted files
            console.log(`\x1b[31mDeleted file: ${file.path}\x1b[0m`);
        }
    }
    //check for new folders
    for (let folder of newFolder.folders) {
        if (!old.folders.some(f => f.path === folder.path)) {
            //the log color will be blue for new folders
            console.log(`\x1b[34mNew folder: ${folder.path}\x1b[0m`);
            //now recursively log all the files and folders in this new folder as well
            function logNewFolder(folder: Folder, indent: string = "") {
                for (let file of folder.files) {
                    console.log(`\x1b[32m${indent}+file: ${file.path}\x1b[0m`);
                }
                for (let subfolder of folder.folders) {
                    console.log(`\x1b[34m${indent}+folder: ${subfolder.path}\x1b[0m`);
                    logNewFolder(subfolder, indent + "  ");
                }
            }
            logNewFolder(folder);
        }
    }
    //check for deleted folders
    for (let folder of old.folders) {
        if (!newFolder.folders.some(f => f.path === folder.path)) {
            //the log color will be yellow for deleted folders
            console.log(`\x1b[33mDeleted folder: ${folder.path}\x1b[0m`);
            //let's create a logic where  we can recursively show subfolders and files of this deleted folder as well
            function logDeletedFolder(folder: Folder, indent: string = "") {
                for (let file of folder.files) {
                    console.log(`\x1b[31m${indent}-file: ${file.path}\x1b[0m`);
                }
                for (let subfolder of folder.folders) {
                    console.log(`\x1b[33m${indent}-folder: ${subfolder.path}\x1b[0m`);
                    logDeletedFolder(subfolder, indent + "  ");
                }
            }
            logDeletedFolder(folder);
        }
    }

}

let root = getRecursiveFileTree(path.join(process.cwd(), 'res'));
//detect if file is being changed
setInterval(() => {

    let next = getRecursiveFileTree(path.join(process.cwd(), 'res'));
    diffChangeTree(root, next);
    root = next;
    generateAssetsFile(root);

}, 250) 