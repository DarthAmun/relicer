import { useEffect, useState } from "react";
import styled from "styled-components";
import { reciveAllRelics } from "../../services/DatabaseService";
import RelicView from "./RelicView";
import { bestX, bestSpeedWithSet } from "../../services/OptimizerService";
import Relic, { RelicSubStats } from "../../data/Relic";
import { InputPicker } from "rsuite";

const RelicsSetsOverview = () => {
  const [type, setType] = useState<string>("spd");
  const [relics, setRelics] = useState<Relic[]>([]);
  const [relicsSet, setRelicsSet] = useState<Relic[]>([]);
  const [speed, setSpeed] = useState<number>(0);
  const [speedSet, setSpeedSet] = useState<number>(0);

  useEffect(() => {
    reciveAllRelics((results: any) => {
      let rels: Relic[] = [...results];
      const resultRels = bestX(rels, type);
      const resultRelsSet = bestSpeedWithSet(rels, type);

      setSpeed(resultRels.value);
      setRelics(resultRels.rels);
      setSpeedSet(resultRelsSet.value);
      setRelicsSet(resultRelsSet.rels);
    });
  }, [type]);

  const makeDataFromStat = (
    stats: { stat: string; base: number[]; gain: number[] }[]
  ) => {
    let categories: { label: string; value: string }[] = [];
    stats.forEach((stat: { stat: string; base: number[]; gain: number[] }) => {
      categories.push({ label: stat.stat, value: stat.stat });
    });
    return categories.sort((a, b) => a.label.localeCompare(b.label));
  };

  return (
    <>
      <Filter>
        <InputPicker
          data={makeDataFromStat(RelicSubStats)}
          onChange={(val: any) => setType(val)}
          placeholder="Stat"
          style={{ width: 300 }}
          menuStyle={{ width: 300, zIndex: 200 }}
        />
      </Filter>
      <Wrapper>
        <RelicValueCard>{speed}</RelicValueCard>
        {relics.map((rel, index) => (
          <RelicView key={index} relic={rel} />
        ))}
        <Sep />

        <RelicValueCard>{speedSet}</RelicValueCard>
        {relicsSet.map((rel, index) => (
          <RelicView key={index} relic={rel} />
        ))}
      </Wrapper>
    </>
  );
};

export default RelicsSetsOverview;

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;
const Filter = styled(Wrapper)``;

const RelicValueCard = styled.div`
  height: 80px;
  width: 200px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: lightgray;
  color: white;
  font-size: 50px;
  line-height: 90px;
  text-align: center;
  position: relative;
  cursor: pointer;
  transition: background-color 0.4s;

  &:hover {
    background-color: grey;
  }
`;

const Sep = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 1px solid white;
`;
