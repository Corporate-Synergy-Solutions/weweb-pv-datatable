<template>
    <div class="datatable-primevue-wrapper">
        <p v-if="!data.length">No data</p>
        <PVDataTable
            v-else
            :value="data"
            :paginator="paginator"
            :rows="rows"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            :size="size"
            :showGridlines="showGridlines"
            :stripedRows="stripedRows"
        >
            <PVColumn v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></PVColumn>
        </PVDataTable>
    </div>
</template>

<script setup>
import './style.css';
import { watch, ref } from 'vue';
const props = defineProps({
    paginator: {
        type: Boolean,
        default: false,
    },
    showGridlines: {
        type: Boolean,
        default: false,
    },
    stripedRows: {
        type: Boolean,
        default: false,
    },
    size: {
        type: String,
        default: 'normal',
    },
    rows: {
        type: Number,
        default: 5,
    },
    headers: {
        type: String,
        default: '',
    },
    data: {
        type: Array,
        default: () => [],
    },
});
const columns = ref([]);

watch(
    () => [props.headers, props.data],
    () => {
        const cols = [];
        const headers = props.headers.split(',');
        let idx = 0;
        if (!props.data.length) return cols;
        for (const property in props.data[0]) {
            const header = headers[idx] || property;
            cols.push({ field: property, header: capitalizeFirstLetter(header) });
            idx += 1;
        }
        columns.value = cols;
    },
    { immediate: true }
);

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
</script>

<script>
import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import PVDataTable from 'primevue/datatable';
import PVColumn from 'primevue/column';

export default {
    components: {
        PVDataTable,
        PVColumn,
    },
    beforeCreate: function () {
        this.$.appContext.app.use(PrimeVue, { theme: { preset: Aura } });
    },
};
</script>

<style scoped>
.datatable-primevue-wrapper {
    position: relative;
    box-sizing: border-box;
}
</style>
