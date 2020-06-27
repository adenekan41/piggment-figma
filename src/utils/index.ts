/**
 * Hex Converter
 * @param {Number} rgb
 * @returns {Number}
 */
export const hexConverter = (rgb : any) : any => {
    const s = "0123456789abcdef";
    let i = parseInt(rgb, 10);
    if (i === 0 || isNaN(rgb)) 
        return "00";
    


    i = Math.round(Math.min(Math.max(0, i), 255));
    return s.charAt((i - (i % 16)) / 16) + s.charAt(i % 16);
};

export const getRandomColors = () : any => {
    return `#${
        (((1 << 24) * Math.random()) | 0 | 1).toString(16)
    }`;
};

/**
 * Convert each RGB to an hex string
 * @param {String} rgb
 * @param {Number} index
 */
export const rgbToHex = (rgb : string, index : number) : string => {
    const color: string = rgb.split("rgb").slice(1)[index];
    const [r, g, b] : any = color.match(/\d+/g);
    return `#${
        hexConverter(r)
    }${
        hexConverter(g)
    }${
        hexConverter(b)
    }`;
};

/**
 * Gradient Core
 * @returns {String}
 * initial code https://github.com/pacocoursey/dye/blob/master/dye.js
 * REFACTORED
 */
export const generateGradient = () : string => {
    const n = (u) => ~~ (Math.random() * (u + 1));
    const toPercentage = () => Math.floor(Math.random() * (100 - 90 + 1)) + 90;
    const r = () => `rgb(${
        n(255)
    }, ${
        n(255)
    }, ${
        n(255)
    })`;
    return `linear-gradient(${
        n(360)
    }deg, ${
        r()
    } ${
        n(23)
    }%, ${
        r()
    } ${
        toPercentage()
    }%)`;
};

/**
 * Get Random Item In An Array
 * @param {Array} list
 */
export const get_random = (list : Array < object >) : object => {
    return list[Math.floor(Math.random() * list.length)];
};

/**
 *
 * @param {Function} func
 * @param {Number|String} wait
 * @param {Number|String} immediate
 */
export function debounce(func : Function, wait : number, immediate : any): any {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = null;
            if (! immediate) 
                func.apply(context, args);
            


        };
        const callNow = immediate && ! timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) 
            func.apply(context, args);
        


    };
}

/**
 * create a unique ID for the data object
 * @returns {String}
 */
