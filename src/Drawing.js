const LineType = require("./LineType");
const Layer = require("./Layer");
const Line = require("./Line");
const Arc = require("./Arc");
const Circle = require("./Circle");
const Text = require("./Text");
const Polyline = require("./Polyline");
const Polyline3d = require("./Polyline3d");
const Face = require("./Face");
const Point = require("./Point");
const TextStyle = require("./TextStyle");
const Dimension = require("./Dimension");

class Drawing {
  constructor() {
    this.layers = {};
    this.activeLayer = null;
    this.lineTypes = {};
    this.headers = {};
    this.textStyles = {};

    this.setUnits("Unitless");

    for (let i = 0; i < Drawing.LINE_TYPES.length; ++i) {
      this.addLineType(
        Drawing.LINE_TYPES[i].name,
        Drawing.LINE_TYPES[i].description,
        Drawing.LINE_TYPES[i].elements
      );
    }

    for (let i = 0; i < Drawing.LAYERS.length; ++i) {
      this.addLayer(
        Drawing.LAYERS[i].name,
        Drawing.LAYERS[i].colorNumber,
        Drawing.LAYERS[i].lineTypeName,
        Drawing.LAYERS[i].lineWeight
      );
    }

    for (let i = 0; i < Drawing.TEXT_STYLES.length; ++i) {
      this.addTextStyle(
        Drawing.TEXT_STYLES[i].styleName,
        Drawing.TEXT_STYLES[i].fontName,
        Drawing.TEXT_STYLES[i].height,
        Drawing.TEXT_STYLES[i].widthFactor,
        Drawing.TEXT_STYLES[i].obliquingAngle
      );
    }

    this.setActiveLayer("0");
  }

  /**
   * @param {string} name
   * @param {string} description
   * @param {array} elements - if elem > 0 it is a line, if elem < 0 it is gap, if elem == 0.0 it is a
   */
  addLineType(name, description, elements) {
    this.lineTypes[name] = new LineType(name, description, elements);
    return this;
  }

  addLayer(name, colorNumber, lineTypeName, lineWeight) {
    this.layers[name] = new Layer(name, colorNumber, lineTypeName, lineWeight);
    return this;
  }

  addTextStyle(styleName, fontName, height, widthFactor, obliquingAngle) {
    this.textStyles[styleName] = new TextStyle(
      styleName,
      fontName,
      height,
      widthFactor,
      obliquingAngle
    );
    return this;
  }

  setActiveLayer(name) {
    this.activeLayer = this.layers[name];
    return this;
  }

  drawLine(x1, y1, x2, y2, id) {
    this.activeLayer.addShape(new Line(x1, y1, x2, y2, id));
    return this;
  }

  drawPoint(x, y) {
    this.activeLayer.addShape(new Point(x, y));
    return this;
  }

  drawRect(x1, y1, x2, y2) {
    this.activeLayer.addShape(new Line(x1, y1, x2, y1));
    this.activeLayer.addShape(new Line(x1, y2, x2, y2));
    this.activeLayer.addShape(new Line(x1, y1, x1, y2));
    this.activeLayer.addShape(new Line(x2, y1, x2, y2));
    return this;
  }

  /**
   * @param {number} x1 - Center x
   * @param {number} y1 - Center y
   * @param {number} r - radius
   * @param {number} startAngle - degree
   * @param {number} endAngle - degree
   */
  drawArc(x1, y1, r, startAngle, endAngle) {
    this.activeLayer.addShape(new Arc(x1, y1, r, startAngle, endAngle));
    return this;
  }

  /**
   * @param {number} x1 - Center x
   * @param {number} y1 - Center y
   * @param {number} r - radius
   */
  drawCircle(x1, y1, r) {
    this.activeLayer.addShape(new Circle(x1, y1, r));
    return this;
  }

  /*
   * @param {number} x1 - x
   * @param {number} y1 - y
   * @param {number} height - Text height
   * @param {number} rotation - Text rotation
   * @param {string} value - the string itself
   */
  drawText(
    id,
    x1,
    y1,
    height,
    rotation,
    value,
    textStyle,
    horizontalAlignment,
    verticalAlignment,
    widthFactor,
    obliquing
  ) {
    this.activeLayer.addShape(
      new Text(
        id,
        x1,
        y1,
        height,
        rotation,
        value,
        textStyle,
        horizontalAlignment,
        verticalAlignment,
        widthFactor,
        obliquing
      )
    );
    return this;
  }

