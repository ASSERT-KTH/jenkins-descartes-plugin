import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";

import { Statistic,Grid, Placeholder, Menu, Segment,Form, Checkbox } from 'semantic-ui-react'

import Modal from 'react-modal';

import './App.css';

import { ResponsiveTreeMapHtml } from '@nivo/treemap'

//var percentage = require('percentage-calc');

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

class App extends Component {

    constructor(props) {
        super(props);

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.closeModal_details_button = this.closeModal_details_button.bind(this)

        var treemap_version = '{ "name": "Mutation test", "color": "hsl(187, 70%, 50%)", "children": [  { "name": "org/apache/commons/codec/digest", "color": "hsl(87, 70%, 50%)",             "children": [                   {                        "name": "Tested",                       "color": "hsl(99, 98%, 51%)",                        "loc": 206                    },                    {                        "name": "Partially tested",                        "color": "hsl(53, 100%, 50%)",                        "loc": 12                    },                   {                        "name": "Pseudo tested",                        "color": "hsl(0, 0%, 50%)",                        "loc": 12                    },                    {                        "name": "Not covered",                        "color": "hsl(348, 100%, 50%)",                        "loc": 44                    }                ]            }        ]        }'


        this.state = {

            commit_data : {commit_id: "57a288746b9e67dead9ef1d6788620bd6f8184ae", date: new Date("2019-03-05T21:23:23.446Z"),username: "martinch-kth",
                           repository:"commons-codec", packages_partially_tested: '{"pack":[{"link":"http://some/somelink"}]}',
                           packages_pseudo_tested: '{"pack":[{"link":"http://some/somelink"}]}' ,
                           commit_url: "http://github/somecommit_url" , treemap : treemap_version,treemap_percent:treemap_version,treemap_partiallytested_sorted:treemap_version,
                           methods_total: "33",tested_total: "22", partially_tested_total: "22",pseudo_tested_total:"22", non_covered_total: "22"},

            modalIsOpen: false,
            modalName : "Modal",
            modalClickedOn : "none_yet",
            modal_items : [],
            treemap_version : treemap_version,  //'{{"name":"Mutation test","color":"hsl(187, 70%, 50%)","children":[{"name":"org/apache/commons/codec/digest","color":"hsl(87, 70%, 50%)","children":[{"name": "Tested","color":"hsl(99, 98%, 51%)","loc":106},{"name":"Partially tested","color": "hsl(53, 100%, 50%)","loc": 2},{"name": "Not covered","color": "hsl(348, 100%, 50%)","loc": 44}]},{"name":"org/apache/commons/codec/language","color":"hsl(87, 70%, 50%)","children":[{"name": "Tested","color":"hsl(99, 98%, 51%)","loc":100},{"name":"Partially tested","color": "hsl(53, 100%, 50%)","loc": 5},{"name": "Not covered","color": "hsl(348, 100%, 50%)","loc": 3}]},{"name":"org/apache/commons/codec/binary","color":"hsl(87, 70%, 50%)","children":[{"name": "Tested","color":"hsl(99, 98%, 51%)","loc":98},{"name":"Partially tested","color": "hsl(53, 100%, 50%)","loc": 4},{"name": "Not covered","color": "hsl(348, 100%, 50%)","loc": 1}]},{"name":"org/apache/commons/codec/net","color":"hsl(87, 70%, 50%)","children":[{"name": "Tested","color":"hsl(99, 98%, 51%)","loc":57},{"name":"Partially tested","color": "hsl(53, 100%, 50%)","loc": 4},{"name": "Not covered","color": "hsl(348, 100%, 50%)","loc": 0}]},{"name":"org/apache/commons/codec/language/bm","color":"hsl(87, 70%, 50%)","children":[{"name": "Tested","color":"hsl(99, 98%, 51%)","loc":51},{"name":"Partially tested","color": "hsl(53, 100%, 50%)","loc": 2},{"name": "Not covered","color": "hsl(348, 100%, 50%)","loc": 5}]},{"name":"org/apache/commons/codec/cli","color":"hsl(87, 70%, 50%)","children":[{"name": "Tested","color":"hsl(99, 98%, 51%)","loc":0},{"name":"Partially tested","color": "hsl(53, 100%, 50%)","loc": 0},{"name": "Not covered","color": "hsl(348, 100%, 50%)","loc": 8}]},{"name":"org/apache/commons/codec","color":"hsl(87, 70%, 50%)","children":[{"name": "Tested","color":"hsl(99, 98%, 51%)","loc":3},{"name":"Partially tested","color": "hsl(53, 100%, 50%)","loc": 0},{"name": "Not covered","color": "hsl(348, 100%, 50%)","loc": 0}]}]}}'
            value: 'default',
            data_loaded : false
        };
    }

