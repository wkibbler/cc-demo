
import scriptUtils from "./utils";

const path = require('path');
const config = require('../DSL/config').TypographyConfig;
let scss = ``;
for (const [key, val] of Object.entries(config.TTypes)) {
    const name = `${key}`;
    //@ts-ignore
    const {ff: fontFamily, fw: fontWeight} = val;
    scss += `
.${name} {
    font-family: ${fontFamily};
    font-weight: ${fontWeight};
}
    `;
}
scss += `
body{
    font-family: ${config.fontFamily};
}`;
scriptUtils.writeFile(path.join(__dirname, '..', 'DSL', 'Typography', 'Typography.module.scss'), scss);