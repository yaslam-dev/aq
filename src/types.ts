export type Country = {
    score: String;
    shortName: String;
    countryCode: number;
    countryName: String;
    isoa2: String;
};

export type CountryEmission = {
    year: number;
    countryCode: number;
    countryName: String;
    shortName: String;
    isoa2: String;
    record: String;
    cropLand: number;
    grazingLand: number;
    forestLand: number;
    fishingGround: number;
    builtupLand: number;
    carbon: number;
    value: number;
    score: String;
};

export type KeyedEmissions = { [key: string]: CountryEmission };



export interface ChartData {
    key: number;
    country: String;
    value: number;
    shortName: String
}