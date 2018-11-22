import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { ResponsiveTreeMapHtml } from '@nivo/treemap'


class App extends Component {
  render() {
    return (
  
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Descartes Dashboard
          </p>
        </header>

        <div className="chart">

    <ResponsiveTreeMapHtml
        root={
{
  "name": "nivo",
  "color": "hsl(305, 70%, 50%)",
  "children": [
    {
      "name": "viz",
      "color": "hsl(311, 70%, 50%)",
      "children": [
        {
          "name": "stack",
          "color": "hsl(187, 70%, 50%)",
          "children": [
            {
              "name": "chart",
              "color": "hsl(299, 70%, 50%)",
              "loc": 186161
            },
            {
              "name": "xAxis",
              "color": "hsl(143, 70%, 50%)",
              "loc": 154765
            },
            {
              "name": "yAxis",
              "color": "hsl(12, 70%, 50%)",
              "loc": 99193
            },
            {
              "name": "layers",
              "color": "hsl(295, 70%, 50%)",
              "loc": 22449
            }
          ]
        },
        {
          "name": "pie",
          "color": "hsl(270, 70%, 50%)",
          "children": [
            {
              "name": "chart",
              "color": "hsl(55, 70%, 50%)",
              "children": [
                {
                  "name": "pie",
                  "color": "hsl(47, 70%, 50%)",
                  "children": [
                    {
                      "name": "outline",
                      "color": "hsl(247, 70%, 50%)",
                      "loc": 137428
                    },
                    {
                      "name": "slices",
                      "color": "hsl(275, 70%, 50%)",
                      "loc": 26045
                    },
                    {
                      "name": "bbox",
                      "color": "hsl(292, 70%, 50%)",
                      "loc": 176974
                    }
                  ]
                },
                {
                  "name": "donut",
                  "color": "hsl(135, 70%, 50%)",
                  "loc": 83115
                },
                {
                  "name": "gauge",
                  "color": "hsl(324, 70%, 50%)",
                  "loc": 105857
                }
              ]
            },
            {
              "name": "legends",
              "color": "hsl(224, 70%, 50%)",
              "loc": 110911
            }
          ]
        }
      ]
    },
    {
      "name": "colors",
      "color": "hsl(19, 70%, 50%)",
      "children": [
        {
          "name": "rgb",
          "color": "hsl(154, 70%, 50%)",
          "loc": 121386
        },
        {
          "name": "hsl",
          "color": "hsl(76, 70%, 50%)",
          "loc": 145580
        }
      ]
    },
    {
      "name": "utils",
      "color": "hsl(106, 70%, 50%)",
      "children": [
        {
          "name": "randomize",
          "color": "hsl(70, 70%, 50%)",
          "loc": 187839
        },
        {
          "name": "resetClock",
          "color": "hsl(153, 70%, 50%)",
          "loc": 186606
        },
        {
          "name": "noop",
          "color": "hsl(30, 70%, 50%)",
          "loc": 72800
        },
        {
          "name": "tick",
          "color": "hsl(87, 70%, 50%)",
          "loc": 166264
        },
        {
          "name": "forceGC",
          "color": "hsl(107, 70%, 50%)",
          "loc": 84925
        },
        {
          "name": "stackTrace",
          "color": "hsl(154, 70%, 50%)",
          "loc": 157853
        },
        {
          "name": "dbg",
          "color": "hsl(220, 70%, 50%)",
          "loc": 197309
        }
      ]
    },
    {
      "name": "generators",
      "color": "hsl(303, 70%, 50%)",
      "children": [
        {
          "name": "address",
          "color": "hsl(67, 70%, 50%)",
          "loc": 129521
        },
        {
          "name": "city",
          "color": "hsl(273, 70%, 50%)",
          "loc": 57977
        },
        {
          "name": "animal",
          "color": "hsl(333, 70%, 50%)",
          "loc": 108484
        },
        {
          "name": "movie",
          "color": "hsl(156, 70%, 50%)",
          "loc": 149076
        },
        {
          "name": "user",
          "color": "hsl(50, 70%, 50%)",
          "loc": 186199
        }
      ]
    },
    {
      "name": "set",
      "color": "hsl(341, 70%, 50%)",
      "children": [
        {
          "name": "clone",
          "color": "hsl(324, 70%, 50%)",
          "loc": 171154
        },
        {
          "name": "intersect",
          "color": "hsl(57, 70%, 50%)",
          "loc": 142175
        },
        {
          "name": "merge",
          "color": "hsl(324, 70%, 50%)",
          "loc": 118526
        },
        {
          "name": "reverse",
          "color": "hsl(112, 70%, 50%)",
          "loc": 26845
        },
        {
          "name": "toArray",
          "color": "hsl(304, 70%, 50%)",
          "loc": 179835
        },
        {
          "name": "toObject",
          "color": "hsl(266, 70%, 50%)",
          "loc": 7299
        },
        {
          "name": "fromCSV",
          "color": "hsl(132, 70%, 50%)",
          "loc": 137753
        },
        {
          "name": "slice",
          "color": "hsl(173, 70%, 50%)",
          "loc": 175523
        },
        {
          "name": "append",
          "color": "hsl(23, 70%, 50%)",
          "loc": 8217
        },
        {
          "name": "prepend",
          "color": "hsl(80, 70%, 50%)",
          "loc": 192266
        },
        {
          "name": "shuffle",
          "color": "hsl(87, 70%, 50%)",
          "loc": 77811
        },
        {
          "name": "pick",
          "color": "hsl(32, 70%, 50%)",
          "loc": 119316
        },
        {
          "name": "plouc",
          "color": "hsl(360, 70%, 50%)",
          "loc": 56538
        }
      ]
    },
    {
      "name": "text",
      "color": "hsl(286, 70%, 50%)",
      "children": [
        {
          "name": "trim",
          "color": "hsl(5, 70%, 50%)",
          "loc": 90962
        },
        {
          "name": "slugify",
          "color": "hsl(63, 70%, 50%)",
          "loc": 132083
        },
        {
          "name": "snakeCase",
          "color": "hsl(123, 70%, 50%)",
          "loc": 25335
        },
        {
          "name": "camelCase",
          "color": "hsl(7, 70%, 50%)",
          "loc": 199756
        },
        {
          "name": "repeat",
          "color": "hsl(10, 70%, 50%)",
          "loc": 97179
        },
        {
          "name": "padLeft",
          "color": "hsl(347, 70%, 50%)",
          "loc": 129401
        },
        {
          "name": "padRight",
          "color": "hsl(131, 70%, 50%)",
          "loc": 189139
        },
        {
          "name": "sanitize",
          "color": "hsl(70, 70%, 50%)",
          "loc": 47593
        },
        {
          "name": "ploucify",
          "color": "hsl(291, 70%, 50%)",
          "loc": 143357
        }
      ]
    },
    {
      "name": "misc",
      "color": "hsl(156, 70%, 50%)",
      "children": [
        {
          "name": "whatever",
          "color": "hsl(359, 70%, 50%)",
          "children": [
            {
              "name": "hey",
              "color": "hsl(102, 70%, 50%)",
              "loc": 138835
            },
            {
              "name": "WTF",
              "color": "hsl(353, 70%, 50%)",
              "loc": 93010
            },
            {
              "name": "lol",
              "color": "hsl(277, 70%, 50%)",
              "loc": 196669
            },
            {
              "name": "IMHO",
              "color": "hsl(79, 70%, 50%)",
              "loc": 136774
            }
          ]
        },
        {
          "name": "other",
          "color": "hsl(169, 70%, 50%)",
          "loc": 91306
        },
        {
          "name": "crap",
          "color": "hsl(65, 70%, 50%)",
          "children": [
            {
              "name": "crapA",
              "color": "hsl(121, 70%, 50%)",
              "loc": 55679
            },
            {
              "name": "crapB",
              "color": "hsl(253, 70%, 50%)",
              "children": [
                {
                  "name": "crapB1",
                  "color": "hsl(144, 70%, 50%)",
                  "loc": 107427
                },
                {
                  "name": "crapB2",
                  "color": "hsl(13, 70%, 50%)",
                  "loc": 165712
                },
                {
                  "name": "crapB3",
                  "color": "hsl(126, 70%, 50%)",
                  "loc": 174147
                },
                {
                  "name": "crapB4",
                  "color": "hsl(51, 70%, 50%)",
                  "loc": 42898
                }
              ]
            },
            {
              "name": "crapC",
              "color": "hsl(320, 70%, 50%)",
              "children": [
                {
                  "name": "crapC1",
                  "color": "hsl(338, 70%, 50%)",
                  "loc": 184376
                },
                {
                  "name": "crapC2",
                  "color": "hsl(343, 70%, 50%)",
                  "loc": 197524
                },
                {
                  "name": "crapC3",
                  "color": "hsl(62, 70%, 50%)",
                  "loc": 133322
                },
                {
                  "name": "crapC4",
                  "color": "hsl(27, 70%, 50%)",
                  "loc": 76114
                },
                {
                  "name": "crapC5",
                  "color": "hsl(224, 70%, 50%)",
                  "loc": 5043
                },
                {
                  "name": "crapC6",
                  "color": "hsl(184, 70%, 50%)",
                  "loc": 170600
                },
                {
                  "name": "crapC7",
                  "color": "hsl(349, 70%, 50%)",
                  "loc": 42657
                },
                {
                  "name": "crapC8",
                  "color": "hsl(99, 70%, 50%)",
                  "loc": 63764
                },
                {
                  "name": "crapC9",
                  "color": "hsl(26, 70%, 50%)",
                  "loc": 111237
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}


}
        identity="name"
        value="loc"
        innerPadding={3}
        outerPadding={3}
        margin={{
            "top": 10,
            "right": 10,
            "bottom": 10,
            "left": 10
        }}
        label="loc"
        labelFormat=".0s"
        labelSkipSize={12}
        labelTextColor="inherit:darker(1.2)"
        colors="set2"
        colorBy="name"
        borderColor="inherit:darker(0.3)"
        animate={true}
        motionStiffness={90}
        motionDamping={11}
    /> 
        </div>


      </div>

    );
  }
}

export default App;
