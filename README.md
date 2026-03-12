<div align="center">

<!-- Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=MTS%20Creator%20Tool&fontSize=60&fontColor=fff&animation=fadeIn&fontAlignY=38&desc=TypeScript-powered%20content%20pack%20builder%20for%20Minecraft%20Transport%20Simulator&descAlignY=60&descSize=16" width="100%"/>

Powered by these amazing tools!

<!-- Badges -->
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh/)
[![Java](https://img.shields.io/badge/JDK-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://adoptium.net/)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](./LICENSE)
[![MTS/IV](https://img.shields.io/badge/Minecraft-MTS%2FIV-62B346?style=for-the-badge&logo=minecraft&logoColor=white)](https://github.com/DonBruce64/MinecraftTransportSimulator)

<br/>

**Stop hand-editing thousands of lines of JSON.**  
Define your MTS vehicles, parts, and instruments in TypeScript — fully type-safe, auto-compiled, and `.jar`-ready.

[Getting Started](#-getting-started) · [Usage](#-usage) · [Project Structure](#-project-structure) · [Uses / Based On](#-uses--based-on) · [Contributing](#-contributing)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔷 Type-Safe Definitions
Use TypeScript classes like `InstrumentJSON`, `AnimationJSON`, and `GeneralJSON` to define your content. Required fields are enforced at compile time — no more silent JSON typos.

</td>
<td width="50%">

### 📁 Automated Asset Mapping
A built-in watcher monitors your `res/` folder and auto-regenerates a type-safe `assets.ts` file on every change, eliminating broken resource path references entirely.

</td>
</tr>
<tr>
<td width="50%">

### 📦 One-Click Builds
Run `bun run build` and get a production `.jar` file dropped straight into your `output/` folder — ready to copy into your Minecraft `mods/` directory.

</td>
<td width="50%">

### 🎞️ Complex Animation Support
Fluently define translations, rotations, and scaling animations with easing functions like `EaseInSine` and `EaseOutQuad` directly in TypeScript, with full autocomplete.

</td>
</tr>
</table>

---

## 🧩 Uses / Based On

This tool is built on top of the following technologies and projects:

| Project | Role |
|---------|------|
| [![MTS/IV](https://img.shields.io/badge/Minecraft%20Transport%20Simulator-IV-62B346?style=flat-square&logo=minecraft&logoColor=white)](https://github.com/DonBruce64/MinecraftTransportSimulator) | The Minecraft mod this tool generates content packs for |
| [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) | Type-safe content definitions and build scripting |
| [![Bun](https://img.shields.io/badge/Bun-000000?style=flat-square&logo=bun&logoColor=white)](https://bun.sh/) | Fast JS/TS runtime, bundler, and package manager |
| [![Java](https://img.shields.io/badge/OpenJDK-ED8B00?style=flat-square&logo=openjdk&logoColor=white)](https://adoptium.net/) | `.jar` compilation for Minecraft mod packaging |

---

## 🛠️ Requirements

| Tool | Purpose | Install |
|------|---------|---------|
| ![Bun](https://img.shields.io/badge/Bun-000?logo=bun&logoColor=white&style=flat-square) | Runtime & package manager | [bun.sh](https://bun.sh) |
| ![Java](https://img.shields.io/badge/JDK-ED8B00?logo=openjdk&logoColor=white&style=flat-square) | Compiles the final `.jar` | [adoptium.net](https://adoptium.net) |
| ![VSCode](https://img.shields.io/badge/VSCode-007ACC?logo=visualstudiocode&logoColor=white&style=flat-square) | TypeScript IntelliSense | [code.visualstudio.com](https://code.visualstudio.com) |

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/mts-creator-tool.git
cd mts-creator-tool

# 2. Install dependencies
bun install

# 3. Start the dev server — watches assets and rebuilds on change
bun run dev
```

---

## 📖 Usage

### 1. Define Your Content

Edit `entry.ts` to declare your content packs and their components:

```typescript
const motorsports = new MTSContentPack({
    packId: "f1_racing_equipment",
    packName: "F1 Racing Equipment",
});

const gearIndicator = new InstrumentJSON({
    components: [
        new InstrumentComponentJSON({
            textureWidth: 40,
            textureHeight: 56,
            overlayTexture: true,
            animations: [
                // EaseInSine, EaseOutQuad, rotations, translations...
            ],
        }),
    ],
    general: new GeneralJSON({
        name: "Gear Indicator",
        materialLists: [["oredict:ingotIron:1"]],
    }),
    textureName: asset("/instruments.png"),
});

motorsports.instruments.push(gearIndicator);
```

### 2. Add Assets

Drop textures, models, and sounds into `res/`. The dev server will instantly update `assets.ts` with a new type-safe reference you can use via the `asset()` helper.

### 3. Build the Pack

```bash
bun run build
```

> Generates all JSON definitions and compiles the final `.jar` into `output/`.

---

## 🏗️ Project Structure

```
mts-creator-tool/
│
├── entry.ts              # ← Start here. Define your content packs.
├── assets.ts             # Auto-generated asset registry (do not edit)
│
├── src/
│   ├── json/             # TypeScript models for every MTS JSON type
│   └── resource.ts       # Asset watcher + file tree generator
│
├── res/                  # Your raw assets (textures, models, sounds)
└── output/               # Build artifacts: .jar + raw JSON
```

---

## 🔧 Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start the asset watcher and dev server |
| `bun run build` | Build JSON definitions and compile `.jar` |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push and open a pull request

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for details.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer" width="100%"/>

Made with ❤️ for the MTS modding community

</div>