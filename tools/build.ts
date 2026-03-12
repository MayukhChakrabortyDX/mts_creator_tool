//!DO NOT TOUCH!

import { existsSync, mkdirSync, rmSync } from "node:fs";
import { PackRegistry } from "../packs/registry";
import { generateOnDemand } from "./resource";
import path from 'node:path'
import { $ } from "bun";

generateOnDemand()

let outputDir = path.join(process.cwd(), 'output')

if (existsSync(outputDir)) {
    //simply remove it
    rmSync(outputDir, { recursive: true, force: true })
}

mkdirSync(outputDir, { recursive: true })

let packSet = new Set<string>()

for ( let content of PackRegistry ) {

    if ( packSet.has( content.name ) ) {
        throw new Error(`Two packs with identical name found: ${ content.name }. Compilation Halted`)
    }

    packSet.add(content.name)

    content.build(
        path.join(process.cwd(), 'output', content.name)
    )

    await $`cd output/${content.name} && jar cf ${content.name}.jar -C ${content.name} .`

}