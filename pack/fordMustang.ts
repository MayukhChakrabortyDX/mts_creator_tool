import { resources } from "../assets";
import { Animation, AnimationType } from "../src/json/animation";
import { AnimationVariables, VehicleAnalogVariable } from "../src/json/animationVariables";
import { CollisionBox, CollisionGroup } from "../src/json/collisionGroup";
import { General } from "../src/json/general";
import { Motorized } from "../src/json/motorized";
import { PartTypes, Wheel, type PartConvention } from "../src/json/partConvention";
import { PartSlot } from "../src/json/partSlot";
import { VehicleEntity } from "../src/entity/VehicleEntity";
import { Variable } from "../src/utils/variable";

//let's create variables here
const DoorL = new Variable("door_l")
//this is my custom ford mustang code here.
const fordMustang = new VehicleEntity({

    model3D: resources.fordmustang69_obj,

    general: new General({
        description: "The Ford Mustang Mach 1 1969 is a true classic. Not only is it known for its raw power and speed, but also for its prestiege. While this vehicle might not be superb from a utility perspective, its perfect for showing off your net worth and getting from A to B quickly, given that you have proper roads.",
        health: 150,
        materialLists: [
            [
                "mts:mtsofficialpack.plating:36",
                "mts:mtsofficialpack.screws:48",
                "mts:mtsofficialpack.spring:4",
                "tags:ingots/gold:16",
                "minecraft:diamond:2",
                "minecraft:oak_trapdoor:2",
                "minecraft:lever:1",
                "minecraft:glass_pane:8",
                "minecraft:tripwire_hook:3",
                "mts:mtsofficialpack.copperwire:12",
                "mts:mtsofficialpack.headlight:4"
            ]
        ],
        radarRange: 0.0,
        radarWidth: 0.0
    }),

    motorized: new Motorized({
        hasAutopilot: true,
        hasHeadlights: true,
        hasTurnSignals: true,
        emptyMass: 1320,
        fuelCapacity: 8000,
        steeringForceFactor: 0.4,
        overSteer: 0.55,
        axleRatio: 3.25,
        brakingFactor: 1.0,
        dragCoefficient: 0.5,
        litVariable: "headlight"
    }),

    parts: [
        new PartSlot({
            pos: [-1.125, 0.0625, -0.1875],
            rot: [0.0, 180.0, 0.0],
            isMirrored: true,
            minValue: 0.4,
            maxValue: 1.0,
            types: [
                PartTypes.Wheel.GroundWheel
            ]
        }),

        new PartSlot({
            pos: [1.125, 0.0625, -0.1875],
            minValue: 0.4,
            maxValue: 1.0,
            types: [
                PartTypes.Wheel.GroundWheel
            ]
        }),

        new PartSlot({
            pos: [-1.125, 0.0625, 3.5],
            rot: [0.0, 180.0, 0.0],
            turnsWithSteer: true,
            isMirrored: true,
            minValue: 0.4,
            maxValue: 1.0,
            types: [
                PartTypes.Wheel.GroundWheel
            ],
            animations: [
                new Animation({
                    animationType: AnimationType.Rotation,
                    variable: AnimationVariables.VehicleAnalog.Rudder,
                    centerPoint: [-1.125, 0.0625, 3.5],
                    axis: [0.0, -1.0, 0.0]
                })
            ]
        }),

        new PartSlot({
            pos: [1.125, 0.0625, 3.5],
            turnsWithSteer: true,
            minValue: 0.4,
            maxValue: 1.0,
            types: [
                PartTypes.Wheel.GroundWheel
            ],
            animations: [
                new Animation({
                    animationType: AnimationType.Rotation,
                    variable: AnimationVariables.VehicleAnalog.Rudder,
                    centerPoint: [1.125, 0.0625, 3.5],
                    axis: [0.0, -1.0, 0.0]
                })
            ]
        }),

        new PartSlot({
            pos: [-0.5635, 0.37, 1.25],
            partScale: [1, 0.9, 1],
            types: [
                PartTypes.Seat.Seat
            ],
            //!Skipping the interactable variables for now because that needs more nuance

        }),

        new PartSlot({
            pos: [0.5635, 0.37, 1.25],
            partScale: [1, 0.9, 1],
            isController: true,
            types: [
                PartTypes.Seat.Seat
            ],
            //!skipping the interactable variables for now
        }),

        new PartSlot({
            pos: [0.0, 0.178125, 2.69],
            partScale: [0.85, 0.85, 0.85],
            maxValue: 1.25,
            types: [
                PartTypes.Engine.EngineCar
            ],
            linkedParts: [1, 2, 6]
        }),

        new PartSlot({
            pos: [-0.625, 1.125, 2.125],
            rot: [-40, 0, 0],
            types: [
                PartTypes.GenericPart.GenericSaleSign
            ]
        }),

        new PartSlot({
            pos: [-0.7, 0.525, 2.1875],
            rot: [0,0,0],
            minValue: 0.4,
            maxValue: 1.0,
            defaultPart: "mtsofficialpack:gloveboxscout",
            isPermanent: true,
            customTypes: [
                //or you can extract this out in case you want to reuse it.
                ("gloveboxscout" as PartConvention)
            ],
            types: [
                PartTypes.Storage.InteractableCrate
            ]
        })
    ],

    collisionGroups: [
        new CollisionGroup({
            isInterior: true,
            collisions: [
                new CollisionBox({
                    pos: [1.125, 0.5, 2.0625],
                    width: 0.25,
                    height: 1.0,
                    variableName: DoorL,
                    variableType: "toggle"
                }),

                new CollisionBox({
                    
                })
            ]
        })
    ]

})