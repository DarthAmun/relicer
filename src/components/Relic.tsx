import { FaQuestion } from "react-icons/fa";
import styled from "styled-components";
import {
  AbidingPanacea,
  Adamantine,
  ApollosBow,
  AstralWitchcraft,
  Enchanter,
  HammerThor,
  ImmensusPeak,
  Incandescence,
  LightAbove,
  MasterGrove,
  OceanWaves,
  SnowDowager,
  Stoneveins,
  SwordAvatara,
  TyrannyZeus,
  WarMaschine,
  WindWalker,
} from "../icons/RelicIcons";

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
}

export enum RelicPlace {
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

export interface $Relic {
  stars: number;
  category: RelicCategory;
  plus: number;
  place: RelicPlace;
  mainStat: MainStat;
  subStats: Stat[];
}

interface $RelicType {
  relic: $Relic;
}

const Relic = ({ relic }: $RelicType) => {
  const findIcon = () => {
    switch (relic.category) {
      case RelicCategory.AbidingPanacea:
        return <AbidingPanacea />;
      case RelicCategory.WindWalker:
        return <WindWalker />;
      case RelicCategory.WarMaschine:
        return <WarMaschine />;
      case RelicCategory.OceanWaves:
        return <OceanWaves />;
      case RelicCategory.HammerThor:
        return <HammerThor />;
      case RelicCategory.TyrannyZeus:
        return <TyrannyZeus />;
      case RelicCategory.SnowDowager:
        return <SnowDowager />;
      case RelicCategory.AstralWitchcraft:
        return <AstralWitchcraft />;
      case RelicCategory.MasterGrove:
        return <MasterGrove />;
      case RelicCategory.ImmensusPeak:
        return <ImmensusPeak />;
      case RelicCategory.Enchanter:
        return <Enchanter />;
      case RelicCategory.LightAbove:
        return <LightAbove />;
      case RelicCategory.SwordAvatara:
        return <SwordAvatara />;
      case RelicCategory.Incandescence:
        return <Incandescence />;
      case RelicCategory.Adamantine:
        return <Adamantine />;
      case RelicCategory.Stoneveins:
        return <Stoneveins />;
      case RelicCategory.ApollosBow:
        return <ApollosBow />;
      default:
        <FaQuestion />;
    }
  };

  const findPlace = () => {
    switch (relic.place) {
      case RelicPlace.Circle:
        return <Circle>{findIcon()}</Circle>;
      case RelicPlace.Square:
        return <Square>{findIcon()}</Square>;
      case RelicPlace.Diamond:
        return <Diamond>{findIcon()}</Diamond>;
      case RelicPlace.Hexagon:
        return <Hexagon>{findIcon()}</Hexagon>;
      case RelicPlace.Spade:
        return <Spade>{findIcon()}</Spade>;
      case RelicPlace.Triangle:
        return <Triangle>{findIcon()}</Triangle>;
      default:
        <FaQuestion />;
    }
  };

  return <Wrapper stars={relic.stars}>{findPlace()}</Wrapper>;
};

export default Relic;

const handleColorType = (stars: number) => {
  switch (stars) {
    case 5:
      return "#eb6476";
    case 4:
      return "#EAB25D";
    case 3:
      return "MediumOrchid";
    case 2:
      return "lightgreen";
    default:
      return "#fff";
  }
};

const Wrapper = styled.div<{ stars: number }>`
  height: 80px;
  width: 80px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: ${({ stars }) => handleColorType(stars)};
`;

const Square = styled.div`
  float: left;
  margin: 10px;
  padding: 10px;
  height: 60px;
  width: 60px;
  background-color: purple;
  & svg {
    width: 40px;
    fill: white;
    z-index: 10;
    position: relative;
  }
`;
const Circle = styled(Square)`
  border-radius: 40px;
`;
const Diamond = styled(Square)`
  margin: 15px;
  padding: 7px;
  height: 50px;
  width: 50px;
  transform: rotate(45deg);
  & svg {
    transform: rotate(-45deg);
  }
`;
const Hexagon = styled(Square)`
  &:before {
    content: " ";
    width: 0;
    height: 0;
    border-bottom: 30px solid purple;
    border-left: 52px solid transparent;
    border-right: 52px solid transparent;
    position: absolute;
    top: -30px;
    left: 0px;
  }

  width: 104px;
  height: 60px;
  margin-left: -12px;

  &:after {
    content: "";
    width: 0;
    position: absolute;
    bottom: -30px;
    left: 0px;
    border-top: 30px solid purple;
    border-left: 52px solid transparent;
    border-right: 52px solid transparent;
  }

  transform: scale(0.6);
  & svg {
    margin-left: 20px;
    transform: scale(1.6);
  }
`;
const Spade = styled(Square)`
  background-color: transparent;
  position: relative;
  &:before {
    color: purple;
    z-index: 0;
    content: "♠";
    font-size: 120px;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 30px;
    position: absolute;
    left: 0;
  }
`;
const Triangle = styled(Square)`
  background-color: transparent;
  position: relative;
  width: 0;
  height: 0;
  padding: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 60px solid purple;

  & svg {
    position: absolute;
    left: 0px;
  }
`;
