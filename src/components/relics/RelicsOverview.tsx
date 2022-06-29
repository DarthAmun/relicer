import { useEffect, useState } from "react";
import styled from "styled-components";
import { reciveAllRelics } from "../../services/DatabaseService";
import { BsFillPatchPlusFill } from "react-icons/bs";
import NewRelicDialog from "./NewRelicDialog";
import EditRelicDialog from "./EditRelicDialog";
import { CheckPicker, InputNumber, Rate } from "rsuite";
import Relic, {
  RelicCategory,
  RelicPlace,
  RelicMainStats,
  RelicSubStats,
} from "../../data/Relic";
import RelicView from "./RelicView";
import { FaGem } from "react-icons/fa";

interface $Filter {
  target: string;
  values: string[];
}

const RelicsOverview = () => {
  const [relics, setRelics] = useState<Relic[]>([]);
  const [showRelicDialog, openNewRelicDialog] = useState<boolean>(false);
  const [selectedRelic, setSelectedRelic] = useState<Relic | undefined>();

  const [filters, setFilters] = useState<$Filter[]>([]);

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  useEffect(() => {
    reciveAllRelics((results: any) => {
      let filteredRelics: Relic[] = results.slice();
      filters.forEach((filter: $Filter) => {
        if (filter.values.length > 0)
          filteredRelics = filteredRelics.filter((rel: Relic) => {
            let includ: boolean = false;
            let val: string = "";
            switch (filter.target) {
              case "stars":
                val = rel.stars + "";
                includ = filter.values.includes(val);
                break;
              case "plus":
                val = rel.plus + "";
                includ = filter.values.includes(val);
                break;
              case "category":
                val = rel.category + "";
                includ = filter.values.includes(val);
                break;
              case "place":
                val = rel.place + "";
                includ = filter.values.includes(val);
                break;
              case "main":
                val = RelicMainStats[rel.mainStat.type].stat + "";
                includ = filter.values.includes(val);
                break;
              case "sub":
                rel.subStats.forEach((sub) => {
                  val = RelicSubStats[sub.type].stat + "";
                  console.log(val);
                  if (filter.values.includes(val)) includ = true;
                });
                break;
              default:
                break;
            }
            return includ;
          });
      });
      setRelics(filteredRelics);
    });
  }, [filters]);

  const makeDataFromEnum = (enumPart: any) => {
    let categories: { label: string; value: string }[] = [];
    for (const cat in enumPart) {
      if (isNaN(Number(cat))) {
        categories.push({ label: cat, value: cat });
      }
    }
    return categories.sort((a, b) => a.value.localeCompare(b.value));
  };
  const makeDataFromStat = (
    stats: { stat: string; base: number[]; gain: number[] }[]
  ) => {
    let categories: { label: string; value: string }[] = [];
    stats.forEach((stat: { stat: string; base: number[]; gain: number[] }) => {
      categories.push({ label: stat.stat, value: stat.stat });
    });
    return categories.sort((a, b) => a.label.localeCompare(b.label));
  };
  const makePlus = () => {
    let plusses: { label: string; value: string }[] = [];
    for (let i = 0; i < 15; i++) {
      plusses.push({ label: i + 1 + "", value: i + 1 + "" });
    }
    return plusses;
  };

  const changeFilter = (target: string, val: any) => {
    let newFilters: $Filter[] = [];
    if (filters.filter((filter) => filter.target === target).length > 0) {
      filters.slice().forEach((filter: $Filter) => {
        if (filter.target === target) {
          let newFilter = { ...filter };
          newFilter.values = val;
          newFilters.push(newFilter);
        } else {
          newFilters.push(filter);
        }
      });
    } else {
      newFilters = [...filters, { target: target, values: val }];
    }
    setFilters(newFilters);
  };

  return (
    <>
      <NewRelicDialog open={showRelicDialog} changeOpen={openNewRelicDialog} />
      {selectedRelic && (
        <EditRelicDialog
          relic={selectedRelic}
          open={selectedRelic ? true : false}
          changeOpen={() => setSelectedRelic(undefined)}
        />
      )}
      <Filter>
        <Rate
          max={5}
          cleanable
          renderCharacter={() => <FaGem />}
          onChange={(val: any) =>
            changeFilter("stars", val === 0 ? "" : val + "")
          }
        />
        <CheckPicker
          data={makePlus()}
          onChange={(val: any) => changeFilter("plus", val)}
          placeholder="Plus"
          style={{ width: 300 }}
          menuStyle={{ width: 300, zIndex: 200 }}
        />
        <CheckPicker
          data={makeDataFromEnum(RelicCategory)}
          onChange={(val: any) => changeFilter("category", val)}
          placeholder="Set"
          style={{ width: 300 }}
          menuStyle={{ width: 300, zIndex: 200 }}
        />
        <CheckPicker
          data={makeDataFromEnum(RelicPlace)}
          onChange={(val: any) => changeFilter("place", val)}
          placeholder="Place"
          style={{ width: 300 }}
          menuStyle={{ width: 300, zIndex: 200 }}
        />
        <CheckPicker
          data={makeDataFromStat(RelicMainStats)}
          onChange={(val: any) => changeFilter("main", val)}
          placeholder="Main"
          style={{ width: 300 }}
          menuStyle={{ width: 300, zIndex: 200 }}
        />
        <CheckPicker
          data={makeDataFromStat(RelicSubStats)}
          onChange={(val: any) => changeFilter("sub", val)}
          placeholder="Sub"
          style={{ width: 300 }}
          menuStyle={{ width: 300, zIndex: 200 }}
        />
      </Filter>
      <Wrapper>
        <NewRelic onClick={() => openNewRelicDialog(true)}>
          <BsFillPatchPlusFill />
        </NewRelic>
        {relics.map((rel, index) => (
          <RelicView
            key={index}
            relic={rel}
            onClick={() => setSelectedRelic(rel)}
          />
        ))}
      </Wrapper>
    </>
  );
};

export default RelicsOverview;

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const Filter = styled(Wrapper)``;

const NewRelic = styled.div`
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
