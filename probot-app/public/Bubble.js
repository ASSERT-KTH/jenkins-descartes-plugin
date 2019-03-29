import React, { Component } from 'react';
import './Bubble.css';

import { ResponsiveBubbleHtml } from '@nivo/circle-packing'

class Bubble extends Component {
  render() {
    return (

      <div className="bubble">
    <ResponsiveBubbleHtml
        root={{
  "name": "nivo",
  "color": "hsl(280, 70%, 50%)",
  "children": [
    {
      "name": "viz",
      "color": "hsl(213, 70%, 50%)",
      "children": [
        {
          "name": "stack",
          "color": "hsl(162, 70%, 50%)",
          "children": [
            {
              "name": "chart",
              "color": "hsl(234, 70%, 50%)",
              "loc": 1627
            },
            {
              "name": "xAxis",
              "color": "hsl(343, 70%, 50%)",
              "loc": 9039
            },
            {
              "name": "yAxis",
              "color": "hsl(175, 70%, 50%)",
              "loc": 153793
            },
            {
              "name": "layers",
              "color": "hsl(135, 70%, 50%)",
              "loc": 45567
            }
          ]
        },
        {
          "name": "pie",
          "color": "hsl(48, 70%, 50%)",
          "children": [
            {
              "name": "chart",
              "color": "hsl(198, 70%, 50%)",
              "children": [
                {
                  "name": "pie",
                  "color": "hsl(46, 70%, 50%)",
                  "children": [
                    {
                      "name": "outline",
                      "color": "hsl(279, 70%, 50%)",
                      "loc": 14225
                    },
                    {
                      "name": "slices",
                      "color": "hsl(294, 70%, 50%)",
                      "loc": 13733
                    },
                    {
                      "name": "bbox",
                      "color": "hsl(266, 70%, 50%)",
                      "loc": 139697
                    }
                  ]
                },
                {
                  "name": "donut",
                  "color": "hsl(204, 70%, 50%)",
                  "loc": 66000
                },
                {
                  "name": "gauge",
                  "color": "hsl(328, 70%, 50%)",
                  "loc": 81201
                }
              ]
            },
            {
              "name": "legends",
              "color": "hsl(121, 70%, 50%)",
              "loc": 104079
            }
          ]
        }
      ]
    },
    {
      "name": "colors",
      "color": "hsl(161, 70%, 50%)",
      "children": [
        {
          "name": "rgb",
          "color": "hsl(199, 70%, 50%)",
          "loc": 126041
        },
        {
          "name": "hsl",
          "color": "hsl(356, 70%, 50%)",
          "loc": 41917
        }
      ]
    },
    {
      "name": "utils",
      "color": "hsl(331, 70%, 50%)",
      "children": [
        {
          "name": "randomize",
          "color": "hsl(36, 70%, 50%)",
          "loc": 60829
        },
        {
          "name": "resetClock",
          "color": "hsl(356, 70%, 50%)",
          "loc": 48106
        },
        {
          "name": "noop",
          "color": "hsl(81, 70%, 50%)",
          "loc": 111242
        },
        {
          "name": "tick",
          "color": "hsl(36, 70%, 50%)",
          "loc": 108588
        },
        {
          "name": "forceGC",
          "color": "hsl(359, 70%, 50%)",
          "loc": 55500
        },
        {
          "name": "stackTrace",
          "color": "hsl(232, 70%, 50%)",
          "loc": 170806
        },
        {
          "name": "dbg",
          "color": "hsl(110, 70%, 50%)",
          "loc": 155327
        }
      ]
    },
    {
      "name": "generators",
      "color": "hsl(291, 70%, 50%)",
      "children": [
        {
          "name": "address",
          "color": "hsl(339, 70%, 50%)",
          "loc": 161134
        },
        {
          "name": "city",
          "color": "hsl(297, 70%, 50%)",
          "loc": 188475
        },
        {
          "name": "animal",
          "color": "hsl(114, 70%, 50%)",
          "loc": 75520
        },
        {
          "name": "movie",
          "color": "hsl(80, 70%, 50%)",
          "loc": 49192
        },
        {
          "name": "user",
          "color": "hsl(271, 70%, 50%)",
          "loc": 44218
        }
      ]
    },
    {
      "name": "set",
      "color": "hsl(126, 70%, 50%)",
      "children": [
        {
          "name": "clone",
          "color": "hsl(66, 70%, 50%)",
          "loc": 62002
        },
        {
          "name": "intersect",
          "color": "hsl(148, 70%, 50%)",
          "loc": 62247
        },
        {
          "name": "merge",
          "color": "hsl(205, 70%, 50%)",
          "loc": 170771
        },
        {
          "name": "reverse",
          "color": "hsl(140, 70%, 50%)",
          "loc": 57552
        },
        {
          "name": "toArray",
          "color": "hsl(166, 70%, 50%)",
          "loc": 91938
        },
        {
          "name": "toObject",
          "color": "hsl(323, 70%, 50%)",
          "loc": 163071
        },
        {
          "name": "fromCSV",
          "color": "hsl(323, 70%, 50%)",
          "loc": 104035
        },
        {
          "name": "slice",
          "color": "hsl(209, 70%, 50%)",
          "loc": 180338
        },
        {
          "name": "append",
          "color": "hsl(288, 70%, 50%)",
          "loc": 32683
        },
        {
          "name": "prepend",
          "color": "hsl(135, 70%, 50%)",
          "loc": 153785
        },
        {
          "name": "shuffle",
          "color": "hsl(169, 70%, 50%)",
          "loc": 104599
        },
        {
          "name": "pick",
          "color": "hsl(194, 70%, 50%)",
          "loc": 52840
        },
        {
          "name": "plouc",
          "color": "hsl(62, 70%, 50%)",
          "loc": 133889
        }
      ]
    },
    {
      "name": "text",
      "color": "hsl(90, 70%, 50%)",
      "children": [
        {
          "name": "trim",
          "color": "hsl(260, 70%, 50%)",
          "loc": 93627
        },
        {
          "name": "slugify",
          "color": "hsl(282, 70%, 50%)",
          "loc": 49355
        },
        {
          "name": "snakeCase",
          "color": "hsl(344, 70%, 50%)",
          "loc": 197267
        },
        {
          "name": "camelCase",
          "color": "hsl(299, 70%, 50%)",
          "loc": 74200
        },
        {
          "name": "repeat",
          "color": "hsl(111, 70%, 50%)",
          "loc": 173808
        },
        {
          "name": "padLeft",
          "color": "hsl(40, 70%, 50%)",
          "loc": 29596
        },
        {
          "name": "padRight",
          "color": "hsl(155, 70%, 50%)",
          "loc": 58102
        },
        {
          "name": "sanitize",
          "color": "hsl(239, 70%, 50%)",
          "loc": 90103
        },
        {
          "name": "ploucify",
          "color": "hsl(336, 70%, 50%)",
          "loc": 166130
        }
      ]
    },
    {
      "name": "misc",
      "color": "hsl(242, 70%, 50%)",
      "children": [
        {
          "name": "whatever",
          "color": "hsl(38, 70%, 50%)",
          "children": [
            {
              "name": "hey",
              "color": "hsl(292, 70%, 50%)",
              "loc": 29764
            },
            {
              "name": "WTF",
              "color": "hsl(234, 70%, 50%)",
              "loc": 25557
            },
            {
              "name": "lol",
              "color": "hsl(118, 70%, 50%)",
              "loc": 8005
            },
            {
              "name": "IMHO",
              "color": "hsl(262, 70%, 50%)",
              "loc": 179084
            }
          ]
        },
        {
          "name": "other",
          "color": "hsl(171, 70%, 50%)",
          "loc": 148183
        },
        {
          "name": "crap",
          "color": "hsl(212, 70%, 50%)",
          "children": [
            {
              "name": "crapA",
              "color": "hsl(43, 70%, 50%)",
              "loc": 110751
            },
            {
              "name": "crapB",
              "color": "hsl(201, 70%, 50%)",
              "children": [
                {
                  "name": "crapB1",
                  "color": "hsl(322, 70%, 50%)",
                  "loc": 104426
                },
                {
                  "name": "crapB2",
                  "color": "hsl(54, 70%, 50%)",
                  "loc": 85781
                },
                {
                  "name": "crapB3",
                  "color": "hsl(263, 70%, 50%)",
                  "loc": 72475
                },
                {
                  "name": "crapB4",
                  "color": "hsl(334, 70%, 50%)",
                  "loc": 93898
                }
              ]
            },
            {
              "name": "crapC",
              "color": "hsl(150, 70%, 50%)",
              "children": [
                {
                  "name": "crapC1",
                  "color": "hsl(351, 70%, 50%)",
                  "loc": 18798
                },
                {
                  "name": "crapC2",
                  "color": "hsl(297, 70%, 50%)",
                  "loc": 162304
                },
                {
                  "name": "crapC3",
                  "color": "hsl(150, 70%, 50%)",
                  "loc": 193816
                },
                {
                  "name": "crapC4",
                  "color": "hsl(51, 70%, 50%)",
                  "loc": 184476
                },
                {
                  "name": "crapC5",
                  "color": "hsl(201, 70%, 50%)",
                  "loc": 37122
                },
                {
                  "name": "crapC6",
                  "color": "hsl(210, 70%, 50%)",
                  "loc": 5258
                },
                {
                  "name": "crapC7",
                  "color": "hsl(12, 70%, 50%)",
                  "loc": 44294
                },
                {
                  "name": "crapC8",
                  "color": "hsl(214, 70%, 50%)",
                  "loc": 84014
                },
                {
                  "name": "crapC9",
                  "color": "hsl(359, 70%, 50%)",
                  "loc": 3109
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
        margin={{
            "top": 20,
            "right": 20,
            "bottom": 20,
            "left": 20
        }}
        identity="name"
        value="loc"
        colors="paired"
        colorBy="depth"
        labelSkipRadius={10}
        labelTextColor="inherit:darker(0.8)"
        borderColor="inherit:darker(0.3)"
        animate={true}
        motionStiffness={90}
        motionDamping={12}
    /> 
        </div>


    );
  }
}

export default Bubble;
