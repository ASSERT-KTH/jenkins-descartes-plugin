import React, { Component } from 'react';

import axios from 'axios';

import { default as TimelinesChart } from 'timelines-chart';

import {Grid, Form, Checkbox, Segment} from "semantic-ui-react";

import './MyTimelinescharts.css';

export default class MyTimelinescharts extends Component {

    constructor(props) {
        super(props);

        this.mydata = [
            {
                group: "method1",   // MAN SKULLE BARA KUNNA BYGGA PÅ ... SAMMA GROUP..  måste vara unikt...sen blir de långt å fult kanske.. fukk....
                data: [

                    {
                        label: "package",
                        data: [
                            {
                                timeRange: ["2019-06-01", "2019-06-05"],  // add github commit timestamps here..
                                val: "tested"                                  //  create method in probot.. gå igenom alla mongoDB inlägg.. å skapa den denna data..å sen spara..
                            }
                        ]
                    },
                    {
                        label: "package",
                        data: [
                            {
                                timeRange: ["2019-06-01", "2019-06-05"],  // add github commit timestamps here..
                                val: "tested"                                  //  create method in probot.. gå igenom alla mongoDB inlägg.. å skapa den denna data..å sen spara..
                            }
                        ]
                    },


                ]
            }
        ]

        this.mydata_untouched = []
        this.state = {

            commit_data : {timeslide_all: this.mydata}, // "[{\"group\":\"method1\",\"data\":[{\"label\":\"package\",\"data\":[{\"timeRange\":[\"2019-06-01\",\"2019-06-05\"],\"val\":\"Tested\"}]}]}]"} ,

            data_loaded : false,

        //    value: 'default',
            timeslide_version : this.mydata, //"[{\"group\":\"method1\",\"data\":[{\"label\":\"package\",\"data\":[{\"timeRange\":[\"2019-06-01\",\"2019-06-05\"],\"val\":\"Tested\"}]}]}]",

            // får göra en fuling..
            timeslide_default : this.mydata, // "[{\"group\":\"method1\",\"data\":[{\"label\":\"package\",\"data\":[{\"timeRange\":[\"2019-06-01\",\"2019-06-05\"],\"val\":\"Tested\"}]}]}]",
            timeslide_partially_tested : this.mydata, // "[{\"group\":\"method1\",\"data\":[{\"label\":\"package\",\"data\":[{\"timeRange\":[\"2019-06-01\",\"2019-06-05\"],\"val\":\"Tested\"}]}]}]",
            timeslide_pseudo_tested : this.mydata // "[{\"group\":\"method1\",\"data\":[{\"label\":\"package\",\"data\":[{\"timeRange\":[\"2019-06-01\",\"2019-06-05\"],\"val\":\"Tested\"}]}]}]"
        };
    }

    handleChange = (e, { value }) => {

        this.setState({value})

        if (value === 'default')
        {
            this.mydata = this.mydata_untouched
        }
        if (value === 'timeslide_partially_tested')
        {


            this.mydata = this.mydata_untouched
            this.mydata = this.filterTests(this.mydata, "partially-tested")
        }

        if (value === 'timeslide_pseudo_tested')
        {
            this.mydata = this.mydata_untouched
            this.mydata = this.filterTests(this.mydata, "pseudo-tested")
        }


        var elem = document.querySelector('#Timelineview');  // UGLY HACK to remove SVG component that keeps on adding to the DIV as children..d3 stuff..
        elem.innerHTML = '';
    }

    //DETTA SKA VARA FALSE!! MEN jag har lite fula hacks för att rendera om.. men den SKA va false..sen.. :-/
 //   shouldComponentUpdate() {
        // component will never update
   //     return false;
 //  }

