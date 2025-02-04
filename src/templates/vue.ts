export default {
    JS_TEMPLATE: `
<template>
    <div></div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style scoped src="./styles/index{{stylingExtension}}"></style>
`,
    TS_TEMPLATE: `
<template>
    <div>{{componentName}}</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    name: '{{componentName}}',
    components: {
    },
  })

  export default class {{componentName}} extends Vue {

  }
</script>

<style scoped>
@import url(./style/index{{stylingExtension}})

</style>
`,
    STORYBOOK: `
import Vue from 'vue';
import {{transComponentName}} from './{{componentName}}.vue';

export default {title: '{{transComponentName}}'};

export const {{transComponentName}}Example = () => ({
    components: { {{transComponentName}} },
    template: '<{{transComponentName}}/>'
});
`,
    INDEX: `
import {{transComponentName}} from './{{componentName}}.vue';
export default {{transComponentName}};    
`,
    STYLING: `.container{
        
    }`,
    TESTCASES:  ``,
    MOCK: ``
};