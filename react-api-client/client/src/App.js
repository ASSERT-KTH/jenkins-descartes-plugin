import React, { Component } from 'react';

import { Statistic,Grid, Placeholder, Menu, Segment } from 'semantic-ui-react'

import Modal from 'react-modal';

import './App.css';

import { ResponsiveTreeMapHtml } from '@nivo/treemap'

//import roundNode from "./round";

import axios from 'axios';
import round from "./round";



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

        var mystring = '{"name": "chart","color": "hsl(299, 70%, 50%)","loc": 186161}'

        this.state = {

            commit_data : {commit_id: "57a288746b9e67dead9ef1d6788620bd6f8184ae", date: new Date("2019-03-05T21:23:23.446Z"),username: "martinch-kth",
                           repository:"commons-codec", packages_partially_tested: '{"pack":[{"link":"http://some/somelink"}]}' ,
                           commit_url: "http://github/somecommit_url" , treemap : mystring,
                           methods_total: "33",tested_total: "22", partially_tested_total: "22", non_covered_total: "22"},

            modalIsOpen: false,
            modalName : "Modal",
            modal_items : []
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


    /*
        componentDidMount(){

            axios.get(`/` + window.location.pathname)
                .then(({ data }) => {
                    const  commit_data  = data;

                    console.log(commit_data)

                    this.setState({
                        commit_data : data,
                    });
                });
        }
    */

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

        var some_data = JSON.parse(this.state.commit_data.packages_partially_tested)  // convert obj to array ..JSON.parse??

        if (e.id === "Partially tested")
        {
            console.log("partially Tested!!!!")

            var packname = e.parent.id

            //    var arr = some_data[packname]
            var arr = some_data[packname]

            // fel men,,, vet ej hur..empty model array..
            this.state.modal_items = []

            for (var i = 0; i < arr.length; i++){
                var obj = arr[i];
                for (var key in obj){
                    var attrName = key;
                    var attrValue = obj[key];

                    var lastPart = attrValue.split("/").pop();

                    console.log(attrValue)
                    this.state.modal_items.push(<li key={attrValue}><a href={attrValue}>{lastPart}</a></li>)
                }
            }

            //real way ->  this.state.setState({modalName : packname})
            this.state.modalName = packname
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




    render() {

        const { activeItem } = this.state

        return (

            <Grid>

                <div>
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
                        <button onClick={this.closeModal}>close</button>
                    </Modal>
                </div>

                <Grid.Row>
                    <Grid.Column  width={9}>
                        <Grid columns={4} stackable>
                            <Grid.Column>
                                <Segment raised>
                                    <Statistic value={this.state.commit_data.methods_total} label="Total Methods" size="small" color="black" />
                                </Segment>
                            </Grid.Column>

                            <Grid.Column>
                                <Segment raised>
                                    <Statistic>
                                        <Statistic value={this.state.commit_data.tested_total} label="tested" size="small" color="teal" />
                                    </Statistic>
                                </Segment>
                            </Grid.Column>

                            <Grid.Column>
                                <Segment raised>
                                    <Statistic>
                                        <Statistic value={this.state.commit_data.partially_tested_total} label="Partially tested" size="small" color="yellow" />
                                    </Statistic>
                                </Segment>
                            </Grid.Column>

                            <Grid.Column>
                                <Segment raised>
                                    <Statistic>
                                        <Statistic value={this.state.commit_data.non_covered_total} label="non-covered" size="small" color="orange" />
                                    </Statistic>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={9}>
                        <Segment raised><a href={this.state.commit_data.commit_url}>Link to GitHub commit!</a> </Segment>
                    </Grid.Column>
                </Grid.Row>


                <Grid.Row>
                    <Grid.Column>
                        <div className="chart">
                            <ResponsiveTreeMapHtml
                                onClick={(e) => this.openModal(e)}
                               // root={{"name":"Mutation test","color":"hsl(187, 70%, 50%)","children":[{"name":"org/apache/commons/codec/digest","color":"hsl(87, 70%, 50%)","children":[{"name": "Tested","color":"hsl(99, 98%, 51%)","loc":106},{"name":"Partially tested","color": "hsl(53, 100%, 50%)","loc": 2},{"name": "Not covered","color": "hsl(348, 100%, 50%)","loc": 44}]},{"name":"org/apache/commons/codec/language","color":"hsl(87, 70%, 50%)","children":[{"name": "Tested","color":"hsl(99, 98%, 51%)","loc":100},{"name":"Partially tested","color": "hsl(53, 100%, 50%)","loc": 5},{"name": "Not covered","color": "hsl(348, 100%, 50%)","loc": 3}]},{"name":"org/apache/commons/codec/binary","color":"hsl(87, 70%, 50%)","children":[{"name": "Tested","color":"hsl(99, 98%, 51%)","loc":98},{"name":"Partially tested","color": "hsl(53, 100%, 50%)","loc": 4},{"name": "Not covered","color": "hsl(348, 100%, 50%)","loc": 1}]},{"name":"org/apache/commons/codec/net","color":"hsl(87, 70%, 50%)","children":[{"name": "Tested","color":"hsl(99, 98%, 51%)","loc":57},{"name":"Partially tested","color": "hsl(53, 100%, 50%)","loc": 4},{"name": "Not covered","color": "hsl(348, 100%, 50%)","loc": 0}]},{"name":"org/apache/commons/codec/language/bm","color":"hsl(87, 70%, 50%)","children":[{"name": "Tested","color":"hsl(99, 98%, 51%)","loc":51},{"name":"Partially tested","color": "hsl(53, 100%, 50%)","loc": 2},{"name": "Not covered","color": "hsl(348, 100%, 50%)","loc": 5}]},{"name":"org/apache/commons/codec/cli","color":"hsl(87, 70%, 50%)","children":[{"name": "Tested","color":"hsl(99, 98%, 51%)","loc":0},{"name":"Partially tested","color": "hsl(53, 100%, 50%)","loc": 0},{"name": "Not covered","color": "hsl(348, 100%, 50%)","loc": 8}]},{"name":"org/apache/commons/codec","color":"hsl(87, 70%, 50%)","children":[{"name": "Tested","color":"hsl(99, 98%, 51%)","loc":3},{"name":"Partially tested","color": "hsl(53, 100%, 50%)","loc": 0},{"name": "Not covered","color": "hsl(348, 100%, 50%)","loc": 0}]}]}}
                                root={JSON.parse(this.state.commit_data.treemap)}
                                identity="name"
                                value="loc"
                                innerPadding={3}
                                outerPadding={3}

                                label="loc"
                                labelFormat="0"
                               
                                labelSkipSize={2}
                                labelTextColor="inherit:darker(1.2)"
                                colors="red_yellow_green"
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
}
export default App;




