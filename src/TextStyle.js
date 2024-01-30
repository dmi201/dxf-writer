class TextStyle
{
    /**
     * @param {string} styleName 
     * @param {string} fontName 
     * @param {number} height 
     * @param {number} widthFactor 
     * @param {number} obliquingAngle 
     */
    constructor(styleName ,fontName ,height ,widthFactor ,obliquingAngle )
    {
        this.styleName = styleName;
        this.fontName = fontName;
        this.height = height;
        this.widthFactor = widthFactor;
        this.obliquingAngle = obliquingAngle;
    }

    toDxfString()
    {
        //https://stackoverflow.com/questions/37027499/adding-text-to-a-dxf-file
        let s = `0\nSTYLE\n`;
        s += `2\n${this.styleName}\n`;
        s += `70\n${0}\n`;
        s += `40\n${this.height}\n`;
        s += `41\n${this.widthFactor}\n`;
        s += `50\n${this.obliquingAngle}\n`;
        s += `71\n${0}\n`;
        s += `42\n${2.5}\n`;
        s += `3\n${this.fontName}\n`;
        // s += `4\n${0}\n`;  //0 if useBigFont checked
        return s;
    }
}

module.exports = TextStyle;