  /**
   * @param {array} points - Array of points like [ [x1, y1], [x2, y2]... ]
   * @param {boolean} closed - Closed polyline flag
   * @param {number} startWidth - Default start width
   * @param {number} endWidth - Default end width
   */
  drawPolyline(points, id, closed = false, startWidth = 0, endWidth = 0) {
    this.activeLayer.addShape(
      new Polyline(points, id, closed, startWidth, endWidth)
    );
    return this;
  }

  /**
   * @param {array} points - Array of points like [ [x1, y1, z1], [x2, y2, z1]... ]
   */
  drawPolyline3d(points) {
    points.forEach((point) => {
      if (point.length !== 3) {
        throw "Require 3D coordinate";
      }
    });
    this.activeLayer.addShape(new Polyline3d(points));
    return this;
  }

  /**
   *
   * @param {number} trueColor - Integer representing the true color, can be passed as an hexadecimal value of the form 0xRRGGBB
   */
  setTrueColor(trueColor) {
    this.activeLayer.setTrueColor(trueColor);
    return this;
  }

  /**
   * @param {number} x1 - x
   * @param {number} y1 - y
   * @param {number} z1 - z
   * @param {number} x2 - x
   * @param {number} y2 - y
   * @param {number} z2 - z
   * @param {number} x3 - x
   * @param {number} y3 - y
   * @param {number} z3 - z
   * @param {number} x4 - x
   * @param {number} y4 - y
   * @param {number} z4 - z
   */
  drawFace(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4) {
    this.activeLayer.addShape(
      new Face(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4)
    );
    return this;
  }

  drawDimension(
    endPoint1x,
    endPoint1y,
    endPoint2x,
    endPoint2y,
    anchorPoint2x,
    anchorPoint2y,
    middleOfTextX,
    middleOfTextY,
    id,
    blockName,
    dimensionType,
    rotationAngle
  ) {
    this.activeLayer.addShape(
      new Dimension(
        endPoint1x,
        endPoint1y,
        endPoint2x,
        endPoint2y,
        anchorPoint2x,
        anchorPoint2y,
        middleOfTextX,
        middleOfTextY,
        id,
        blockName,
        dimensionType,
        rotationAngle
      )
    );
    return this;
  }

  _getDxfLtypeTable() {
    let s = "0\nTABLE\n"; //start table
    s += "2\nLTYPE\n"; //name table as LTYPE table

    for (let lineTypeName in this.lineTypes) {
      s += this.lineTypes[lineTypeName].toDxfString();
    }

    s += "0\nENDTAB\n"; //end table

    return s;
  }

  _getDxfLayerTable() {
    let s = "0\nTABLE\n"; //start table
    s += "2\nLAYER\n"; //name table as LAYER table

    for (let layerName in this.layers) {
      s += this.layers[layerName].toDxfString();
    }

    s += "0\nENDTAB\n";

    return s;
  }

  _getDxfTextStyleTable() {
    let s = "0\nTABLE\n"; //start table
    s += "2\nSTYLE\n"; //name table as STYLE table

    for (let textStyleName in this.textStyles) {
      s += this.textStyles[textStyleName].toDxfString();
    }

    s += "0\nENDTAB\n";

    return s;
  }

  //hardocoded
  _getDimensionBlock() {
    let s = "2\nBLOCKS\n"; //name table as BLOCKS table
    s += `0
BLOCK
8
0
2
*D2
70
1
10
0.0
20
0.0
30
0.0
3
*D2
1
        
0
INSERT
5
BB
8
0
2
*U4
10
0.0
20
0.0
30
0.0
0
ENDBLK
5
9E
8
0
0
BLOCK
8
0
2
*U3
70
1
10
0.0
20
0.0
30
0.0
3
*U3
1
        
0
TEXT
5
11A
8
0
62
0
10
188.9844107033289
20
212.58411945771371
30
0.0
40
2.5
1
126,87
0
ENDBLK
5
11C
8
0
0
BLOCK
8
0
2
*U4
70
1
10
0.0
20
0.0
30
0.0
3
*U4
1
        
0
TEXT
5
11E
8
0
62
0
10
188.9844107033289
20
212.58411945771371
30
0.0
40
2.5
1
126,87
0
ENDBLK
5     
120
8
0`;

    return s;
  }

