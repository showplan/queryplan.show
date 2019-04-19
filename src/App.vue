<template>
    <div
        id="app"
        :class="theme"
    >
        <div id="container">
            <header-menu
                :dark-mode="darkMode"
                :current-plan="showPlan"
                @plan-changed="planXmlChanged"
                @toggle-theme="toggleTheme"
            />
            <div
                v-if="errorMessage !== undefined"
                class="message warning"
            >
                {{ errorMessage }}
            </div>
            <component
                :is="currentComponent"
                :show-plan="showPlan"
                @showplan-changed="planXmlChanged"
            />
            <p class="footer">
                Everything is ran in browser so no files will be uploaded. I can't afford the storage space anyways
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import FileUploadDrop from '@/components/FileUploadDrop.vue';
import HeaderMenu from '@/components/Header.vue';
import { ShowPlanXML, BaseStmtInfo } from 'showplan-js';
import { Statement as ShowplanStatement } from 'showplan-vue';

@Component({
    components: {
        HeaderMenu,
        FileUploadDrop,
        // load this dynamically. it's a big chunk and isn't needed until
        // a file is picked. This let's the upload view still be snappy
        ShowplanStatement: () => import('showplan-vue').then(i => i.Statement),
    },
    data() {
        return {
            showPlan: undefined,
            selectedStatementGuid: undefined,
            errorMessage: undefined,
        };
    },
})
export default class App extends Vue {
    public showPlan: ShowPlanXML | undefined;

    public get theme(): string {
    // vscode will set the theme themselves
    // via the body tag
        if (process.env.VUE_APP_EMBED) {
            return '';
        }

        if (this.darkMode) {
            return 'theme--dark';
        }

        return 'theme--light';
    }

    private darkMode: boolean = true;

    private errorMessage: string | undefined;

    public get currentComponent(): string {
        if (this.showPlan === undefined) {
            return 'file-upload-drop';
        }

        return 'showplan-statement';
    }

    public toggleTheme() {
        this.darkMode = !this.darkMode;
    }

    public showPlanChanged(showPlan: ShowPlanXML | undefined) {
        this.showPlan = showPlan;
    }

    public planXmlChanged(plan: string | undefined) {
        this.errorMessage = undefined;

        if (plan === undefined) {
            this.showPlan = undefined;
            return;
        }

        import('showplan-js').then((showplan) => {
            try {
                this.showPlanChanged(showplan.ShowPlanParser.Parse(plan));
            } catch (e) {
                this.errorMessage = e.message;
            }
        });
    }
}
</script>

<style lang="scss" scoped>
  #app {
    padding: 1rem;
    min-height: 125vh;
    min-width: 800px;
    transition: background-color .3s ease, color .3s ease;
  }

  #container {
    position: relative;
    min-width:800px;
    max-width:1200px;
    left: 0px;
    margin-left: auto !important;
    margin-right: auto !important;
  }

  h1.title {
    margin:0;
  }

  div.grid-content {
    min-height: 40px;
    vertical-align: baseline;
  }
</style>
