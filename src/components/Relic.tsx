import styled from "styled-components";
import { HammerThor } from "../icons/RelicIcons";

export enum RelicType {
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
}

export enum PlaceType {
  Circle,
  Square,
  Triangle,
  Diamond,
  Hexagon,
  Spade,
}

export enum MainStat {
  Circle,
}

export interface Stat {
  value: string;
  bonus: number;
}

interface $RelicType {
  stars: number;
  type: RelicType;
  plus: number;
  place: PlaceType;
  mainStat: MainStat;
  subStats: Stat[];
}

const Relic = ({
  stars,
  type,
  plus,
  place,
  mainStat,
  subStats,
}: $RelicType) => {
  const findIcon = () => {
    return <HammerThor></HammerThor>;
  };

  return <Wrapper stars={stars}>{findIcon()}</Wrapper>;
};

export default Relic;

const Wrapper = styled.div<{ stars: number }>`
  height: 80px;
  width: 80px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: #eb6476;
`;
