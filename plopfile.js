'use strict';


/* Actions */

const createComponent = (name)=>{
    return {
        type: 'add',
        path: 'src/' + name + '.tsx',
        templateFile: 'plop-templates/Component.tsx.hbs'
    }
}
const createCssModule = (name)=>{
    return {
        type: 'add',
        path: 'src/' + name + '.module.scss',
        templateFile: 'plop-templates/Component.module.scss.hbs'
    }
}
/* Questions */
const getComponentName = {
    type: 'input',
    name: 'name',
    message: 'What is the component name?',
    validate: function (value) {
        if ((/.+/).test(value)) {
            return true;
        }
        return 'name is required';
    }
};
const getDirectoryName = {
    type: 'input',
    name: 'dir',
    message: 'Directory (relative to ./src)',
    validate: function (value) {
        if ((/.+/).test(value)) {
            return true;
        }
        return 'directory is required';
    }
};
module.exports = (plop, config) => {
    plop.setGenerator('Dsl Component', {
        description: 'add new dsl component: tsx + css inside DSL directory',
        prompts: [getComponentName],
        actions: function (data) {
            const actions = [];
            const name = 'DSL/{{name}}/{{name}}';
            actions.push(createComponent(name));
            actions.push(createCssModule(name));
            return actions;
        }
    });
    plop.setGenerator('Page Component', {
        description: 'add new page: tsx + css inside pages directory',
        prompts: [getComponentName],
        actions: function (data) {
            const actions = [];
            const name = 'pages/{{name}}/{{name}}';
            actions.push(createComponent(name));
            actions.push(createCssModule(name));
            return actions;
        }
    });
};