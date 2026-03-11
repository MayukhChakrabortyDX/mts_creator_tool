//generates the assets.ts file on refresh.
//! DO NOT MODIFY THIS FILE UNLESS YOU KNOW WHAT YOU ARE DOING.

import path from 'node:path';
import { readdirSync, writeFileSync } from 'node:fs';

// ─── Data Model ──────────────────────────────────────────────────────────────

class File {
    constructor(public path: string, public name: string) {}
}

class Folder {
    constructor(
        public path: string,
        public name: string,
        public files: File[],
        public folders: Folder[]
    ) {}

}

// ─── Path Collection (for ResourceLocation type) ─────────────────────────────

function collectPaths(folder: Folder, prefix: string): string[] {
    const paths: string[] = [];

    for (const file of folder.files) {
        paths.push("/" + prefix + file.name);
    }

    for (const subfolder of folder.folders) {
        const folderPrefix = prefix + subfolder.name + "/";
        paths.push("/" + prefix + subfolder.name);
        paths.push(...collectPaths(subfolder, folderPrefix));
    }

    return paths;
}

// ─── File Tree ───────────────────────────────────────────────────────────────

function getRecursiveFileTree(directory: string): Folder {
    const files: File[] = [];
    const folders: Folder[] = [];
    const items = readdirSync(directory, { withFileTypes: true });

    for (const item of items) {
        if (item.isFile()) {
            files.push(new File(path.join(directory, item.name), item.name));
        } else if (item.isDirectory()) {
            folders.push(getRecursiveFileTree(path.join(directory, item.name)));
        }
    }

    return new Folder(directory, path.basename(directory), files, folders);
}

// ─── Code Generation ─────────────────────────────────────────────────────────

function generateAssetsFile(root: Folder) {
    const paths = collectPaths(root, "");
    const unionType = paths.length > 0
        ? paths.map(p => `    | ${JSON.stringify(p)}`).join("\n")
        : "    never";

    const file = [
        `/*!DO NOT TOUCH*/`,
        ``,
        `export type ResourceLocation =`,
        unionType + ";",
        ``,
        `export function asset<T extends ResourceLocation>(path: T): string {`,
        `    return path;`,
        `}`,
    ].join("\n");

    writeFileSync(path.join(process.cwd(), 'assets.ts'), file);
}

// ─── Diff / Watch ────────────────────────────────────────────────────────────

function diffChangeTree(oldFolder: Folder, newFolder: Folder) {
    for (const file of newFolder.files) {
        if (!oldFolder.files.some(f => f.path === file.path)) {
            console.log(`\x1b[32mNew file:     ${file.path}\x1b[0m`);
        }
    }
    for (const file of oldFolder.files) {
        if (!newFolder.files.some(f => f.path === file.path)) {
            console.log(`\x1b[31mDeleted file: ${file.path}\x1b[0m`);
        }
    }
    for (const folder of newFolder.folders) {
        if (!oldFolder.folders.some(f => f.path === folder.path)) {
            console.log(`\x1b[34mNew folder:   ${folder.path}\x1b[0m`);
            logFolderContents(folder, "  ", "+");
        }
    }
    for (const folder of oldFolder.folders) {
        if (!newFolder.folders.some(f => f.path === folder.path)) {
            console.log(`\x1b[33mDeleted folder: ${folder.path}\x1b[0m`);
            logFolderContents(folder, "  ", "-");
        }
    }
}

function logFolderContents(folder: Folder, indent: string, prefix: string) {
    const isAdd = prefix === "+";
    const fileColor  = isAdd ? "\x1b[32m" : "\x1b[31m";
    const dirColor   = isAdd ? "\x1b[34m" : "\x1b[33m";

    for (const file of folder.files) {
        console.log(`${fileColor}${indent}${prefix}file:   ${file.path}\x1b[0m`);
    }
    for (const subfolder of folder.folders) {
        console.log(`${dirColor}${indent}${prefix}folder: ${subfolder.path}\x1b[0m`);
        logFolderContents(subfolder, indent + "  ", prefix);
    }
}

// ─── Exports ─────────────────────────────────────────────────────────────────

export function runServer() {
    let root = getRecursiveFileTree(path.join(process.cwd(), 'res'));
    generateAssetsFile(root);
    console.log("\x1b[36mAsset server running...\x1b[0m");

    setInterval(() => {
        const next = getRecursiveFileTree(path.join(process.cwd(), 'res'));
        diffChangeTree(root, next);
        root = next;
        generateAssetsFile(root);
    }, 250);
}

export function generateOnDemand() {
    return generateAssetsFile(
        getRecursiveFileTree(
            path.join(process.cwd(), 'res')
        )
    );
}