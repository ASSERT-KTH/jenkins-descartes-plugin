import React, { Component } from 'react'

import ReactJson from 'react-json-view'

import JSONPretty from 'react-json-pretty';

import { Statistic,Grid, Placeholder, Header , Segment } from 'semantic-ui-react'

import axios from 'axios';

import './Treeview.css';

class Treeview extends Component {

    constructor(props) {
        super(props);

        var mystring = '{"name": "chart","color": "hsl(299, 70%, 50%)","loc": 186161}'

        this.state = {

            commit_data : {commit_id: "57a288746b9e67dead9ef1d6788620bd6f8184ae", date: new Date("2019-03-05T21:23:23.446Z"),username: "martinch-kth",
                           repository:"commons-codec", packages_partially_tested: '{"pack":[{"link":"http://some/somelink"}]}' ,
                           commit_url: "http://github/somecommit_url" , treemap : mystring,
                           methods_total: "33",tested_total: "22", partially_tested_total: "22", non_covered_total: "22"},
            treeview_items : [],
            data_loaded : false
        };

        this.printTreeview = this.printTreeview.bind(this);
    }

    callAPI() {
       //  fetch("http://localhost:3001/users/af452b82090ad9cfbdab88afc3eccc64f81610c3") // fake it...   window.location.pathname)
           fetch("http://130.237.59.170:3002/users" + window.location.pathname)
            .then(res => res.json())
            .then(res => this.setState({
                                         commit_data: res,
                                         data_loaded: true
            })).catch(err => err)
    }

    componentDidMount() {
        this.callAPI();
      //  this.printTreeview();
    }

    printTreeview (){

// packages_partially_tested  ... detta är en array.. med paketnamn : array av länkar.. link 1: some/link/osv
           console.log("partially Tested!!!! NEW PAGE ")

           var data = JSON.parse(this.state.commit_data.packages_partially_tested);

           this.state.treeview_items = []

           Object.keys(data).forEach(function(key) {

           if (data[key].length)
              {
               // få array med alla länkar för det paketet
               var arr = data[key]
               this.state.treeview_items.push(<Header className='myHeader' as='h3'>{key}</Header>) // få in paketnamn..


            for (var i = 0; i < arr.length; i++){
                var obj = arr[i];

                for (var key in obj){
                    var attrName = key;
                    var attrValue = obj[key];

                    if (String(attrName).indexOf('link') > -1) // if key contains 'link' .. 1..2..
                    {
                        var lastPart = attrValue.split("/").pop();

                      //  console.log(attrValue)
                        this.state.treeview_items.push(<p className="mymethod"><a href={attrValue}>{lastPart}</a></p>)
                    }
                    if (String(key).indexOf('test') > -1) // if key contains 'link' .. 1..2..
                    {
                        console.log(attrValue)  // här kommer en array!!

                        let map = new Map();

                        // var arrayLength = attrValue.length;
                        for (var j = 0; j < attrValue.length; j++) {
                            // console.log(attrValue[j]);
                            //Do something
                            var lastPart_test = attrValue[j].split(".").pop().slice(0, -1);

                            // if map does not contain ...lastpart..
                            if (!map.has(lastPart_test))
                            {
                                console.log("map 1....")
                                map.set(lastPart_test, 1);
                            }
                            else
                            {
                                console.log("map +1....")
                                map.set(lastPart_test, (map.get(lastPart_test))+1);
                            }
                        }

                        for (const [key, value] of map.entries()) {
                            console.log(key, value);

                            this.state.treeview_items.push(<p className="mytest">{key + " " + value}</p>)
                        }

                    }
                }
            } //for....
           }  //if
          }.bind(this));

     // console.log(this.state.treeview_items)

    }


  render() {

        if (this.state.data_loaded === false) {
            return null;
        }

        this.printTreeview();

    return (

        <Grid>
                <Grid.Row>
                  <Grid.Column width={9}>
                      <Header as='h3' dividing>
                          Partially Tested Methods
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
export default Treeview;