    handleChange = (e, { value }) => {

        this.setState({value})

        if (value === 'default')
            this.state.treemap_version = this.state.commit_data.treemap
        if (value === 'percentage_per_package')
            this.state.treemap_version = this.state.commit_data.treemap_percent
        if (value === 'largest_number_per_package')
            this.state.treemap_version = this.state.commit_data.treemap_partiallytested_sorted


    }

    callAPI() {
          fetch("http://130.237.59.170:3002/users" + global.globalString ) //window.location.pathname)
    //    fetch("http://localhost:3001/users" + window.location.pathname)
            .then(res => res.json())
            .then(res => this.setState({

                commit_data: res,
                data_loaded : true

            })).catch(err => err)
              .then((res) => {

                  this.myFunction(res);
              })
    }

    myFunction(res) {
        // ... Your code ...
        // den här skiten funkar...

        if (typeof this.state.commit_data.treemap_version === 'string')
        {
            this.state.commit_data.treemap_version = JSON.parse(this.state.commit_data.treemap_version)
        }
        else
        {
            this.state.commit_data.treemap_version = this.state.commit_data.treemap_version
        }


    }


    componentDidMount() {


        if (!global.globalString){

            global.globalString = window.location.pathname
        }

       // require('./App');  //??? needed??
        require('./Pseudoview');    // needed to reach global var in these modules
        require('./Treeview');

        this.callAPI()

    }

    openModal(e) {

        console.log(e)
        var test_data = {
            "org/apache/commons/codec/digest": [
                {
                    "link 1": "https://github.com/martinch-kth/commons-codec/tree/trunk/src/main/java/org/apache/commons/codec/digest/DigestUtils.java#L317"
                },
                {
                    "link 2": "https://github.com/martinch-kth/commons-codec/tree/trunk/src/main/java/org/apache/commons/codec/digest/MessageDigestAlgorithms.java#L139"
                }
            ],
            "org/apache/commons/codec/language": [
                {
                    "link 1": "https://github.com/martinch-kth/commons-codec/tree/trunk/src/main/java/org/apache/commons/codec/language/DoubleMetaphone.java#L782"
                },
                {
                    "link 2": "https://github.com/martinch-kth/commons-codec/tree/trunk/src/main/java/org/apache/commons/codec/language/Metaphone.java#L415"
                },
                {
                    "link 3": "https://github.com/martinch-kth/commons-codec/tree/trunk/src/main/java/org/apache/commons/codec/language/DoubleMetaphone.java#L1005"
                },
                {
                    "link 4": "https://github.com/martinch-kth/commons-codec/tree/trunk/src/main/java/org/apache/commons/codec/language/ColognePhonetic.java#L414"
                },
                {
                    "link 5": "https://github.com/martinch-kth/commons-codec/tree/trunk/src/main/java/org/apache/commons/codec/language/DaitchMokotoffSoundex.java#L102"
                }
            ],
            "org/apache/commons/codec/binary": [
                {
                    "link 1": "https://github.com/martinch-kth/commons-codec/tree/trunk/src/main/java/org/apache/commons/codec/binary/Hex.java#L426"
                },
                {
                    "link 2": "https://github.com/martinch-kth/commons-codec/tree/trunk/src/main/java/org/apache/commons/codec/binary/BaseNCodec.java#L505"
                },
                {
                    "link 3": "https://github.com/martinch-kth/commons-codec/tree/trunk/src/main/java/org/apache/commons/codec/binary/BaseNCodec.java#L222"
                },
                {
                    "link 4": "https://github.com/martinch-kth/commons-codec/tree/trunk/src/main/java/org/apache/commons/codec/binary/Base32.java#L542"
                }
            ],
            "org/apache/commons/codec/net": [
                {
                    "link 1": "https://github.com/martinch-kth/commons-codec/tree/trunk/src/main/java/org/apache/commons/codec/net/PercentCodec.java#L179"
                },
                {
                    "link 2": "https://github.com/martinch-kth/commons-codec/tree/trunk/src/main/java/org/apache/commons/codec/net/QCodec.java#L226"
                },
                {
                    "link 3": "https://github.com/martinch-kth/commons-codec/tree/trunk/src/main/java/org/apache/commons/codec/net/BCodec.java#L138"
                },
                {
                    "link 4": "https://github.com/martinch-kth/commons-codec/tree/trunk/src/main/java/org/apache/commons/codec/net/RFC1522Codec.java#L104"
                }
            ],
            "org/apache/commons/codec/language/bm": [
                {
                    "link 1": "https://github.com/martinch-kth/commons-codec/tree/trunk/src/main/java/org/apache/commons/codec/language/bm/BeiderMorseEncoder.java#L96"
                },
                {
                    "link 2": "https://github.com/martinch-kth/commons-codec/tree/trunk/src/main/java/org/apache/commons/codec/language/bm/Rule.java#L520"
                }
            ],
            "org/apache/commons/codec/cli": [],
            "org/apache/commons/codec": []
        }

        console.log(this.state.commit_data.packages_partially_tested)

        var partially_tested_data = JSON.parse(this.state.commit_data.packages_partially_tested)
        var pseudo_tested_data = JSON.parse(this.state.commit_data.packages_pseudo_tested)

        if (e.id === "Partially tested")
        {
            console.log("partially Tested!!!!")

            var packname = e.parent.id

            console.log(packname)

            var arr = partially_tested_data[packname]

            // change to setState...
            this.state.modal_items = []

            for (var i = 0; i < arr.length; i++){
                var obj = arr[i];
                for (var key in obj){
               //     var attrName = key;
                    var attrValue = obj[key];

                    if (String(key).indexOf('link') > -1) // if key contains 'link' .. 1..2..
                    {
                        var lastPart = attrValue.split("/").pop();

                        console.log(attrValue)
                        this.state.modal_items.push(<li key={attrValue}><a href={attrValue}>{lastPart}</a></li>)
                    }

                }
            }
            //real way ->  this.state.setState({modalName : packname})
            this.state.modalName = packname
            this.state.modalClickedOn = "partiallytested"
            this.setState({modalIsOpen: true});
        }
        if (e.id === "Pseudo tested")
        {
            console.log("pseudo Tested!!!!")

            var packname = e.parent.id

            console.log(packname)

            var arr = pseudo_tested_data[packname]

            // change to setState...
            this.state.modal_items = []

            for (var i = 0; i < arr.length; i++){
                var obj = arr[i];
                for (var key in obj){
                    var attrName = key;
                    var attrValue = obj[key];

                    if (String(key).indexOf('link') > -1) // if key contains 'link' .. 1..2..
                    {
                        var lastPart = attrValue.split("/").pop();

                        console.log(attrValue)
                        this.state.modal_items.push(<li key={attrValue}><a href={attrValue}>{lastPart}</a></li>)
                    }
                }
            }
            //real way ->  this.state.setState({modalName : packname})
            this.state.modalName = packname
            this.state.modalClickedOn = "pseudotested"
            this.setState({modalIsOpen: true});


           }
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#000';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    closeModal_details_button() {
        this.setState({modalIsOpen: false});

    }


