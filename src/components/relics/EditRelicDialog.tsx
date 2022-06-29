import { useState } from "react";
import { BsNodePlusFill } from "react-icons/bs";
import { FaGem } from "react-icons/fa";
import { RiDeleteRow, RiDiscordFill } from "react-icons/ri";
import {
  Modal,
  Rate,
  InputNumber,
  InputPicker,
  Checkbox,
  IconButton,
  Button,
} from "rsuite";
import { updateRelic } from "../../services/DatabaseService";
import styled from "styled-components";
import { sendEmbedMessage } from "../../services/DiscordService";
import { useWebhook } from "../../hook/WebhookHook";
import Relic, {
  RelicMainStats,
  RelicCategory,
  RelicPlace,
  RelicSubStats,
} from "../../data/Relic";

interface $Props {
  relic: Relic;
  open: boolean;
  changeOpen: (val: boolean) => void;
}

const EditRelicDialog = ({ relic, open, changeOpen }: $Props) => {
  let webhook = useWebhook();
  const [newRelic, setNewRelic] = useState<Relic>(relic);

  const saveRelic = () => {
    if (newRelic) {
      updateRelic(newRelic);
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

  const pickColor = () => {
    switch (relic.stars) {
      case 6:
        return "15426678";
      case 5:
        return "15381085";
      case 4:
        return "12211667";
      case 3:
        return "9498256";
      default:
        return "16777215";
    }
  };

  const sendRelic = () => {
    if (webhook) {
      let fields: any[] = [
        {
          name: "Main Stat",
          value: `${RelicMainStats[relic.mainStat.type].stat} ${
            RelicMainStats[relic.mainStat.type].base[relic.stars - 3] +
            RelicMainStats[relic.mainStat.type].gain[relic.stars - 3] *
              relic.plus
          }`,
          inline: false,
        },
      ];
      relic.subStats.forEach((sub, index) => {
        fields.push({
          name: `${index + 1} Sub`,
          value: `${sub.isAdded ? "•" : ""} ${RelicSubStats[sub.type].stat} ${
            RelicSubStats[sub.type].base[relic.stars - 2] +
            RelicSubStats[sub.type].gain[relic.stars - 2] *
              (sub.bonus ? sub.bonus : 0)
          } ${sub.bonus && sub.bonus > 0 ? `(${sub.bonus})` : ""}`,
          inline: true,
        });
      });

      let newJson = {
        username: webhook.name + " (Relicer)",
        embeds: [
          {
            color: pickColor(),
            author: {
              name: `${relic.stars}* ${relic.category} ${relic.place} +${relic.plus}`,
            },
            fields: fields,
            footer: {
              text: "Manage your own relics (https://darthamun.github.io/relicer/)",
            },
          },
        ],
      };
      sendEmbedMessage(webhook, JSON.stringify(newJson));
    }
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
            defaultValue={newRelic.category}
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
            defaultValue={newRelic.place}
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
            defaultValue={newRelic.mainStat.type}
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
                defaultValue={substat.type}
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
          Update
        </Button>
        <Button onClick={() => changeOpen(false)} appearance="subtle">
          Cancel
        </Button>
        {webhook !== undefined && (
          <Button onClick={() => sendRelic()}>
            <RiDiscordFill />
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default EditRelicDialog;

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
