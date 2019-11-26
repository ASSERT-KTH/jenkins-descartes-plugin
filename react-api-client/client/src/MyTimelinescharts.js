import React, { Component } from 'react';

import { default as TimelinesChart } from 'timelines-chart';

import {Grid, Form, Checkbox, Segment} from "semantic-ui-react";

import * as d3 from "d3";

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

        this.value = "timeslide_pseudo_tested"

        this.timeslide_good_pattern = this.mydata

        this.mycolor = d3.scaleOrdinal(['#47b39d', '#D3D3D3', '#eb6b56', '#ffc153'])

        this.state = {

            commit_data : {timeslide_all: this.mydata, timeslide_good_pattern: this.mydata},
            data_loaded : false
        };
    }

    handleChange = (e, { value }) => {

        this.setState({value})

        if (value === 'updated_methods_last_commit')
        {
            this.mydata = JSON.parse(this.state.commit_data.updated_methods_last_commit)

            var colorz = this.createColorArray(this.mydata)
            this.mycolor = d3.scaleOrdinal(colorz)
        }
        if (value === 'timeslide_partially_tested')
        {
            this.mydata = JSON.parse(this.state.commit_data.timeslide_all_partially_tested_in_last_commit)
            var colorz = this.createColorArray(this.mydata)
            this.mycolor = d3.scaleOrdinal(colorz)
        }

        if (value === 'timeslide_pseudo_tested')
        {
            this.mydata = JSON.parse(this.state.commit_data.timeslide_all_pseudo_tested_in_last_commit)
            var colorz = this.createColorArray(this.mydata)
            this.mycolor = d3.scaleOrdinal(colorz)
        }
        if (value === 'timeslide_good_pattern')
        {
            this.mydata = JSON.parse(this.state.commit_data.timeslide_good_pattern)

            var colorz = this.createColorArray(this.mydata)
            this.mycolor = d3.scaleOrdinal(colorz)
        }
        if (value === 'timeslide_problem_green_to_yellow')
        {
            this.mydata  = JSON.parse(this.state.commit_data.timeslide_problem_green_to_yellow)

            var colorz = this.createColorArray(this.mydata)
            this.mycolor = d3.scaleOrdinal(colorz)
        }
        if (value === 'timeslide_problem_green_to_red')
        {
            this.mydata  = JSON.parse(this.state.commit_data.timeslide_problem_green_to_red)

            var colorz = this.createColorArray(this.mydata)
            this.mycolor = d3.scaleOrdinal(colorz)
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
       //  fetch("http://localhost:3002/timeslide/getTimeslideData")
       fetch("http://130.237.59.170:3002/timeslide/getTimeslideData")
            .then(res => res.json())
            .then(

                res => this.setState({

                    commit_data : res,

                    data_loaded : true

                })).catch(err => err)
            .then((res) => {

                this.myFunction(res);
            })
    }

    myFunction(res) {

      //  alert(typeof this.state.commit_data.timeslide_good_pattern)

        if (typeof this.state.commit_data.timeslide_all === 'string')
        {
            this.mydata =                 JSON.parse(this.state.commit_data.timeslide_all)
        //    this.mydata = JSON.parse(this.state.commit_data.timeslide_good_pattern)
        }
        else
        {
            this.mydata                 =            this.state.commit_data.timeslide_all
         //   this.mydata =            this.state.commit_data.timeslide_good_pattern
        }

        this.mydata_untouched = this.mydata // save ..
    }

    componentDidMount() {

        this.callAPI();

    }

    createColorArray(mydata) {

        var all_classifications = []

        for (var i = 0; i < mydata.length; i++)
        {
            var all_classtypes = mydata[i].data[0].data
            // måste gå igenom ALLA värden.. buhu

            for (var j = 0; j < all_classtypes.length; j++)
            {
                all_classifications.push(all_classtypes[j].val)
                console.log(all_classtypes[j].val)
            }
        }

        var uniqueItems = Array.from(new Set(all_classifications)) // make array of unique values

        var colorArray = []

        for (var i = 0; i < uniqueItems.length; i++) {
            if (uniqueItems[i] === "tested") {
                colorArray.push("#47b39d")
            }
            if (uniqueItems[i] === "pseudo-tested") {
                colorArray.push("#eb6b56")
            }
            if (uniqueItems[i] === "partially-tested") {
                colorArray.push("#ffc153")
            }
            if (uniqueItems[i] === "not-covered")
            {
                colorArray.push("#D3D3D3")
            }
        }

        console.log(JSON.stringify(colorArray))

        return colorArray
    }

    render() {

         if (this.state.data_loaded === true) {

        console.log("------------------typeof.......")
        console.log(typeof this.state.commit_data.timeslide_all)
        console.log("-------------------------------")



        this.map = TimelinesChart().data(this.mydata).zQualitative(true).zColorScale(this.mycolor).width(1400).leftMargin(200).zScaleLabel(["whatis"])    // JSON.parse(this.state.commit_data.timeslide_all)).zQualitative(true).width(1400)
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


             // only the methods that have been updated in the last commit
        return (

            <Form>

                <Grid columns={1} >

                    <Grid.Row>
                        <Grid.Column width={6}>
                            <Segment raised>Number of methods: {this.mydata.length} </Segment>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Form.Field>
                                <Checkbox

                                    label='Only the methods that have been updated in the last commit'
                                    name='checkboxRadioGroup'
                                    value='updated_methods_last_commit'
                                    checked={this.state.value === 'updated_methods_last_commit'}
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                        </Grid.Column>

                        <Grid.Column>
                            <Form.Field>
                                <Checkbox

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
                                    label='All Partially tested methods in the last commit'
                                    name='checkboxRadioGroup'
                                    value='timeslide_partially_tested'
                                    checked={this.state.value === 'timeslide_partially_tested'}
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Field>
                                <Checkbox
                                    label='Good pattern - from anything to green'
                                    name='checkboxRadioGroup'
                                    value='timeslide_good_pattern'
                                    checked={this.state.value === 'timeslide_good_pattern'}
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Field>
                                <Checkbox
                                    label='Problematic patterns - from green to yellow'
                                    name='checkboxRadioGroup'
                                    value='timeslide_problem_green_to_yellow'
                                    checked={this.state.value === 'timeslide_problem_green_to_yellow'}
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Field>
                                <Checkbox
                                    label='Problematic patterns - from green to red'
                                    name='checkboxRadioGroup'
                                    value='timeslide_problem_green_to_red'
                                    checked={this.state.value === 'timeslide_problem_green_to_red'}
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
