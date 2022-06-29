import { FaQuestion } from "react-icons/fa";
import styled from "styled-components";
import Relic, {
  RelicCategory,
  RelicPlace,
  RelicMainStats,
  RelicSubStats,
} from "../../data/Relic";
import {
  AbidingPanacea,
  Adamantine,
  ApollosBow,
  AstralWitchcraft,
  Enchanter,
  Hades,
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
} from "../../icons/RelicIcons";

interface $RelicType {
  relic: Relic;
  onClick?: () => void;
}

const RelicView = ({ relic, onClick }: $RelicType) => {
  const findIcon = () => {
    switch (+RelicCategory[relic.category]) {
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
      case RelicCategory.Hades:
        return <Hades />;
      default:
        <FaQuestion />;
    }
  };

  const findPlace = () => {
    switch (+RelicPlace[relic.place]) {
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

  return (
    <Wrapper stars={relic.stars} onClick={onClick}>
      {findPlace()}
      <Stats>
        <Main>
          {RelicMainStats[relic.mainStat.type].stat}{" "}
          {RelicMainStats[relic.mainStat.type].base[relic.stars - 3] +
            RelicMainStats[relic.mainStat.type].gain[relic.stars - 3] *
              relic.plus}
          <Plus>+{relic.plus}</Plus>
        </Main>
        {relic.subStats.map((sub) => (
          <Sub>
            {sub.isAdded && <>•</>} {RelicSubStats[sub.type].stat}{" "}
            {RelicSubStats[sub.type].base[relic.stars - 2] +
              RelicSubStats[sub.type].gain[relic.stars - 2] *
                (sub.bonus ? sub.bonus : 0)}{" "}
            {sub.bonus && sub.bonus > 0 ? <Bonus>{sub.bonus}</Bonus> : <></>}
          </Sub>
        ))}
      </Stats>
    </Wrapper>
  );
};

export default RelicView;

const handleColorType = (stars: number) => {
  switch (stars) {
    case 6:
      return "#eb6476";
    case 5:
      return "#EAB25D";
    case 4:
      return "MediumOrchid";
    case 3:
      return "lightgreen";
    default:
      return "#fff";
  }
};

const Wrapper = styled.div<{ stars: number }>`
  height: 80px;
  width: 200px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: ${({ stars }) => handleColorType(stars)};
  position: relative;
  cursor: pointer;
`;

const Stats = styled.div`
  position: absolute;
  right: 0px;
  height: 80px;
  width: 120px;
  border-left: 1px solid black;
  font-size: 10px;
  color: black;
`;

const Sub = styled.div`
  padding: 5px;
  padding-top: 2px;
  padding-bottom: 0px;
  width: 100%;
  font-size: 9px;
  color: black;
`;
const Main = styled.div`
  padding: 5px;
  padding-top: 2px;
  padding-bottom: 2px;
  width: 100%;
  font-weight: bold;
  border-bottom: 1px solid black;
`;

const Bonus = styled.div`
  float: right;
  height: 10px;
  width: 10px;
  border-radius: 10px;
  background-color: lightblue;
  text-align: center;
  line-height: 10px;
`;

const Plus = styled.span`
  float: right;
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
    z-index: 10;
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
    z-index: 10;
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
    left: -2px;
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
    z-index: 10;
    left: -20px;
    top: 20px;
  }
`;
