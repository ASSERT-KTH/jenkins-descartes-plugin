import React, { Component } from 'react'

import ReactJson from 'react-json-view'

import JSONPretty from 'react-json-pretty';

import { Statistic,Grid, Placeholder, Header , Segment } from 'semantic-ui-react'

import axios from 'axios';

import './Pseudoview.css';

class Pseudoview extends Component {

    constructor(props) {
        super(props);

        var mystring = '{"name": "chart","color": "hsl(299, 70%, 50%)","loc": 186161}'

        this.state = {

            commit_data : {commit_id: "57a288746b9e67dead9ef1d6788620bd6f8184ae", date: new Date("2019-03-05T21:23:23.446Z"),username: "martinch-kth",
                           repository:"commons-codec", packages_partially_tested: '{"pack":[{"link":"http://some/somelink"}]}',packages_pseudo_tested: '{"pack":[{"link":"http://some/somelink"}]}',
                           commit_url: "http://github/somecommit_url" , treemap : mystring,
                           methods_total: "33",tested_total: "22", partially_tested_total: "22", packages_pseudo_tested: "22" ,non_covered_total: "22"},
            treeview_items : [],
            data_loaded : false
        };

        this.printTreeview = this.printTreeview.bind(this);        
    }

    callAPI() {
         fetch("http://130.237.59.170:3002/users" + window.location.pathname)
            .then(res => res.json())
            .then(res => this.setState({ commit_data: res,
                                         data_loaded: true
            })).catch(err => err)
    }

    componentDidMount() {
        this.callAPI();
    }

    printTreeview (){

// packages_partially_tested  ... detta är en array.. med paketnamn : array av länkar.. link 1: some/link/osv
           console.log("pseudo Tested!!!! NEW PAGE ")

           var data = JSON.parse(this.state.commit_data.packages_pseudo_tested);

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

                    // jag behöver inte... detta längre.. tror ja vill  ha hela..
                 //   var lastPart = attrValue.split("/").pop();

                  //  console.log(attrValue)
                //    console.log(this.state.treeview_items)
                    this.state.treeview_items.push(<p className="mylinks"><a href={attrValue}>{attrValue}</a></p>)

      //              var newStateArray = this.state.treeview_items.slice();
      //              newStateArray.push(<li key={attrValue}><a href={attrValue}>{lastPart}</a></li>);
      //              this.setState({treeview_items : newStateArray});
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
                          Pseudo Tested Methods
                      </Header>
                  </Grid.Column>
                </Grid.Row>
    
        <div> 
          {this.state.treeview_items.map(item => (
                                     <div>{item}</div>
                                   ))}
        </div>
     </Grid>
    );
  }
}
export default Pseudoview;




