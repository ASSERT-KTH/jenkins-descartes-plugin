import React, {Component} from 'react'

import ReactJson from 'react-json-view'

import JSONPretty from 'react-json-pretty';

import {Statistic, Grid, Placeholder, Header, Segment, Container} from 'semantic-ui-react'

import axios from 'axios';

import './Treeview.css';


class Testview extends Component {

    constructor(props) {
        super(props);

        this.state = {

            treeview_items: [],
            data_loaded: false
        };

        this.printTreeview = this.printTreeview.bind(this);
    }

    componentDidMount() {
        this.printTreeview();
    }

    printTreeview() {

        var data

        if (this.props.match.params.id === 'partiallytested')
            data = JSON.parse(this.props.location.state.partially_tested)

        if (this.props.match.params.id === 'pseudotested')
            data = JSON.parse(this.props.location.state.pseudo_tested)

        var arr = data[this.props.location.state.package_name]

        console.log(this.props.match.params.id)
        console.log(data)

        this.state.treeview_items = []

                for (var i = 0; i < arr.length; i++) {
                    var obj = arr[i];
                    for (var key in obj) {
                        var attrName = key;
                        var attrValue = obj[key];

                        if (String(attrName).indexOf('link') > -1) // if key contains 'link' .. 1..2..
                        {
                            var lastPart = attrValue.split("/").pop();

                            console.log(attrValue)
                            this.state.treeview_items.push(<p className="mylinks"><a href={attrValue}>{lastPart}</a></p>)
                        }
                        if (String(key).indexOf('test') > -1) // if key contains 'link' .. 1..2..
                        {
                            console.log(attrValue)


                            var arrayLength = attrValue.length;
                            for (var i = 0; i < arrayLength; i++) {
                                console.log(attrValue[i]);
                                //Do something
                            //    this.state.modal_items.push(<p>Tests: {attrValue[i]}</p>)
                                this.state.treeview_items.push(<p className="mytest">{attrValue}</p>)
                            }

                        }
                    }
                }
        this.setState({data_loaded: true})
     }


    render() {


        if (this.state.data_loaded === false) {
            return null;
        }

        return (


            <Grid>
                <Grid.Row>
                    <Grid.Column width={9}>
                        <Header as='h3' dividing>
                            {this.props.location.state.package_name}
                        </Header>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Column width={9}>
                    {this.state.treeview_items.map(item => (
                        <div>{item}</div>
                    ))}
                </Grid.Column>
            </Grid>


        );
    }


}

export default Testview;




