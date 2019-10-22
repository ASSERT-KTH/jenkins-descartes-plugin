import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import HeaderMenu from "./HeaderMenu";
import Footer from "./Footer";
import styled from "styled-components";

import { Tab,Grid,Divider, Container } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';

import App from './App';
import Treeview from './Treeview'
import Pseudoview from './Pseudoview'
import Calendar from "./Calendar";
import MyMenu from './MyMenu';
import Testview from "./Testview";

import './index.css';
import Timelinesview from "./Timelinesview";

const Commitresults = () => <App/>;
const Tree = () => <Treeview/>;
const Pseudo = () => <Pseudoview/>;
const Cal = () => <Calendar/>;
const Time = () => <Timelinesview/>;



const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  margin-left: 1em;
  margin-right: 1em;
`;
const Content = styled(Container)`

  flex: 3;
padding: 1em;

 
`;

ReactDOM.render(
    <Router>
        <Wrapper>
        <MyMenu/>
            <Content>
        <Grid>
            <Grid.Column width={2} >
                <HeaderMenu
                    onItemClick={item => this.onItemClick(item)}
                    items={[
                        ["Commit Results", "/"],  // + commit-id som kommer in...
                        ["Partially Tested", "/partiallytested"],
                        ["Pseudo Tested", "/pseudotested"],
                        ["Historical Results", "/historicalresults"],
                        ["Timelines Result", "/timelines"]
                    //    ["Wrong url", "/wrongurl"]
                    ]}
                    // headerIcon={"file code outline"}      //      <Route component={MissingPage} />

                    //
                    // Using a switch ..with the last component set to default is a bad way to make things work.. debt...
                />
            </Grid.Column>

            <Grid.Column width={12}>

                    <Switch>
                        <Route path="/partiallytested" component={Tree} />
                        <Route path="/pseudotested" component={Pseudo} />
                        <Route path="/historicalresults" component={Cal} />
                        <Route path="/testview/:id" component={Testview}/>
                        <Route path="/timelines" component={Time} />
                        <Route path="/" component={Commitresults} />
                    </Switch>

            </Grid.Column>
        </Grid>
            </Content>
        <Footer />
      </Wrapper>
    </Router>,
    document.getElementById("root")
);
