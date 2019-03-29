import React from 'react';
import { Container, Image, Menu } from 'semantic-ui-react';

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
