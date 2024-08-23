<template>
    <div class="datatable-primevue-wrapper">
        <p v-if="!data.length">No data</p>
        <PVDataTable
            v-else
            :key="updateComponent"
            :value="data"
            :paginator="content.paginator"
            :rows="content.rows"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            :size="content.size"
            :showGridlines="content.showGridlines"
            :stripedRows="content.stripedRows"
        >
            <PVColumn v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></PVColumn>
        </PVDataTable>
    </div>
</template>

<script>
import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import PVDataTable from 'primevue/datatable';
import PVColumn from 'primevue/column';

export default {
    props: {
        content: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            columns: [],
            data: [],
        };
    },
    beforeCreate() {
        this.$.appContext.app.use(PrimeVue, { theme: { preset: Aura } });
        this.$.appContext.app.component('PVDataTable', PVDataTable);
        this.$.appContext.app.component('PVColumn', PVColumn);
    },
    computed: {
        headersAndValue() {
            return [this.content.headers, this.data];
        },
    },
    watch: {
        headersAndValue: {
            handler() {
                this.updateColumns();
            },
            deep: true,
            immediate: true,
        },
        content: {
            handler() {
                if (this.content.idComponentBind) {
                    this.data = wwLib.wwVariable.getValue(this.content.idComponentBind);
                }
                this.updateComponent += 1;
            },
            deep: true,
            immediate: true,
        },
    },
    methods: {
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        updateColumns() {
            const cols = [];
            const headers = this.content.headers.split(',');
            let idx = 0;
            if (!this.data.length) return cols;
            for (const property in this.data[0]) {
                const header = headers[idx] || property;
                cols.push({ field: property, header: this.capitalizeFirstLetter(header) });
                idx += 1;
            }
            this.columns = cols;
        },
    },
};
</script>

<style scoped>
.datatable-primevue-wrapper {
    position: relative;
    box-sizing: border-box;
}
</style>
