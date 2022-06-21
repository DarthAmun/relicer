import { useState } from "react";
import styled from "styled-components";
import { Navbar, Nav } from "rsuite";
import { FaCog, FaHome } from "react-icons/fa";
import { GiRuneStone } from "react-icons/gi";
import packageJson from "./../package.json";
import RelicsOverview from "./components/RelicsOverview";
import Home from "./components/Home";

const App = () => {
  const [active, setActive] = useState<string>("home");
  return (
    <>
      <Navbar>
        <Version>v{packageJson.version}</Version>
        <Nav activeKey={active} onSelect={setActive}>
          <Nav.Item icon={<FaHome />} eventKey="home">
            Home
          </Nav.Item>
          <Nav.Item icon={<GiRuneStone />} eventKey="relics">
            Relics
          </Nav.Item>
        </Nav>
        <Nav pullRight>
          <Nav.Item icon={<FaCog />}>Settings</Nav.Item>
        </Nav>
      </Navbar>
      <Content>
        {active === "home" && <Home />}
        {active === "relics" && <RelicsOverview />}
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
