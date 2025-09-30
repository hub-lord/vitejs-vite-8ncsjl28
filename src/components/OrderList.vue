<template>
    <a-table :dataSource="getItems" :columns="columns">
        <template #bodyCell="{ column }">
            <template v-if="column.key === 'action'">
                <a-tooltip title="Взять в работу">
                    <a-button type="primary" shape="circle" :icon="h(AimOutlined)" />
                </a-tooltip>
            </template>
        </template>
    </a-table>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from '../store/main'
import { onMounted } from 'vue';
import { ref, h } from 'vue';
import { AimOutlined } from '@ant-design/icons-vue';
const { getItems } = storeToRefs(useCounterStore())
const { fetchOrders } = useCounterStore()
import { useMiniApp } from 'vue-tg'
const miniApp = useMiniApp()
const columns = ref([
    {
        title: '#',
        dataIndex: 'num_order',
        key: 'num_order',
    },
    {
        title: 'Логин',
        dataIndex: 'login',
        key: 'login',
    },
    {
        title: 'Текст',
        dataIndex: 'message',
        key: 'message',
    },
    {
        title: 'Комната',
        dataIndex: 'room',
        key: 'room',
    },
    {
        title: 'Заметки',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Статус',
        dataIndex: 'state',
        key: 'state',
    },
    {
        title: 'Action',
        key: 'action',
    }
])

onMounted(() => {
    console.log(miniApp);
    alert(miniApp.initDataUnsafe)    
    fetchOrders()
})

</script>