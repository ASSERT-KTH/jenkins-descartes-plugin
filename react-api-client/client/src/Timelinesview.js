import React, { Component } from 'react';

import './Timelinesview.css';

import MyTimelinescharts from "./MyTimelinescharts";

export default class Timelinesview extends Component {

    render() {

        return (

            <div id="Timeline">
                <MyTimelinescharts />
            </div>
        );
    }
}