export const guidGenerator = () : string => {
    const S4 = () => {
        return(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return `${
        S4() + S4()
    }-${
        S4()
    }-${
        S4()
    }-${
        S4()
    }-${
        S4()
    }${
        S4()
    }${
        S4()
    }`;
};

/**
 * Luminace function by  kirilloid https://stackoverflow.com/a/9733420/3695983
 * @param {String} r
 * @param {String} g
 * @param {String} b
 */
export const luminanace = (r : any, g : any, b : any) : any => {
    const a: Array < number > = [r, g, b].map((v : number) : any => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

/**
 * Hex to RGB
 * @param {String} hex
 */
export const hexToRgb = (hex : any, rgbStr : boolean = false) : any => {
    if (hex) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => {
            return r + r + g + g + b + b;
        });

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return !rgbStr && result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null || `rgb(${
            parseInt(result[1], 16)
        }, ${
            parseInt(result[2], 16)
        }, ${
            parseInt(result[3], 16)
        })`;
    }
};

/**
 * @private
 * @param {String} strColor
 */
export const isColor = (strColor : string) : boolean => {
    const s = new Option().style;
    s.color = strColor;
    const test1 = s.color === strColor;
    const test2 = /^#[0-9A-F]{3}$|^#[0-9A-F]{6}/i.test(strColor);
    if (test1 === true || test2 === true) {
        return true;
    }
    return false;
};

export const calculateContrast = (color1 : any, color2 : any) : any => {
    const splittedRgb = (rgb) => rgb.match(/\d+/g);
    if (!color1 && !color2) 
        return;
    


    if (isColor(color1) && isColor(color2)) {
        const $color1$ = color1.trim().indexOf("#") === 0 ? luminanace(hexToRgb(color1).r, hexToRgb(color1).g, hexToRgb(color1).b) : color1.trim().indexOf("rgb") === 0 ? luminanace(splittedRgb(color1)[0], splittedRgb(color1)[1], splittedRgb(color1)[2]) : null;
        const $color2$ = color2.trim().indexOf("#") === 0 ? luminanace(hexToRgb(color2).r, hexToRgb(color2).g, hexToRgb(color2).b) : color2.trim().indexOf("rgb") === 0 ? luminanace(splittedRgb(color2)[0], splittedRgb(color2)[1], splittedRgb(color2)[2]) : null;

        const ratio = $color1$ > $color2$ ? ($color2$ + 0.05) / ($color1$ + 0.05) : ($color1$ + 0.05) / ($color2$ + 0.05);
        const ratioObj = (Math.max($color1$, $color2$) + 0.05) / (Math.min($color1$, $color2$) + 0.05);

        // eslint-disable-next-line consistent-return
        return ratio ? {
            ratio: ratioObj.toFixed(2),
            AA_level_large_text: ratio < 1 / 3 ? "PASS" : "FAIL",
            AA_level_small_text: ratio < 1 / 4.5 ? "PASS" : "FAIL",
            AAA_level_large_text: ratio < 1 / 4.5 ? "PASS" : "FAIL",
            AAA_level_small_text: ratio < 1 / 7 ? "PASS" : "FAIL"
        } : null;
    }
};

/**
 * Get Ratio Token
 * @param {String} ratio
 */

export const ratioStatus = (ratio : number) : object => {
    if (!ratio) 
        return;
    


    if (ratio) { // eslint-disable-next-line consistent-return
        return {
            color: ratio < 4.5 ? "#b10808" : ratio <= 7 ? "#ce6f02" : "#10880f",
            status: ratio < 4.5 ? "Poor" : ratio <= 7 ? "Fair" : "Good",
            background: ratio < 4.5 ? "#ffb5b4" : ratio <= 7 ? "#ffce97" : "#beffbd"
        };
    }
};

/**
 * Validate if hex code is confomed to the standard 6 length
 * @param {String} hex
 */

export const validateHexCode = (hex : any) : any => {
    if (hex && hex.length < 7) {
        return validateHexCode(getRandomColors());
    }
    return hex;
};

/**
 * Generate Pallete Colors
 * @param {Function | String} colorStart
 * @param {Function | String} colorEnd
 * @param {Function | String} colorCount
 * @returns {Object}
 */
export const generatepalette = (colorStart : any = validateHexCode(getRandomColors()), colorEnd : any = validateHexCode(getRandomColors()), colorCount : number = 6) : any => {
    interface Color {
        r: any;
        g: any;
        b: any;
    }
    const start: Color = hexToRgb(colorStart);
    const end: Color = hexToRgb(colorEnd);
    const len: number = colorCount;

    let alpha = 0.0;

    const palette: Array < string > = [];

    for (let i = 0; i < len; i++) {
        let colors: Color;
        alpha += 1.0 / len;

        colors.r = Number(start.r * alpha + (1 - alpha) * end.r);
        colors.g = Number(start.g * alpha + (1 - alpha) * end.g);
        colors.b = Number(start.b * alpha + (1 - alpha) * end.b);

        palette.push(`#${
            hexConverter(colors.r)
        }${
            hexConverter(colors.g)
        }${
            hexConverter(colors.b)
        }`);
    }

    return {
        id: guidGenerator(),
        name: `#Palette${
            guidGenerator().slice(0, 4)
        }`,
        colors: palette,
        start: colorStart,
        count: colorCount,
        end: colorEnd
    };
};

export const shouldBeLessThan = (val : any, lessThan : number = 100) : any => {
    if (!val) 
        return;
    


    if (parseInt(val, 10) > lessThan) {
        return lessThan;
    }
    return val;
};

/**
 * https://github.com/bubble-dev/_/blob/master/packages/fantasy-color/rgb-to-srgb/src/index.ts
 * @param normalized 
 */
const NORMALIZED_BELOW_10 = 0.03928
export const toSrgb = (normalized : number) => (normalized > NORMALIZED_BELOW_10 ? Math.pow(((normalized + 0.055) / 1.055), 2.4) : normalized / 12.92)
