export enum Wheel {
    GroundWheel = "ground_wheel",
    XScaled = "x_scaled",
    GroundWheelAircraft = "ground_wheel_aircraft",
    GroundWheelMotorcycle = "ground_wheel_motorcycle",
    GroundWheelBudd = "ground_wheel_budd",
    GroundWheelDayton = "ground_wheel_dayton"
}

export enum Seat {
    Seat = "seat",
    GenericSeatDouble = "generic_seat_double",
    SeatBus = "seat_bus",
    SeatAirliner = "seat_airliner",
    SeatPilot = "seat_pilot",
    SeatTurret = "seat_turret",
    SeatLowprofile = "seat_lowprofile",
    SeatMotorcycle = "seat_motorcycle",
    GenericHeadrest = "generic_headrest"
}

export enum Engine {
    EngineCar = "engine_car",
    EngineHorizontal = "engine_horizontal",
    EngineRotary = "engine_rotary",
    EngineRadial = "engine_radial",
    EngineBoat = "engine_boat",
    EngineOutboard = "engine_outboard"
}

export enum Storage {
    InteractableCrate = "interactable_crate",
    InteractableBarrel = "interactable_barrel",
    InteractableLuggage = "interactable_luggage",
    GenericContainerSingle = "generic_container_single",
    GenericContainerDouble = "generic_container_double",
    GenericContainerExtended = "generic_container_extended"
}

export enum TruckBed {
    GenericTruckbed = "generic_truckbed"
}

export enum GenericPart {
    GenericLightbar = "generic_lightbar",
    GenericGyrophare = "generic_gyrophare",
    GenericBumpersticker = "generic_bumpersticker",
    GenericBusadSign = "generic_busad_sign",
    GenericBusadPoster = "generic_busad_poster",
    GenericBusadBanner = "generic_busad_banner",
    GenericBullbar = "generic_bullbar",
    GenericFlagSmall = "generic_flag_small",
    GenericRoofdevice = "generic_roofdevice",
    GenericLedlight = "generic_ledlight",
    SeatFurniture = "seat_furniture",
    InteractableFurniture = "interactable_furniture",
    GenericFurniture = "generic_furniture",
    GenericSignBusdestination = "generic_sign_busdestination",
    GenericLicenseplateEuro = "generic_licenseplate_euro",
    GenericLicenseplateUs = "generic_licenseplate_us",
    GenericWinch = "generic_winch",
    GenericSteeringwheel = "generic_steeringwheel",
    GenericPedalGas = "generic_pedal_gas",
    GenericPedalBrake = "generic_pedal_brake",
    GenericPedalClutch = "generic_pedal_clutch",
    GenericOrnamentMirror = "generic_ornament_mirror",
    GenericOrnamentDashboard = "generic_ornament_dashboard",
    GenericSignWindow = "generic_sign_window",
    GenericSaleSign = "generic_sale_sign"
}

export const PartTypes = {
    Wheel,
    Seat,
    Engine,
    Storage,
    TruckBed,
    GenericPart,
} as const;

export type PartConvention =
    | Wheel
    | Seat
    | Engine
    | Storage
    | TruckBed
    | GenericPart;