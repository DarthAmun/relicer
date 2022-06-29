import { useState } from "react";
import { BsNodePlusFill } from "react-icons/bs";
import { FaGem } from "react-icons/fa";
import { RiDeleteRow } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import {
  Modal,
  Rate,
  InputNumber,
  InputPicker,
  Checkbox,
  IconButton,
  Button,
} from "rsuite";
import { saveNewRelic } from "../../services/DatabaseService";
import styled from "styled-components";
import Relic, {
  RelicCategory,
  RelicPlace,
  RelicMainStats,
  RelicSubStats,
} from "../../data/Relic";

interface $Props {
  open: boolean;
  changeOpen: (val: boolean) => void;
}

const NewRelicDialog = ({ open, changeOpen }: $Props) => {
  const [newRelic, setNewRelic] = useState<Relic>({
    id: 0,
    uuid: "",
    stars: 5,
    plus: 15,
    category: RelicCategory.AbidingPanacea,
    place: RelicPlace.Circle,
    mainStat: { type: 0 },
    subStats: [{ type: 0, bonus: 0, isAdded: true }],
  });

  const saveRelic = () => {
    newRelic.uuid = uuidv4();
    if (newRelic) {
      saveNewRelic(newRelic);
      setNewRelic({
        id: 0,
        uuid: "",
        stars: 5,
        plus: 15,
        category: RelicCategory.AbidingPanacea,
        place: RelicPlace.Circle,
        mainStat: { type: 0 },
        subStats: [{ type: 0, bonus: 0, isAdded: true }],
      });
    }

    changeOpen(false);
  };

  const addNewSubStat = () => {
    setNewRelic((r) => {
      return {
        ...r,
        subStats: [...r.subStats, { type: 0, bonus: 0, isAdded: false }],
      };
    });
  };

  const deleteSubStat = (index: number) => {
    let subs = [...newRelic.subStats];
    if (index > -1) {
      subs.splice(index, 1);
    }

    setNewRelic((r) => {
      return {
        ...r,
        subStats: subs,
      };
    });
  };

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
    let categories: { label: string; value: number }[] = [];
    stats.forEach(
      (
        stat: { stat: string; base: number[]; gain: number[] },
        index: number
      ) => {
        categories.push({ label: stat.stat, value: index });
      }
    );
    return categories.sort((a, b) => a.label.localeCompare(b.label));
  };

  return (
    <Modal open={open} onClose={() => changeOpen(false)}>
      <Modal.Header>
        <Modal.Title>Add New Relic</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalWrapper>
          <Rate
            max={6}
            value={newRelic.stars}
            renderCharacter={() => <FaGem />}
            onChange={(val: any) =>
              setNewRelic((r) => {
                return { ...r, stars: val };
              })
            }
          />
          <InputNumber
            value={newRelic.plus}
            onChange={(val: any) =>
              setNewRelic((r) => {
                return { ...r, plus: val };
              })
            }
            prefix="+"
            max={15}
            min={0}
            style={{ width: 100 }}
          />
          <InputPicker
            defaultValue={RelicCategory[newRelic.category]}
            data={makeDataFromEnum(RelicCategory)}
            onChange={(val: any) =>
              setNewRelic((r) => {
                return { ...r, category: val };
              })
            }
            cleanable={false}
            style={{ width: 224 }}
          />
          <InputPicker
            defaultValue={RelicPlace[newRelic.place]}
            data={makeDataFromEnum(RelicPlace)}
            onChange={(val: any) =>
              setNewRelic((r) => {
                return { ...r, place: val };
              })
            }
            cleanable={false}
            style={{ width: 224 }}
          />
          <Sep></Sep>
          Main Stat
          <InputPicker
            defaultValue={RelicMainStats[newRelic.mainStat.type].stat}
            data={makeDataFromStat(RelicMainStats)}
            onChange={(val: any) =>
              setNewRelic((r) => {
                return { ...r, mainStat: { ...r.mainStat, type: val } };
              })
            }
            cleanable={false}
            style={{ width: 100 }}
          />
          <Sep></Sep>
          {newRelic.subStats.map((substat, index) => (
            <SubStatRow>
              <Checkbox
                checked={substat.isAdded}
                onChange={(val: any, check: boolean) =>
                  setNewRelic((r) => {
                    let subs = [...newRelic.subStats];
                    subs[index].isAdded = check;
                    return {
                      ...r,
                      subStats: subs,
                    };
                  })
                }
              ></Checkbox>
              <InputPicker
                defaultValue={RelicSubStats[substat.type].stat}
                data={makeDataFromStat(RelicSubStats)}
                onChange={(val: any) =>
                  setNewRelic((r) => {
                    let subs = [...newRelic.subStats];
                    subs[index].type = val;
                    return {
                      ...r,
                      subStats: subs,
                    };
                  })
                }
                cleanable={false}
                style={{ width: 100 }}
              />
              <InputNumber
                value={substat.bonus}
                onChange={(val: any) =>
                  setNewRelic((r) => {
                    let subs = [...newRelic.subStats];
                    subs[index].bonus = val;
                    return {
                      ...r,
                      subStats: subs,
                    };
                  })
                }
                prefix="+"
                max={5}
                min={0}
                style={{ width: 100 }}
              />
              <IconButton
                size="sm"
                color="red"
                appearance="primary"
                icon={<RiDeleteRow />}
                onClick={() => deleteSubStat(index)}
              />
            </SubStatRow>
          ))}
          {newRelic.subStats.length < 4 && (
            <IconButton
              size="sm"
              icon={<BsNodePlusFill />}
              onClick={addNewSubStat}
            />
          )}
        </ModalWrapper>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={saveRelic} appearance="primary">
          Save
        </Button>
        <Button onClick={() => changeOpen(false)} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewRelicDialog;

const ModalWrapper = styled.div`
  padding: 10px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const SubStatRow = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const Sep = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 1px solid black;
`;
