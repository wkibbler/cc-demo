import {ColorsDefaultPalette, ThemeInterface, ColorsConfig} from "../DSL/config";
import scriptUtils from "./utils";

const path = require('path');
const config = require('../DSL/config').ColorsConfig;
let scss = ``;
scss += `$background-color: ${ColorsConfig.light.primary};`
const animateThemeSwitching = false;
const maybeAddAnimation = (key: string) => animateThemeSwitching ? `;
        transition: ${key} .3s ease-in-out;` : ``;
const params = {
    color: val => `color: ${val} ${maybeAddAnimation('color')}`,
    bg: val => `background-color: ${val} ${maybeAddAnimation('background-color')}`,
    borderColor: val => `border-color: ${val} ${maybeAddAnimation('border-color')}`,
    stroke: val => `stroke: ${val} ${maybeAddAnimation('stroke')}`,
    fill: val => `fill: ${val} ${maybeAddAnimation('fill')}`,
    placeholder: val => `color: ${val} ${maybeAddAnimation('color')}`,
};
const generateClassName = (color: string, attribute: 'color' | 'bg' | 'fill' | 'stroke' | 'borderColor' | 'placeholder' | any, prefix: string = '', hover: boolean = false) => {
    return `dsl-${prefix === '' ? '' : prefix + '-'}${color}-${attribute}${hover ? '--hover' : ''}`;
};
const runForTheme = (theme: ThemeInterface, hover = false) => {
    let scss = ``;
    let tsx = {color: {}, bg: {}, fill: {}, stroke: {}, borderColor: {}, placeholder: {}};
    for (const [key, val] of Object.entries(theme)) {
        for (const [attrName, generator] of Object.entries(params)) {
            tsx[attrName][key] = generateClassName(key, attrName, '', hover);
            scss += `
    .${generateClassName(key, attrName, '', hover)}${hover ? ':hover' : ''}${attrName === 'placeholder' ? '::placeholder' : ''} {
        ${generator(val)}!important;
    }`
        }
    }
    return {tsx, scss};
};
const tsxTheme = {};
for (const [themeName, themeConfig] of Object.entries(config)) {
    //@ts-ignore
    const {scss: scssContent} = runForTheme(themeConfig);
    //@ts-ignore
    const {scss: scssHoverContent} = runForTheme(themeConfig, true);
    const className = `dsl-theme-${themeName}`;
    tsxTheme[themeName] = className;
    scss += `
    
/*************************
 *  Theme: ${themeName}
 *************************/
.${className} {
    ${scssContent}
    ${scssHoverContent}
}
    `;
}
const generateBootstrapVariablesFile = () => {
    const SCSSJSON = (obj: any) => {
        let scss = '';
        for (const [key, val] of Object.entries(obj)) {
            scss += `     "${key}": ${val},
`;
        }
        return `(
${scss}
)`;
    };
    const colors = {};
    for (const [colorName, colorHex] of Object.entries(ColorsDefaultPalette)) {
        colors[colorName] = colorHex;
    }
    const themeLightColors = {};
    const themeDarkColors = {};
    for (const [colorName, colorHex] of Object.entries(config.light)) {
        themeLightColors[colorName] = colorHex;
    }
    let content = `
// stylelint-disable-next-line scss/dollar-variable-default
$colors: ${SCSSJSON(colors)};
// stylelint-disable-next-line scss/dollar-variable-default
$theme-colors: ${SCSSJSON(themeLightColors)};
// stylelint-disable-next-line scss/dollar-variable-default
$theme-light-colors: ${SCSSJSON(themeLightColors)};
`;
    if(config.dark) {
        for (const [colorName, colorHex] of Object.entries(config.dark)) {
            themeDarkColors[colorName] = colorHex;
        }
        content+= `
// stylelint-disable-next-line scss/dollar-variable-default
$theme-dark-colors: ${SCSSJSON(themeDarkColors)};`;
    }
    scriptUtils.writeFile(path.join(__dirname, '..', 'theme', 'variables', '_theme-colors.scss'), content);
};

for (const [, themeConfig] of Object.entries(config)) {
    //@ts-ignore
    const {tsx} = runForTheme(themeConfig);
    //@ts-ignore
    const {tsx: tsxHover} = runForTheme(themeConfig, true);
    //generate palette scss
    const tsxPalette = {color: {}, bg: {}, fill: {}, stroke: {}, borderColor: {}, placeholder: {}, hex: {}};
    for (const [colorName, colorHex] of Object.entries(ColorsDefaultPalette)) {
        tsxPalette.hex[colorName] = colorHex;
        for (const [attrName, generator] of Object.entries(params)) {
            tsxPalette[attrName][colorName] = generateClassName(colorName, attrName, 'palette');
            scss += `
.${tsxPalette[attrName][colorName]} {
    ${generator(colorHex)}
}
`;
        }
    }
    //@ts-ignore
    tsx.palette = tsxPalette;
    //@ts-ignore
    tsx.theme = tsxTheme;
    //@ts-ignore
    tsx.hover = tsxHover;
    scriptUtils.writeFile(path.join(__dirname, '..', 'DSL', 'Colors.ts'), `
const Colors = ${JSON.stringify(tsx, null, 2)};
export default Colors;
`);
    break;
}

scriptUtils.writeFile(path.join(__dirname, '..', 'DSL', 'Colors.scss'), scss);
generateBootstrapVariablesFile();