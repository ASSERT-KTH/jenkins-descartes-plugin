import React from 'react';
import { Header, Container, Image, Menu } from 'semantic-ui-react';

import './Menu.css';

export default () => (
  <Menu id="top-menu">
    <Container>

      <Menu color="grey" widths={1} position="center">
        <h1 size="large" className="myh1">Dashboard</h1>
      </Menu>

    </Container>
  </Menu>
);
