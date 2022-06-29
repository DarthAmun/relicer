import { v4 as uuidv4 } from "uuid";

export enum RelicCategory {
  WindWalker,
  WarMaschine,
  AbidingPanacea,
  OceanWaves,
  HammerThor,
  TyrannyZeus,
  SnowDowager,
  AstralWitchcraft,
  MasterGrove,
  ImmensusPeak,
  Enchanter,
  LightAbove,
  SwordAvatara,
  Incandescence,
  Adamantine,
  Stoneveins,
  ApollosBow,
  Hades,
}

export enum RelicPlace {
  Circle,
  Square,
  Triangle,
  Diamond,
  Hexagon,
  Spade,
}

export const RelicMainStats: {
  stat: string;
  base: number[];
  gain: number[];
}[] = [
  { stat: "spd", base: [4, 6, 10, 15], gain: [1, 2, 2, 2] },
  { stat: "atk%", base: [3, 4, 6, 8], gain: [1, 2, 2, 3] },
  { stat: "hp%", base: [3, 4, 6, 8], gain: [1, 2, 2, 3] },
  { stat: "def%", base: [3, 4, 6, 8], gain: [1, 2, 2, 3] },
  { stat: "acc%", base: [3, 4, 6, 8], gain: [1, 2, 2, 3] },
  { stat: "res%", base: [3, 4, 6, 8], gain: [1, 2, 2, 3] },
  { stat: "crate%", base: [3, 5, 6, 8], gain: [1, 2, 2, 3] },
  { stat: "cdmg%", base: [0, 6, 8, 10], gain: [0, 3, 4, 5] },
  { stat: "atk", base: [15, 20, 30, 40], gain: [6, 8, 10, 18] },
  { stat: "def", base: [15, 20, 30, 40], gain: [6, 8, 10, 18] },
  { stat: "hp", base: [180, 250, 350, 600], gain: [90, 120, 140, 220] },
];
export const RelicSubStats: { stat: string; base: number[]; gain: number[] }[] =
  [
    { stat: "spd", base: [2, 2, 3, 3, 4], gain: [2, 2, 3, 3, 4] },
    { stat: "atk%", base: [2, 2, 2, 3, 4], gain: [2, 2, 2, 3, 4] },
    { stat: "hp%", base: [2, 2, 2, 3, 4], gain: [2, 2, 2, 3, 4] },
    { stat: "def%", base: [2, 2, 2, 3, 4], gain: [2, 2, 2, 3, 4] },
    { stat: "acc%", base: [2, 2, 2, 5, 6], gain: [2, 2, 2, 5, 6] },
    { stat: "res%", base: [2, 2, 2, 5, 6], gain: [2, 2, 2, 5, 6] },
    { stat: "crate%", base: [1, 2, 3, 4, 5], gain: [1, 2, 3, 4, 5] },
    { stat: "cdmg%", base: [2, 2, 3, 4, 5], gain: [2, 2, 3, 4, 5] },
    { stat: "atk", base: [10, 12, 14, 21, 25], gain: [10, 12, 14, 21, 25] },
    { stat: "def", base: [10, 12, 14, 21, 25], gain: [10, 12, 14, 21, 25] },
    {
      stat: "hp",
      base: [100, 150, 220, 300, 400],
      gain: [100, 150, 220, 300, 400],
    },
  ];

export interface $Stat {
  type: number;
  bonus?: number;
  isAdded?: boolean;
}

export default class Relic {
  id: number;
  uuid: string;
  stars: number;
  category: RelicCategory;
  plus: number;
  place: RelicPlace;
  mainStat: $Stat;
  subStats: $Stat[];

  constructor(
    id?: number,
    uuid?: string,
    stars?: number,
    category?: RelicCategory,
    plus?: number,
    place?: RelicPlace,
    mainStat?: $Stat,
    subStats?: $Stat[]
  ) {
    this.id = id || 0;
    this.uuid = uuid || uuidv4();
    this.stars = stars || 0;
    this.category = category || RelicCategory.AbidingPanacea;
    this.plus = plus || 0;
    this.place = place || RelicPlace.Circle;
    this.mainStat = mainStat || { type: 0 };
    this.subStats = subStats || [];
  }
}
