

//     * @param {string} [horizontalAlignment="left"] left | center | right
// * @param {string} [verticalAlignment="baseline"] baseline | bottom | middle | top 

class Text
{
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
    constructor(id, x1, y1, height, rotation, value, textStyle, horizontalAlignment, verticalAlignment, widthFactor, obliquing ) //horizontalAlignment = 'left', verticalAlignment = 'baseline'
    {
        this.id = id;
        this.x1 = x1;
        this.y1 = y1;
        this.height = height;
        this.rotation = rotation;
        this.value = value;
        this.textStyle = textStyle;
        this.horizontalAlignment = horizontalAlignment;
        this.verticalAlignment = verticalAlignment;
        this.widthFactor = widthFactor
        this.obliquing = obliquing

    }

    toDxfString()
    {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/text_al_u05_c.htm
        let s = `0\nTEXT\n`;
        s += `5\n${this.id}\n`;
        s += `8\n${this.layer.name}\n`;
        s += `1\n${this.value}\n`;
        s += `10\n${this.x1}\n20\n${this.y1}\n30\n0\n`;
        s += `40\n${this.height}\n50\n${this.rotation}\n`;
        s += `41\n${this.widthFactor}\n`;
        s += `51\n${this.obliquing}\n`;
        s += `7\n${this.textStyle}\n`;
        // if(this.horizontalAlignment && this.verticalAlignment){

        // }
        s += `11\n${this.x1}\n21\n${this.y1}\n31\n0\n`;
        s += `72\n${this.horizontalAlignment}\n`;
        // s += `73\n${this.verticalAlignment}\n`;

        // s += `72\n${H_ALIGN_CODES.indexOf(this.hAlign)}\n`;
        // s += `73\n${V_ALIGN_CODES.indexOf(this.vAlign)}\n`;
        // s += `72\n${Math.max(H_ALIGN_CODES.indexOf(this.hAlign),0)}\n`;
        // s += `73\n${Math.max(V_ALIGN_CODES.indexOf(this.vAlign),0)}\n`;
        // if (H_ALIGN_CODES.includes(this.hAlign, 1) || V_ALIGN_CODES.includes(this.vAlign, 1)){
        //     s += `11\n${this.x1}\n21\n${this.y1}\n31\n0\n`;
        //     s += `72\n${Math.max(H_ALIGN_CODES.indexOf(this.hAlign),0)}\n`;
        //     s += `73\n${Math.max(V_ALIGN_CODES.indexOf(this.vAlign),0)}\n`;
        // }
      

        return s;
    }
}

module.exports = Text;