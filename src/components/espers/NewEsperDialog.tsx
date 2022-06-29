import { useState } from "react";
import {
  Modal,
  Button,
  Input,
  InputGroup,
  InputNumber,
  InputPicker,
} from "rsuite";
import { $Esper, EsperType } from "./Esper";
import styled from "styled-components";
import { saveNewEsper } from "../../services/DatabaseService";

interface $Props {
  open: boolean;
  changeOpen: (val: boolean) => void;
}

const NewEsperDialog = ({ open, changeOpen }: $Props) => {
  const [newEsper, setNewEsper] = useState<$Esper>({
    name: "",
    type: EsperType.Flow,
    level: 50,
    stars: 5,
    resonance: 3,
    image: "",

    hp: 0,
    atk: 0,
    def: 0,
    spd: 0,
    crate: 0,
    cdmg: 0,
    acc: 0,
    resist: 0,

    relics: [],
  });

  const saveEsper = () => {
    if (newEsper) saveNewEsper(newEsper);
    changeOpen(false);
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

  return (
    <Modal open={open} onClose={() => changeOpen(false)}>
      <Modal.Header>
        <Modal.Title>Add New Esper</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalWrapper>
          <InputGroup style={{ width: 180 }}>
            <InputGroup.Addon>Name </InputGroup.Addon>
            <Input
              value={newEsper.name}
              onChange={(val: any) =>
                setNewEsper((r) => {
                  return { ...r, name: val };
                })
              }
            />
          </InputGroup>
          <InputGroup style={{ width: 180 }}>
            <InputGroup.Addon>Pic </InputGroup.Addon>
            <Input
              value={newEsper.image}
              onChange={(val: any) =>
                setNewEsper((r) => {
                  return { ...r, image: val };
                })
              }
            />
          </InputGroup>
          <InputNumber
            value={newEsper.level}
            onChange={(val: any) =>
              setNewEsper((r) => {
                return { ...r, level: val };
              })
            }
            prefix="Level"
            max={60}
            min={1}
            style={{ width: 120 }}
          />
          <InputNumber
            value={newEsper.stars}
            onChange={(val: any) =>
              setNewEsper((r) => {
                return { ...r, stars: val };
              })
            }
            prefix="Stars"
            max={6}
            min={2}
            style={{ width: 110 }}
          />
          <InputNumber
            value={newEsper.resonance}
            onChange={(val: any) =>
              setNewEsper((r) => {
                return { ...r, resonance: val };
              })
            }
            prefix="Reso"
            max={6}
            min={0}
            style={{ width: 110 }}
          />
          <InputPicker
            defaultValue={EsperType[newEsper.type]}
            data={makeDataFromEnum(EsperType)}
            onChange={(val: any) =>
              setNewEsper((r) => {
                return { ...r, type: val };
              })
            }
            cleanable={false}
            style={{ width: 120 }}
          />
          <Sep />
          <InputNumber
            value={newEsper.hp}
            onChange={(val: any) =>
              setNewEsper((r) => {
                return { ...r, hp: val };
              })
            }
            prefix="Hp"
            style={{ width: 140 }}
          />
          <InputNumber
            value={newEsper.atk}
            onChange={(val: any) =>
              setNewEsper((r) => {
                return { ...r, atk: val };
              })
            }
            prefix="Atk"
            style={{ width: 130 }}
          />
          <InputNumber
            value={newEsper.def}
            onChange={(val: any) =>
              setNewEsper((r) => {
                return { ...r, def: val };
              })
            }
            prefix="Def"
            style={{ width: 130 }}
          />
          <InputNumber
            value={newEsper.spd}
            onChange={(val: any) =>
              setNewEsper((r) => {
                return { ...r, spd: val };
              })
            }
            prefix="Speed"
            style={{ width: 135 }}
          />
          <InputNumber
            value={newEsper.crate}
            onChange={(val: any) =>
              setNewEsper((r) => {
                return { ...r, crate: val };
              })
            }
            prefix="C.Rate"
            style={{ width: 135 }}
          />
          <InputNumber
            value={newEsper.cdmg}
            onChange={(val: any) =>
              setNewEsper((r) => {
                return { ...r, cdmg: val };
              })
            }
            prefix="C.Dmg"
            style={{ width: 135 }}
          />
          <InputNumber
            value={newEsper.acc}
            onChange={(val: any) =>
              setNewEsper((r) => {
                return { ...r, acc: val };
              })
            }
            prefix="Acc"
            style={{ width: 120 }}
          />
          <InputNumber
            value={newEsper.resist}
            onChange={(val: any) =>
              setNewEsper((r) => {
                return { ...r, resist: val };
              })
            }
            prefix="Res"
            style={{ width: 120 }}
          />
        </ModalWrapper>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={saveEsper} appearance="primary">
          Save
        </Button>
        <Button onClick={() => changeOpen(false)} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewEsperDialog;

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
