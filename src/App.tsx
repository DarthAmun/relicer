import { useState } from "react";
import styled from "styled-components";
import { Navbar, Nav } from "rsuite";
import { FaCog } from "react-icons/fa";
import { ImMakeGroup } from "react-icons/im";
import { GiRuneStone, GiCompactDisc, GiSwordClash } from "react-icons/gi";
import packageJson from "./../package.json";
import RelicsOverview from "./components/relics/RelicsOverview";
import { RelicerDB } from "./database/RelicerDB";
import EspersOverview from "./components/espers/EspersOverview";
import Settings from "./components/Settings";
import RelicsSetsOverview from "./components/relics/RelicsSetsOverview";

const App = () => {
  const [active, setActive] = useState<string>("relics");

  const db = new RelicerDB();
  db.open().catch(function (e) {
    console.error("Open failed: " + e);
  });

  return (
    <>
      <Navbar>
        <Version>v{packageJson.version}</Version>
        <Nav activeKey={active} onSelect={setActive}>
          <Nav.Item icon={<GiRuneStone />} eventKey="relics">
            Relics
          </Nav.Item>
          <Nav.Item icon={<ImMakeGroup />} eventKey="relicsSets">
            Relic Sets
          </Nav.Item>
          {/* <Nav.Item icon={<GiCompactDisc />} eventKey="espers">
            Espers
          </Nav.Item>
          <Nav.Item icon={<GiSwordClash />} eventKey="esperTest">
            Team Test
          </Nav.Item> */}
        </Nav>
        <Nav pullRight activeKey={active} onSelect={setActive}>
          <Nav.Item icon={<FaCog />} eventKey="settings">
            Settings
          </Nav.Item>
        </Nav>
      </Navbar>
      <Content>
        {active === "relics" && <RelicsOverview />}
        {active === "relicsSets" && <RelicsSetsOverview />}
        {active === "espers" && <EspersOverview />}
        {active === "settings" && <Settings />}
      </Content>
    </>
  );
};

export default App;

const Content = styled.div``;
const Version = styled.span`
  padding: 10px;
  height: 55px;
  float: left;
  line-height: 35px;
`;
