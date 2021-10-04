
import * as fs from "fs";

const writeFile = (outputFileName: string, content: string) => {

    console.log("Writing file ", outputFileName, "with", content);
    content = `/*****************************************************************************************************************************/
/****** WARNING! THIS FILE IS AUTO-GENERATED. DO NOT EDIT IT MANUALLY OR OTHERWISE YOUR CHANGES WILL BE OVERWRITTEN!! ******/
/*****************************************************************************************************************************/
${content}
`;
    fs.writeFile(outputFileName, content, function (err: any) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was created!");
    });
};
const scriptUtils = {writeFile};
export default scriptUtils;