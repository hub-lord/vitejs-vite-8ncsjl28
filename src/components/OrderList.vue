<template>
    <a-table :dataSource="getItems" :columns="columns">
        <template #bodyCell="{ column, record  }">
            <template v-if="column.key === 'action'">
                <a-tooltip title="Взять в работу">
                    <a-button @click="takeToWork(record.id)" type="primary" shape="circle" :icon="h(AimOutlined)" />
                </a-tooltip>
            </template>
        </template>
    </a-table>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMainStore } from '../store/main'
import { onMounted } from 'vue';
import { ref, h } from 'vue';
import { AimOutlined } from '@ant-design/icons-vue';
const { getItems } = storeToRefs(useMainStore())
const { fetchOrders, takeToWork } = useMainStore()

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
        title: 'В работе',
        dataIndex: 'user_take',
        key: 'user_take',
    },
    {
        title: 'Action',
        key: 'action',
    }
])

onMounted(() => {    
    fetchOrders()
})

</script>