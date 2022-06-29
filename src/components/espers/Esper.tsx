import styled from "styled-components";
import Relic from "../../data/Relic";

export enum EsperType {
  Flow,
  Inferno,
  Wind,
  Schimmer,
}

export interface $Esper {
  name: string;
  type: EsperType;
  level: number;
  stars: number;
  resonance: number;
  image: string;

  hp: number;
  atk: number;
  def: number;
  spd: number;
  crate: number;
  cdmg: number;
  acc: number;
  resist: number;

  relics: Relic[];
}

interface $EsperType {
  esper: $Esper;
}

const Esper = ({ esper }: $EsperType) => {
  return (
    <Wrapper type={esper.type}>
      {esper.name}
      {EsperType[esper.type]}
      <Logo src={esper.image} />
      <Stats>
        <Stat>
          <b>Hp: </b>
          {esper.hp}
        </Stat>
        <Stat>
          <b>Atk: </b>
          {esper.atk}
        </Stat>
        <Stat>
          <b>Def: </b>
          {esper.def}
        </Stat>
        <Stat>
          <b>C.Dmg: </b>
          {esper.cdmg}
        </Stat>
        <Stat>
          <b>C.Rate: </b>
          {esper.crate}
        </Stat>
        <Stat>
          <b>Acc: </b>
          {esper.acc}
        </Stat>
        <Stat>
          <b>Res: </b>
          {esper.resist}
        </Stat>
        <Stat>
          <b>Spd: </b>
          {esper.spd}
        </Stat>
      </Stats>
    </Wrapper>
  );
};

export default Esper;

const handleColorType = (type: EsperType) => {
  console.log(type);
  switch (type) {
    case EsperType.Flow:
      return "#DD7AFF";
    case EsperType.Inferno:
      return "#F88E07";
    case EsperType.Wind:
      return "#1AF4BE";
    case EsperType.Schimmer:
      return "linear-gradient(320deg, rgba(222,250,191,1) 0%, rgba(160,252,246,1) 50%, rgba(231,170,252,1) 100%)"; //#E7AAFC, #A0FCF6, #DEFABF,
    default:
      return "#fff";
  }
};

const Wrapper = styled.div<{ type: EsperType }>`
  height: 400px;
  width: 300px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 10px;
  background: ${({ type }) => handleColorType(type)};
  position: relative;
`;

const Logo = styled.img`
  border: 5px purple solid;
  border-radius: 500px;
  width: 150px;
  height: 150px;
  float: right;
`;

const Stats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const Stat = styled.div`
  flex: 1 1;
  height: 20px;
  min-width: 50%;
`;
