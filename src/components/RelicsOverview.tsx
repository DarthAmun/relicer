import styled from "styled-components";
import Relic, { $Relic, MainStat, RelicCategory, RelicPlace } from "./Relic";

const RelicsOverview = () => {
  const getRandomArbitrary = (min: number, max: number) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  function randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = Object.keys(anEnum)
      .map((n) => Number.parseInt(n))
      .filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    const randomEnumValue = enumValues[randomIndex];
    return randomEnumValue;
  }

  const generateRelics = (amount: number) => {
    let relics: $Relic[] = [];
    for (let i = 0; i < amount; i++) {
      let newRelic: $Relic = {
        stars: getRandomArbitrary(2, 5),
        category: randomEnum(RelicCategory),
        plus: getRandomArbitrary(0, 12),
        place: randomEnum(RelicPlace),
        mainStat: MainStat.Circle,
        subStats: [],
      };
      relics.push(newRelic);
    }
    return relics;
  };

  const rels: $Relic[] = generateRelics(50);
  console.log(rels);

  return (
    <Wrapper>
      {rels.map((rel) => (
        <Relic relic={rel} />
      ))}
    </Wrapper>
  );
};

export default RelicsOverview;

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;
