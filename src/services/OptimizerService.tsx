import { FaQuestion } from "react-icons/fa";
import Relic, {
  RelicCategory,
  RelicPlace,
  RelicMainStats,
  RelicSubStats,
} from "../data/Relic";

export const bestSpeedWithSet = (
  rels: Relic[],
  type: string
): { value: number; rels: any[] } => {
  let bestTriangle: Relic | undefined = undefined;
  let bestDiamond: Relic | undefined = undefined;
  let bestCircle: Relic | undefined = undefined;
  let bestSquare: Relic | undefined = undefined;
  let bestHexagon: Relic | undefined = undefined;
  let bestSpade: Relic | undefined = undefined;

  let speeds: number[] = [0, 0, 0, 0, 0, 0];
  let erg: { x: number; relic: Relic };

  let typeIndex4: number = -1;
  let typeIndex2: number = -1;
  switch (type) {
    case "spd":
      typeIndex4 = RelicCategory.WindWalker;
      break;
    case "atk%":
    case "atk":
      typeIndex4 = RelicCategory.WarMaschine;
      break;
    case "cdmg%":
      typeIndex4 = RelicCategory.HammerThor;
      break;
    case "hp%":
    case "hp":
      typeIndex2 = RelicCategory.MasterGrove;
      break;
    case "res":
      typeIndex2 = RelicCategory.ImmensusPeak;
      break;
    case "crate%":
      typeIndex2 = RelicCategory.Incandescence;
      break;
    case "acc":
      typeIndex2 = RelicCategory.ApollosBow;
      break;
    case "def%":
    case "def":
      typeIndex2 = RelicCategory.Stoneveins;
      break;
  }

  rels.forEach((rel) => {
    if (+RelicCategory[rel.category] === typeIndex4 || typeIndex4 === -1)
      switch (+RelicPlace[rel.place]) {
        case RelicPlace.Circle:
          erg = switchRel(rel, bestCircle, type);
          bestCircle = erg.relic;
          speeds[0] = erg.x;
          break;
        case RelicPlace.Square:
          erg = switchRel(rel, bestSquare, type);
          bestSquare = erg.relic;
          speeds[1] = erg.x;
          break;
        case RelicPlace.Diamond:
          erg = switchRel(rel, bestDiamond, type);
          bestDiamond = erg.relic;
          speeds[2] = erg.x;
          break;
        case RelicPlace.Triangle:
          erg = switchRel(rel, bestTriangle, type);
          bestTriangle = erg.relic;
          speeds[5] = erg.x;
          break;
        default:
          <FaQuestion />;
      }
    if (+RelicCategory[rel.category] === typeIndex2 || typeIndex2 === -1)
      switch (+RelicPlace[rel.place]) {
        case RelicPlace.Hexagon:
          erg = switchRel(rel, bestHexagon, type);
          bestHexagon = erg.relic;
          speeds[3] = erg.x;
          break;
        case RelicPlace.Spade:
          erg = switchRel(rel, bestSpade, type);
          bestSpade = erg.relic;
          speeds[4] = erg.x;
          break;
      }
  });

  let resultRels: any[] = [
    bestTriangle,
    bestDiamond,
    bestDiamond,
    bestSquare,
    bestHexagon,
    bestSpade,
  ].filter((rel) => rel !== undefined);

  let finalSpeed = 0;
  speeds.forEach((sp) => {
    finalSpeed += sp;
  });

  finalSpeed = Math.round(finalSpeed * 1.25);

  return { value: finalSpeed, rels: resultRels };
};

export const bestX = (
  rels: Relic[],
  type: string
): { value: number; rels: any[] } => {
  let bestTriangle: Relic | undefined = undefined;
  let bestDiamond: Relic | undefined = undefined;
  let bestCircle: Relic | undefined = undefined;
  let bestSquare: Relic | undefined = undefined;
  let bestHexagon: Relic | undefined = undefined;
  let bestSpade: Relic | undefined = undefined;

  let x: number[] = [0, 0, 0, 0, 0, 0];
  let erg: { x: number; relic: Relic };

  rels.forEach((rel) => {
    switch (+RelicPlace[rel.place]) {
      case RelicPlace.Circle:
        erg = switchRel(rel, bestCircle, type);
        bestCircle = erg.relic;
        x[0] = erg.x;
        break;
      case RelicPlace.Square:
        erg = switchRel(rel, bestSquare, type);
        bestSquare = erg.relic;
        x[1] = erg.x;
        break;
      case RelicPlace.Diamond:
        erg = switchRel(rel, bestDiamond, type);
        bestDiamond = erg.relic;
        x[2] = erg.x;
        break;
      case RelicPlace.Hexagon:
        erg = switchRel(rel, bestHexagon, type);
        bestHexagon = erg.relic;
        x[3] = erg.x;
        break;
      case RelicPlace.Spade:
        erg = switchRel(rel, bestSpade, type);
        bestSpade = erg.relic;
        x[4] = erg.x;
        break;
      case RelicPlace.Triangle:
        erg = switchRel(rel, bestTriangle, type);
        bestTriangle = erg.relic;
        x[5] = erg.x;
        break;
      default:
        <FaQuestion />;
    }
  });

  let resultRels: any[] = [
    bestTriangle,
    bestDiamond,
    bestDiamond,
    bestSquare,
    bestHexagon,
    bestSpade,
  ].filter((rel) => rel !== undefined);

  let finalX = 0;
  x.forEach((sp) => {
    finalX += sp;
  });

  return { value: finalX, rels: resultRels };
};

const switchRel = (
  rel: Relic,
  oldRel: Relic | undefined,
  type: string
): { x: number; relic: Relic } => {
  let typeIndex: number = 0;

  RelicSubStats.forEach((stat, index) => {
    if (stat.stat === type) typeIndex = index;
  });

  let x = 0;
  let oldX = 0;

  if (rel.mainStat.type === typeIndex) {
    x +=
      RelicMainStats[rel.mainStat.type].base[rel.stars - 3] +
      RelicMainStats[rel.mainStat.type].gain[rel.stars - 3] * rel.plus;
  }
  if (oldRel && oldRel.mainStat.type === typeIndex) {
    oldX +=
      RelicMainStats[oldRel.mainStat.type].base[oldRel.stars - 3] +
      RelicMainStats[oldRel.mainStat.type].gain[oldRel.stars - 3] * oldRel.plus;
  }

  rel.subStats.forEach((sub) => {
    if (+sub.type === typeIndex)
      x +=
        RelicSubStats[sub.type].base[rel.stars - 2] +
        RelicSubStats[sub.type].gain[rel.stars - 2] *
          (sub.bonus ? sub.bonus : 0);
  });
  oldRel &&
    oldRel.subStats.forEach((sub) => {
      if (+sub.type === typeIndex)
        oldX +=
          RelicSubStats[sub.type].base[oldRel.stars - 2] +
          RelicSubStats[sub.type].gain[oldRel.stars - 2] *
            (sub.bonus ? sub.bonus : 0);
    });

  if (oldRel && x < oldX) {
    return { x: oldX, relic: oldRel };
  } else {
    return { x: x, relic: rel };
  }
};
