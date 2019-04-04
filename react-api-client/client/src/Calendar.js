import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';

import CalendarHeatmap from 'reactjs-calendar-heatmap'

import axios from 'axios';

import moment from 'moment'

class Calendar extends Component {

    constructor(props) {
        super(props)


        this.state = {

            data: [
                {
                    "date": "2019-03-13T10:36:59.780Z",
                    "total": "99999",
                    "details": [
                        {
                            "name": "e71cd301ed679f53aa5910be19649364dd09c935",
                            "date": "2019-03-13T10:36:59.780Z",
                            "value": "17"
                        }
                    ]
                },
                {
                    "date": "2019-05-14T10:36:59.780Z",
                    "total": "99999",
                    "details": [
                        {
                            "name": "e71cd301ed679f53aa5910be19649364dd09c295",
                            "date": "2019-05-14T10:36:59.780Z",
                            "value": "10"
                        }
                    ]
                },
                {
                    "date": "2019-05-17T10:36:59.780Z",
                    "total": "99999",
                    "details": [
                        {
                            "name": "e71cd301ed679f53aa5910be19649364dd09c995",
                            "date": "2019-05-17T10:36:59.780Z",
                            "value": "5"
                        }
                    ]
                }
            ],
            color: "#ffc153",
            overview: 'year',
            data_loaded : false
        }

    }

    componentDidMount(){

            axios.get(`http://130.237.59.170:3002/calendar/getCalenderData`)
                .then(({ data }) => {

                    this.setState({
                        data : data,
                        data_loaded : true

                    });

                });

    }

    print(val) {
        console.log(val)
    }


    // WARNING.. :-) Rendering will only be done AFTER the fetching of data, since I dont know how to re-render calender
    // with the new data after fetching .. its this d3 related or react.. d3/SVG i guess.. nivo handles this automatic... :-/
    render() {

        if (this.state.data_loaded === false) {
            return null;
        }

        return (

            <CalendarHeatmap
                data={this.state.data}
                color={this.state.color}
                overview={this.state.overview}
                handler={this.print.bind(this)}>
            </CalendarHeatmap>
        )
    }
}


export default Calendar;
