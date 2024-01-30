declare module "dxf-writer" {
    export type Unit =
        | "Unitless"
        | "Inches"
        | "Feet"
        | "Miles"
        | "Millimeters"
        | "Centimeters"
        | "Meters"
        | "Kilometers"
        | "Microinches"
        | "Mils"
        | "Yards"
        | "Angstroms"
        | "Nanometers"
        | "Microns"
        | "Decimeters"
        | "Decameters"
        | "Hectometers"
        | "Gigameters"
        | "Astronomical units"
        | "Light years"
        | "Parsecs";

    // export type HorizontalAlignment = "left" | "center" | "right";
    // export type VerticalAlignment = "baseline" | "bottom" | "middle" | "top";

    export type Point2D = [number, number];
    export type Point3D = [number, number];

    // [GroupCode, value]
    export type HeaderValue = [number, number];

    export interface RenderableToDxf {
        toDxfString(): string;
    }

    export class Arc implements RenderableToDxf {

        public x1: number;
        public y1: number;
        public r: number;
        public startAngle: number;
        public endAngle: number;

        /**
         * @param {number} x1 - Center x
         * @param {number} y1 - Center y
         * @param {number} r - radius
         * @param {number} startAngle - degree
         * @param {number} endAngle - degree
         */
        constructor(
            x1: number,
            y1: number,
            r: number,
            startAngle: number,
            endAngle: number,
        );

        toDxfString(): string;
    }

    export class Circle implements RenderableToDxf {
        public x1: number;
        public y1: number;
        public r: number;

        /**
         * @param {number} x1 - Center x
         * @param {number} y1 - Center y
         * @param {number} r - radius
         */
        constructor(x1: number, y1: number, r: number);
        toDxfString(): string;
    }

    export class Face implements RenderableToDxf {
        public x1: number;
        public y1: number;
        public z1: number;
        public x2: number;
        public y2: number;
        public z2: number;
        public x3: number;
        public y3: number;
        public z3: number;
        public x4: number;
        public y4: number;
        public z4: number;

        constructor(
            x1: number,
            y1: number,
            z1: number,
            x2: number,
            y2: number,
            z2: number,
            x3: number,
            y3: number,
            z3: number,
            x4: number,
            y4: number,
            z4: number,
        );
        toDxfString(): string;
    }

    export class Layer implements RenderableToDxf {
        public name: string;
        public colorNumber: number;
        public lineTypeName: string;
        public lineWeight: number;
        public shapes: RenderableToDxf[];
        public trueColor: number;

        constructor(name: string, colorNumber: number, lineTypeName: string);
        toDxfString(): string;

        setTrueColor(color: number);
        addShape(shape: RenderableToDxf);
        getShapes(): Array<RenderableToDxf>;
        shapesToDxf(): string;
    }

    export class Line implements RenderableToDxf {
        public x1: number;
        public y1: number;
        public x2: number; 
        public y2: number;
        public id: string;

        constructor(x1: number, y1: number, x2: number, y2: number, id: string);
        toDxfString(): string;
    }


    export class LineType implements RenderableToDxf {
        public name: string; 
        public description: string; 
        public elements: Array<number>;

        /**
         * @param {string} name
         * @param {string} description
         * @param {array} elements - if elem > 0 it is a line, if elem < 0 it is gap, if elem == 0.0 it is a
         */
        constructor(name: string, description: string, elements: Array<number>);

        toDxfString(): string;
        getElementsSum(): number;
    }

    export class Point implements RenderableToDxf {
        public x: number;
        public y: number;
        
        constructor(x: number, y: number);
        toDxfString(): string;
    }

    export class Polyline implements RenderableToDxf {
        public points: Array<Point2D>;
        public id: string;

        constructor(points: Array<Point2D>);
        toDxfString(): string;
    }

    export class Polyline3D implements RenderableToDxf {
        public points: Array<Point3D>;

        constructor(points: Array<Point3D>);
        toDxfString(): string;
    }

    export class Text implements RenderableToDxf {
        public id: string;
        public x1: number;
        public y1: number;
        public height: number;
        public rotation: number;
        public value: string;
        public textStyle: string;
        public horizontalAlignment: number;
        public verticalAlignment: number;
        public widthFactor: number
        public obliquing: number
        /*
         * @param {number} x1 - x
         * @param {number} y1 - y
         * @param {number} height - Text height
         * @param {number} rotation - Text rotation
         * @param {string} value - the string itself
         * @param {string} textStyle - the string itself
         * @param {number} horizontalAlignment 
         * @param {number} verticalAlignment 
         */
        constructor(
            id: string,
            x1: number,
            y1: number,
            height: number,
            rotation: number,
            value: string,
            textStyle: string,
            horizontalAlignment: number,
            verticalAlignment: number,
            widthFactor: number,
            obliquing: number
        );
        toDxfString(): string;
    }

    export class TextStyle implements RenderableToDxf {
    /**
     * @param {string} styleName 
     * @param {string} fontName 
     * @param {number} height 
     * @param {number} widthFactor 
     * @param {number} obliquingAngle 
     */

    constructor(styleName: string, fontName: string, height: number, widthFactor: number, obliquingAngle: number)
        toDxfString(): string;
    }

    export class Dimension implements RenderableToDxf {
        public endPoint1x: number
        public endPoint1y: number
        public endPoint2x: number
        public endPoint2y: number
        public anchorPoint2x: number
        public anchorPoint2y: number
        public middleOfTextX: number
        public middleOfTextY: number
        public id: string
        public blockName: string
        public dimensionType: number
        public rotationAngle: number

        constructor(endPoint1x: number, endPoint1y: number, endPoint2x: number, endPoint2y: number, anchorPoint2x: number, anchorPoint2y: number, middleOfTextX: number, middleOfTextY: number, id: string, blockName: string, dimensionType: number, rotationAngle: number);
        toDxfString(): string;
    }

    export type ACIKey = 'LAYER'
        | 'RED'
        | 'YELLOW'
        | 'GREEN'
        | 'CYAN'
        | 'BLUE'
        | 'MAGENTA'
        | 'WHITE'
        ;

    export default class Drawing implements RenderableToDxf {
        constructor();

        layers: { [key: string]: Layer };
        textStyles: { [key: string]: TextStyle };
        activeLayer: Layer | null;
        lineTypes: { [key: string]: LineType };
        headers: { [key: string]: Array<HeaderValue> };

        /**
         * @param {string} name
         * @param {string} description
         * @param {array} elements - if elem > 0 it is a line, if elem < 0 it is gap, if elem == 0.0 it is a
         */
        addLineType(name: string, description: string, elements: Array<number>): Drawing;

        addLayer(name: string, colorNumber: number, lineTypeName: string, lineWeight: number): Drawing;
        addTextStyle(styleName: string, fontName: string, height: number, widthFactor: number, obliquingAngle: number): Drawing;
        setActiveLayer(name: string): Drawing;
        drawLine(x1: number, y1: number, x2: number, y2: number, id: string): Drawing;
        drawPoint(x: number, y: number): Drawing;
        drawRect(x1: number, y1: number, x2: number, y2: number): Drawing;

        /**
         * @param {number} x1 - Center x
         * @param {number} y1 - Center y
         * @param {number} r - radius
         * @param {number} startAngle - degree
         * @param {number} endAngle - degree
         */
        drawArc(x1: number, y1: number, r: number, startAngle: number, endAngle: number): Drawing;

        /**
         * @param {number} x1 - Center x
         * @param {number} y1 - Center y
         * @param {number} r - radius
         */
        drawCircle(x1: number, y1: number, r: number): Drawing;


        /*
         * @param {number} x1 - x
         * @param {number} y1 - y
         * @param {number} height - Text height
         * @param {number} rotation - Text rotation
         * @param {string} value - the string itself
         * @param {string} textStyle - the string itself
         * @param {number} horizontalAlignment 
         * @param {number} verticalAlignment 
         */
        drawText(
            id: string,
            x1: number,
            y1: number,
            height: number,
            rotation: number,
            value: string,
            textStyle: string,
            horizontalAlignment: number,
            verticalAlignment: number,
            widthFactor: number,
            obliquing: number
        ): Drawing;


        /**
         * @param {array} points - Array of points like [ [x1, y1], [x2, y2]... ]
         */
        drawPolyline(points: Array<Point2D>, id: string): Drawing;

        /**
         * @param {array} points - Array of points like [ [x1, y1, z1], [x2, y2, z1]... ]
         */
        drawPolyline3d(points: Array<Point3D>): Drawing;

        /**
         * @param {number} trueColor - Integer representing the true color, can be passed as an hexadecimal value of the form 0xRRGGBB
         */
        setTrueColor(trueColor: number): Drawing;

        drawFace(
            x1: number,
            y1: number,
            z1: number,
            x2: number,
            y2: number,
            z2: number,
            x3: number,
            y3: number,
            z3: number,
            x4: number,
            y4: number,
            z4: number,
        ): Drawing;

        drawDimension(endPoint1x: number, endPoint1y: number, endPoint2x: number, endPoint2y: number, anchorPoint2x: number, anchorPoint2y: number, middleOfTextX: number, middleOfTextY: number, id: string, blockName: string, dimensionType: number, rotationAngle: number): Drawing;

        _getDxfLtypeTable(): string;
        _getDxfLayerTable(): string;
        _getDxfTextStyleTable(): string;

        /**
         * @see https://www.autodesk.com/techpubs/autocad/acadr14/dxf/header_section_al_u05_c.htm
         * @see https://www.autodesk.com/techpubs/autocad/acad2000/dxf/header_section_group_codes_dxf_02.htm
         *
         * @param {string} variable
         * @param {array} values Array of "two elements arrays". [  [value1_GroupCode, value1_value], [value2_GroupCode, value2_value]  ]
         */
        header(variable: string, values: Array<HeaderValue>): Drawing;
        _getHeader(variable: string, values: Array<HeaderValue>): string;

        /**
         *
         * @param {string} unit see Drawing.UNITS
         */
        setUnits(unit: Unit): Drawing;

        toDxfString(): string;

        /**
         * AutoCAD Color Index (ACI)
         * @see http://sub-atomic.com/~moses/acadcolors.html
         */
        static ACI: { [key in ACIKey]: number};

        static LINE_TYPES: LineType[];

        static LAYERS: Layer[];

        /**
         * @see https://www.autodesk.com/techpubs/autocad/acad2000/dxf/header_section_group_codes_dxf_02.htm
         */
        static UNITS: { [key in Unit]: number };
    }
}
