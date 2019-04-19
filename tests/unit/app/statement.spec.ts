import { mount, createLocalVue } from '@vue/test-utils';
import {
    Statement,
    ShowPlanPlugin,
} from 'showplan-vue';


import { ShowPlanParser } from 'showplan-js';
import * as fs from 'fs';

describe('we can mount statement.vue', () => {
    test('actually works', () => {
        const vue = createLocalVue();

        const file = 'tests/unit/app/adaptive-join.sqlplan';
        const data = fs.readFileSync(file, 'utf16le');
        const plan = ShowPlanParser.Parse(data);
        const statement = plan.Batches[0].Statements[0];

        expect(statement).toBeDefined();

        const wrapper = mount(Statement,
            {
                localVue: vue,
                propsData: {
                    showPlan: plan,
                    statement,
                },
            });

        expect(wrapper.isVueInstance).toBeTruthy();
    });
});