  /**
   * @see https://www.autodesk.com/techpubs/autocad/acadr14/dxf/header_section_al_u05_c.htm
   * @see https://www.autodesk.com/techpubs/autocad/acad2000/dxf/header_section_group_codes_dxf_02.htm
   *
   * @param {string} variable
   * @param {array} values Array of "two elements arrays". [  [value1_GroupCode, value1_value], [value2_GroupCode, value2_value]  ]
   */
  header(variable, values) {
    this.headers[variable] = values;
    return this;
  }

  _getHeader(variable, values) {
    let s = "9\n$" + variable + "\n";

    for (let value of values) {
      s += `${value[0]}\n${value[1]}\n`;
    }

    return s;
  }

  /**
   *
   * @param {string} unit see Drawing.UNITS
   */
  setUnits(unit) {
    let value =
      typeof Drawing.UNITS[unit] != "undefined"
        ? Drawing.UNITS[unit]
        : Drawing.UNITS["Unitless"];
    this.header("INSUNITS", [[70, Drawing.UNITS[unit]]]);
    return this;
  }

  toDxfString() {
    let s = "";

    //start section
    s += "0\nSECTION\n";
    //name section as HEADER section
    s += "2\nHEADER\n";

    for (let header in this.headers) {
      s += this._getHeader(header, this.headers[header]);
    }

    //end section
    s += "0\nENDSEC\n";

    //start section
    s += "0\nSECTION\n";
    //name section as TABLES section
    s += "2\nTABLES\n";

    s += this._getDxfLtypeTable();
    s += this._getDxfLayerTable();
    s += this._getDxfTextStyleTable();

    //end section
    s += "0\nENDSEC\n";

    ////hardcoded - dimension blocks
    //start section
    s += "0\nSECTION\n";
    s += this._getDimensionBlock() + "\n";
    //end section
    s += "0\nENDSEC\n";

    //ENTITES section
    s += "0\nSECTION\n";
    s += "2\nENTITIES\n";

    for (let layerName in this.layers) {
      let layer = this.layers[layerName];
      s += layer.shapesToDxf();
      // let shapes = layer.getShapes();
    }

    s += "0\nENDSEC\n";

    //close file
    s += "0\nEOF";

    return s;
  }
}

//AutoCAD Color Index (ACI)
//http://sub-atomic.com/~moses/acadcolors.html
Drawing.ACI = {
  LAYER: 0,
  RED: 1,
  YELLOW: 2,
  GREEN: 3,
  CYAN: 4,
  BLUE: 5,
  MAGENTA: 6,
  WHITE: 7,
};

Drawing.LINE_TYPES = [
  { name: "CONTINUOUS", description: "______", elements: [] },
  { name: "DASHED", description: "_ _ _ ", elements: [5.0, -5.0] },
  { name: "DOTTED", description: ". . . ", elements: [0.0, -5.0] },
];

Drawing.LAYERS = [
  {
    name: "0",
    colorNumber: Drawing.ACI.WHITE,
    lineTypeName: "CONTINUOUS",
    lineWeight: "1",
  },
];

Drawing.TEXT_STYLES = [
  // {styleName: "ARIAL", fontName: "arial", height: 200, widthFactor:1, obliquingAngle:1}
];

//https://www.autodesk.com/techpubs/autocad/acad2000/dxf/header_section_group_codes_dxf_02.htm
Drawing.UNITS = {
  Unitless: 0,
  Inches: 1,
  Feet: 2,
  Miles: 3,
  Millimeters: 4,
  Centimeters: 5,
  Meters: 6,
  Kilometers: 7,
  Microinches: 8,
  Mils: 9,
  Yards: 10,
  Angstroms: 11,
  Nanometers: 12,
  Microns: 13,
  Decimeters: 14,
  Decameters: 15,
  Hectometers: 16,
  Gigameters: 17,
  "Astronomical units": 18,
  "Light years": 19,
  Parsecs: 20,
};

module.exports = Drawing;
