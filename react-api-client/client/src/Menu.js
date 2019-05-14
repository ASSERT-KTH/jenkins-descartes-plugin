import React from 'react';
import { Header, Container, Image, Menu } from 'semantic-ui-react';

import './Menu.css';

export default () => (
  <Menu id="top-menu">
    <Container>
      <Menu.Item as="a" header>
        <Image
          size="mini"
          src="favicon.ico"
        />
      </Menu.Item>

      <Menu color="white" widths={3} position="left">
        <h1 class="myh1">Dashboard</h1>
      </Menu>

      <Menu.Menu position="right">
        <Menu.Item as="a" name="login">
          Login
        </Menu.Item>

        <Menu.Item as="a" name="register">
          Register
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
);