    render() {

        if (this.state.data_loaded === false) {
            return null;
        }

        const { activeItem } = this.state

        return (


            <Grid>

                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel={this.state.modalLabel} >
                        <h2 ref={subtitle => this.subtitle = subtitle}>{this.state.modalName}</h2>

                        <ul>
                            {this.state.modal_items}
                        </ul>
                        <button onClick={this.closeModal}>Close</button>

                        <Link

                         to={{
                                pathname: `/testview/${this.state.modalClickedOn }`,
                                search: '',
                                hash: '', // test ---this.state.modalClickedOn.. vilket..inte hjälper...aaja..
                                state: { package_name : this.state.modalName,
                                         partially_tested : this.state.commit_data.packages_partially_tested,
                                         pseudo_tested : this.state.commit_data.packages_pseudo_tested
                                }
                            }}>

                           <button onClick={this.closeModal} type="button" >Details</button>
                        </Link>
                    </Modal>


                <Grid.Row>
                    <Grid.Column width={13}>
                        <Segment raised>Repository: {this.state.commit_data.repository} <a href={this.state.commit_data.commit_url}> - Link to GitHub commit.</a> </Segment>
                    </Grid.Column>
                </Grid.Row>

             <Grid.Row>
               <Grid.Column width={13}>
		<div className="ui horizontal segments">
		   <div className="ui segment">
		     <Statistic value={this.state.commit_data.methods_total} label="Total Methods" size="small" color="black" />
		   </div>
		 <div className="ui segment">
		     <Statistic value={this.state.commit_data.tested_total} label="tested" size="small" color="teal" />
 		 </div>
  		 <div className="ui segment">
 		     <Statistic value={this.state.commit_data.partially_tested_total} label="Partially tested" size="small" color="yellow" />
  		 </div>
  		  <div className="ui segment">
         	     <Statistic value={this.state.commit_data.pseudo_tested_total} label="Pseudo tested" size="small" color="grey" />
 	          </div>
	          <div className="ui segment">
                   <Statistic value={this.state.commit_data.non_covered_total} label="non-covered" size="small" color="orange" />
		  </div>
	  	 </div>
               </Grid.Column>
              </Grid.Row>

                <Form>
                    <Grid columns={3} >
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
                            label='Percentage per package'
                            name='checkboxRadioGroup'
                            value='percentage_per_package'
                            checked={this.state.value === 'percentage_per_package'}
                            onChange={this.handleChange}
                        />
                          </Form.Field>
                        </Grid.Column>
                        <Grid.Column>
                        <Form.Field>
                        <Checkbox
                            radio
                            label='Largest number of pseudo tested methods per package'
                            name='checkboxRadioGroup'
                            value='largest_number_per_package'
                            checked={this.state.value === 'largest_number_per_package'}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                      </Grid.Column>
                    </Grid.Row>
            </Grid>
                </Form>

                <Grid.Row >
                <Grid.Column width={13}>
                 <div className="chart">
                            <ResponsiveTreeMapHtml
                                onClick={(e) => this.openModal(e)}
                               // root={{"name":"Mutation test","color":"hsl(187, 70%, 50%)","children":[{"name":"org/apache/commons/codec/digest","color":"hsl(87, 70%, 50%)","children":[{"name": "Tested","color":"hsl(99, 98%, 51%)","loc":106},{"name":"Partially tested","color": "hsl(53, 100%, 50%)","loc": 2},{"name": "Not covered","color": "hsl(348, 100%, 50%)","loc": 44}]},{"name":"org/apache/commons/codec/language","color":"hsl(87, 70%, 50%)","children":[{"name": "Tested","color":"hsl(99, 98%, 51%)","loc":100},{"name":"Partially tested","color": "hsl(53, 100%, 50%)","loc": 5},{"name": "Not covered","color": "hsl(348, 100%, 50%)","loc": 3}]},{"name":"org/apache/commons/codec/binary","color":"hsl(87, 70%, 50%)","children":[{"name": "Tested","color":"hsl(99, 98%, 51%)","loc":98},{"name":"Partially tested","color": "hsl(53, 100%, 50%)","loc": 4},{"name": "Not covered","color": "hsl(348, 100%, 50%)","loc": 1}]},{"name":"org/apache/commons/codec/net","color":"hsl(87, 70%, 50%)","children":[{"name": "Tested","color":"hsl(99, 98%, 51%)","loc":57},{"name":"Partially tested","color": "hsl(53, 100%, 50%)","loc": 4},{"name": "Not covered","color": "hsl(348, 100%, 50%)","loc": 0}]},{"name":"org/apache/commons/codec/language/bm","color":"hsl(87, 70%, 50%)","children":[{"name": "Tested","color":"hsl(99, 98%, 51%)","loc":51},{"name":"Partially tested","color": "hsl(53, 100%, 50%)","loc": 2},{"name": "Not covered","color": "hsl(348, 100%, 50%)","loc": 5}]},{"name":"org/apache/commons/codec/cli","color":"hsl(87, 70%, 50%)","children":[{"name": "Tested","color":"hsl(99, 98%, 51%)","loc":0},{"name":"Partially tested","color": "hsl(53, 100%, 50%)","loc": 0},{"name": "Not covered","color": "hsl(348, 100%, 50%)","loc": 8}]},{"name":"org/apache/commons/codec","color":"hsl(87, 70%, 50%)","children":[{"name": "Tested","color":"hsl(99, 98%, 51%)","loc":3},{"name":"Partially tested","color": "hsl(53, 100%, 50%)","loc": 0},{"name": "Not covered","color": "hsl(348, 100%, 50%)","loc": 0}]}]}}


                                // FELET... måste man...ha den..som string? obj...åå..

                                root={this.state.treemap_version}


                                identity="name"
                                value="loc"
                                innerPadding={0}
                                outerPadding={3}

                                label="loc"
                                labelFormat="0"

                                labelSkipSize={2}
                                labelTextColor="black"
                                colors="white"
                                colorBy="name"
                                borderColor="inherit:darker(0.3)"
                                animate={true}
                                motionStiffness={90}
                                motionDamping={11}
                            />
                      </div>
                 </Grid.Column>
                </Grid.Row>

            </Grid>

        )
    } // render slut..
} export default App;




