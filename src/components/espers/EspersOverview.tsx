import { useEffect, useState } from "react";
import styled from "styled-components";
import { reciveAllEspers, saveNewEsper } from "../../services/DatabaseService";
import { BsFillPatchPlusFill, BsNodePlusFill } from "react-icons/bs";

import Esper, { $Esper } from "./Esper";
import { generateEspers } from "../../services/RandomService";
import NewEsperDialog from "./NewEsperDialog";

const EspersOverview = () => {
  const [espers, setEspers] = useState<$Esper[]>([]);
  const [newEsper, setNewEsper] = useState<$Esper>();
  const [showEsperDialog, openNewEsperDialog] = useState<boolean>(false);

  useEffect(() => {
    reciveAllEspers((results: any) => setEspers(results));
  }, []);

  const esps = generateEspers(5);

  return (
    <>
      <NewEsperDialog open={showEsperDialog} changeOpen={openNewEsperDialog} />
      <Wrapper>
        <NewEsper onClick={() => openNewEsperDialog(true)}>
          <BsFillPatchPlusFill />
        </NewEsper>
        {espers.map((rel, index) => (
          <Esper key={index} esper={rel} />
        ))}
        <Sep />
        {esps.map((rel, index) => (
          <Esper key={index} esper={rel} />
        ))}
      </Wrapper>
    </>
  );
};

export default EspersOverview;

const Wrapper = styled.div`
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

const NewEsper = styled.div`
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