    callAPI() {
     //   fetch("http://localhost:3001/timeslide/getTimeslideData")
        fetch("http://130.237.59.170:3002/timeslide/getTimeslideData")
            .then(res => res.json())
            .then(

                res => this.setState({

                    commit_data : res, // "[{\"group\":\"method1\",\"data\":[{\"label\":\"package\",\"data\":[{\"timeRange\":[\"2019-06-01\",\"2019-06-05\"],\"val\":\"Tested\"}]}]}]"} ,

                    data_loaded : true,

                  //  value: 'default',
                    timeslide_version : res, //"[{\"group\":\"method1\",\"data\":[{\"label\":\"package\",\"data\":[{\"timeRange\":[\"2019-06-01\",\"2019-06-05\"],\"val\":\"Tested\"}]}]}]",

                    // får göra en fuling..
                    timeslide_default : res, // "[{\"group\":\"method1\",\"data\":[{\"label\":\"package\",\"data\":[{\"timeRange\":[\"2019-06-01\",\"2019-06-05\"],\"val\":\"Tested\"}]}]}]",
                    timeslide_partially_tested : res, // "[{\"group\":\"method1\",\"data\":[{\"label\":\"package\",\"data\":[{\"timeRange\":[\"2019-06-01\",\"2019-06-05\"],\"val\":\"Tested\"}]}]}]",
                    timeslide_pseudo_tested : res // "[{\"group\":\"method1\",\"data\":[{\"label\":\"package\",\"data\":[{\"timeRange\":[\"2019-06-01\",\"2019-06-05\"],\"val\":\"Tested\"}]}]}]"

                })).catch(err => err)
            .then((res) => {

                this.myFunction(res);

            })
    }

    myFunction(res) {

        if (typeof this.state.commit_data.timeslide_all === 'string')
        {
            this.mydata = JSON.parse(this.state.commit_data.timeslide_all)
        }
        else
        {
            this.mydata = this.state.commit_data.timeslide_all
        }

        this.mydata_untouched = this.mydata // save ..
    }

    componentDidMount() {

        this.callAPI();

    }

    filterTests(unfiltered_data , filter_type)
    {
        var filtered = []

        for (var i = 0; i < unfiltered_data.length; i++)
        {
            var classification = unfiltered_data[i].data[0].data[0].val

            if (classification === filter_type)
            {
                var wanted_data = unfiltered_data[i]
                wanted_data.data[0].data.length = 1
                filtered.push( wanted_data)
            }
        }
        return filtered
    }

    render() {

         if (this.state.data_loaded === true) {



        console.log("------------------typeof.......")
        console.log(typeof this.state.commit_data.timeslide_all)
        console.log("-------------------------------")


        this.map = TimelinesChart().data(this.mydata).zQualitative(true).width(1400)    // JSON.parse(this.state.commit_data.timeslide_all)).zQualitative(true).width(1400)
        this.map(this.refs.map)

     /*
        if (typeof this.state.commit_data.timeslide_all === 'string')
        {
            // kolla vad som är valt i checkbox.. sätt den vad som ska renderas....åå...

            this.map = TimelinesChart().data(JSON.parse(this.mydata)).zQualitative(true).width(1400)    // JSON.parse(this.state.commit_data.timeslide_all)).zQualitative(true).width(1400)
            this.map(this.refs.map)
        }
        else
        {
            this.map = TimelinesChart().data(this.mydata).zQualitative(true).width(1400)    // JSON.parse(this.state.commit_data.timeslide_all)).zQualitative(true).width(1400)
            this.map(this.refs.map)
        }
        */

     // funkar inte..   this.map.select("#the_SVG_ID").remove();

        // det som händer är att man d3 lägger till children till svg varje gång... så ... vet inte hur jag ska få d3.select..remove att funka..
        // det är som att de inte är d3 ..på nått sätt..jag vill ju inte ta bort den på en gång...för då har den ingenstans att vara...
        // det bästa vore om den blev en react component på riktigt med tex: encapsule:JSON.stringify(this.state.commit_data.timeslide_all)

        return (

            <Form>

                <Grid columns={1} >

                    <Grid.Row>
                        <Grid.Column width={13}>
                            <Segment raised>Amount of: {this.mydata.length} </Segment>
                        </Grid.Column>
                    </Grid.Row>


                    <Grid.Row>
                        <Grid.Column>
                            <Form.Field>
                                <Checkbox
                                    radio
                                    label='Default'
                                    name='checkboxRadioGroup'
                                    value='default'
                                    checked={this.state.value === 'default'}
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Field>
                                <Checkbox
                                    radio
                                    label='All Pseudo tested methods in the last commit'
                                    name='checkboxRadioGroup'
                                    value='timeslide_pseudo_tested'
                                    checked={this.state.value === 'timeslide_pseudo_tested'}
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Field>
                                <Checkbox
                                    radio
                                    label='All Partially tested methods in the last commit'
                                    name='checkboxRadioGroup'
                                    value='timeslide_partially_tested'
                                    checked={this.state.value === 'timeslide_partially_tested'}
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                        </Grid.Column>

                    </Grid.Row>

                    <Grid.Row>
                        <div style={{ height: '100%' }} id="Timelineview" ref="map" />
                    </Grid.Row>

                </Grid>
            </Form>

        );
    }else return null

                    }
}
