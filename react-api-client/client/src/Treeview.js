import React, { Component } from 'react'

import axios from 'axios'

import ReactJson from 'react-json-view'

import JSONPretty from 'react-json-pretty';

class Treeview extends Component {

    constructor(props) {
        super(props);

        var mystring = '{"name": "chart","color": "hsl(299, 70%, 50%)","loc": 186161}'

        this.state = {

            commit_data : {commit_id: "57a288746b9e67dead9ef1d6788620bd6f8184ae", date: new Date("2019-03-05T21:23:23.446Z"),username: "martinch-kth",
                           repository:"commons-codec", packages_partially_tested: '{"pack":[{"link":"http://some/somelink"}]}' ,
                           commit_url: "http://github/somecommit_url" , treemap : mystring,
                           methods_total: "33",tested_total: "22", partially_tested_total: "22", non_covered_total: "22"}
        };
    }

    callAPI() {
        fetch("http://130.237.59.170:3002/users" + window.location.pathname)
            .then(res => res.json())
            .then(res => this.setState({ commit_data: res

            })).catch(err => err)
    }

    componentDidMount() {
        this.callAPI();
    }  



  render() {

   // var data = Array.from(this.state.commit_data.packages_partially_tested);

    return (
     
      <ReactJson src={JSON.parse(this.state.commit_data.packages_partially_tested)} name={false} displayDataTypes={false} collapsed={false} />


    );
  }


}
export default Treeview;




