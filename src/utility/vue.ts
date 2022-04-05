import * as fs from 'fs';
import * as path from 'path';
import * as mustache from 'mustache';
import VUE_TEMPLATES from '../templates/vue';
import { CONSTANTS } from '../constants';

export const buildVueTemplate = (config: any, componentName: string, cPath: string) => {
    
    let stylingExtension = config.includes(CONSTANTS.FEATURES.STYLING_LESS) ? ".less" : ".css";
    let indexExtension = config.includes(CONSTANTS.FEATURES.TS) ? ".ts" : ".js";
    let componentExtension = `.vue`;

    const FILE_NAMES = {
        styleDir: `style`,
        styling: `style/index${stylingExtension}`,
        component: `${componentName}${componentExtension}`,
        componentIndex: `index${indexExtension}`,
        storybook: `${componentName}.stories${indexExtension}`,
        test: `${componentName}.test${indexExtension}`,
        mock:  `${componentName}.mock${indexExtension}`,
    };
    
    const COMPONENT_TEMPLATE = config.includes(CONSTANTS.FEATURES.TS) ? VUE_TEMPLATES.TS_TEMPLATE : VUE_TEMPLATES.JS_TEMPLATE;
    console.log('输出模版',COMPONENT_TEMPLATE);
    
    const transComponentName = componentName.replace(/(\-([a-z]))/g, (match, p1, p2, offset, string) => {
        // 这里有两个捕获组，第一个捕获组捕获全部并包含了第二个捕获组，所以match等于p1
        return p2.toUpperCase();
    })

    // Writing main component file
    const componentMainResponse = fs.writeFileSync(
        path.join(
            cPath,
            FILE_NAMES.component
        ),
        mustache.render(COMPONENT_TEMPLATE, {componentName:transComponentName})
    );

    // Writing component index file
    const componentIndexResponse = fs.writeFileSync(
        path.join(
            cPath,
            FILE_NAMES.componentIndex
        ),
        mustache.render(VUE_TEMPLATES.INDEX, {componentName,transComponentName})
    );
    
    // Creating style directory
    const componentStyleDirResponse = fs.mkdirSync(path.join(
        cPath,
        FILE_NAMES.styleDir
    ));

    // Writing component styling file
    const componentStylingResponse = fs.writeFileSync(
        path.join(
            cPath,
            FILE_NAMES.styling
        ),
        mustache.render(VUE_TEMPLATES.STYLING, {componentName:transComponentName})
    );

    // Writing storybook file
    if(config.includes(CONSTANTS.FEATURES.STORYBOOK)) {
        const componentStylingResponse = fs.writeFileSync(
            path.join(
                cPath,
                FILE_NAMES.storybook
            ),
            mustache.render(VUE_TEMPLATES.STORYBOOK, {componentName,transComponentName})
        );
    }

    // Writing test file
    if(config.includes(CONSTANTS.FEATURES.TESTCASES)) {
        const componentStylingResponse = fs.writeFileSync(
            path.join(
                cPath,
                FILE_NAMES.test
            ),
            mustache.render(VUE_TEMPLATES.TESTCASES, {componentName:transComponentName})
        );
    }

    // Writing mock file
    if(config.includes(CONSTANTS.FEATURES.Mock)) {
        const componentStylingResponse = fs.writeFileSync(
            path.join(
                cPath,
                FILE_NAMES.mock
            ),
            mustache.render(VUE_TEMPLATES.MOCK, {componentName:transComponentName})
        );
    }


    // if(config.includes(CONSTANTS.FEATURES.STORYBOOK)) {
    //     const componentStylingResponse = fs.writeFileSync(
    //         path.join(
    //             cPath,
    //             FILE_NAMES.storybook
    //         ),
    //         mustache.render(VUE_TEMPLATES.STORYBOOK, {componentName})
    //     );
    // }

}