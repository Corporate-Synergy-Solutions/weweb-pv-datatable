<template>
    <DataTable
        :key="updateComponent"
        :data="data"
        :paginator="content.paginator"
        :rows="content.rows"
        :size="content.size"
        :showGridlines="content.showGridlines"
        :stripedRows="content.stripedRows"
        :headers="content.headers"
    />
</template>

<script setup>
import DataTable from './datatable/PrimevueDatatable.vue';
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
    content: { type: Object, required: true },
});

const dummy = [
    { attr: 'attr1', product: 'product1', cat: 'cat1', qty: 'qty1' },
    { attr: 'attr2', product: 'product2', cat: 'cat2', qty: 'qty2' },
    { attr: 'attr3', product: 'product3', cat: 'cat3', qty: 'qty3' },
    { attr: 'attr4', product: 'product4', cat: 'cat4', qty: 'qty4' },
    { attr: 'attr5', product: 'product5', cat: 'cat5', qty: 'qty5a' },
];

const updateComponent = ref(0);
watch(
    () => props.content,
    () => {
        updateValueDatatable();
        updateComponent.value += 1;
    },
    { deep: true }
);

const data = ref([]);
onMounted(() => {
    updateValueDatatable();
});

function updateValueDatatable() {
    if (props.content.idComponentBind) {
        data.value = wwLib.wwVariable.getValue(props.content.idComponentBind);
    }
}
</script>
