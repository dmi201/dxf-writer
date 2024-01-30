const { dimensionStyle } = require("../../../app/config/db.config");

class Dimension
{
    constructor(endPoint1x, endPoint1y, endPoint2x, endPoint2y, anchorPoint2x, anchorPoint2y, middleOfTextX, middleOfTextY, id, blockName, dimensionType, rotationAngle)
    {
        this.endPoint1x = endPoint1x;
        this.endPoint1y = endPoint1y;
        this.endPoint2x = endPoint2x;
        this.endPoint2y = endPoint2y;
        this.anchorPoint2x = anchorPoint2x 
        this.anchorPoint2y = anchorPoint2y
        this.middleOfTextX = middleOfTextX
        this.middleOfTextY = middleOfTextY
        this.id = id;
        this.blockName = blockName
        this.dimensionType = dimensionType
        this.rotationAngle = rotationAngle
    }

    toDxfString()
    {

        let s = `0\nDIMENSION\n`;
        s += `5\n${this.id}\n`;
        s += `8\n${this.layer.name}\n`;
        s += `2\n${this.blockName}\n`;
        s += `10\n${this.anchorPoint2x}\n20\n${this.anchorPoint2y}\n30\n0\n`;
        s += `11\n${this.middleOfTextX}\n21\n${this.middleOfTextY}\n31\n0\n`; //middle of text
        s += `70\n${this.dimensionType}\n`;
        s += `50\n${this.rotationAngle}\n`;
        s += `13\n${this.endPoint1x}\n23\n${this.endPoint1y}\n33\n0\n`;
        s += `14\n${this.endPoint2x}\n24\n${this.endPoint2y}\n34\n0\n`;
        return s;
    }
}

module.exports = Dimension;