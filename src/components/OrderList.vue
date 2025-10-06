<template>
    <a-table :dataSource="getItems" :columns="columns">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'date'">
                {{  str(record.date)  }}
            </template>
            <template v-if="column.key === 'state'">
                <a-tag :color="getStateColor(record.state)">
                    {{ record.state || 'unknown' }}
                </a-tag>
            </template>
            <template v-if="column.key === 'action' && record.state !== 'close'">
                <div style="display: flex; gap: 5px; flex-direction: column;">
                    <a-tooltip v-if="!record.user_take" title="Взять в работу">
                        <a-button @click="takeToWork(record.id)" type="primary">Взять в работу</a-button>
                    </a-tooltip>
                    <a-tooltip v-if="record.user_take === getLogin" title="Отказаться">
                        <a-button @click="refuse(record.id)" dashed type="primary" size="large">Отказаться</a-button>
                    </a-tooltip>
                    <a-tooltip v-if="record.user_take === getLogin" title="Дополнить">
                        <a-button type="dashed" size="large"
                            @click="open = true; currentId = record.id; value = record.description">Дополнить</a-button>
                    </a-tooltip>
                    <a-tooltip v-if="record.user_take === getLogin" title="Закрыть">
                        <a-button @click="close(record.id)" danger type="primary" size="large">Выполнено</a-button>
                    </a-tooltip>
                </div>
            </template>
        </template>
    </a-table>
    <a-modal v-model:open="open" :title="room" @ok="saveDescription(currentId, value); open = false">
        <p>Дополните замекти</p>
        <a-textarea v-model:value="value" placeholder="Заполните" :rows="4" />
    </a-modal>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMainStore } from '../store/main'
import { onMounted } from 'vue';
import { ref } from 'vue';
import { watch } from 'vue';

const { getItems, getLogin } = storeToRefs(useMainStore())
const { fetchOrders, takeToWork, close, saveDescription, refuse } = useMainStore()
const value = ref('')
let open = ref(false)
let currentId = ref()
let room = ref('')

const str = (s:string) => new Date(s).toLocaleString('ru-RU', { timeZone: 'Asia/Novosibirsk' });

function getStateColor(state: string | null) {
    switch (state) {
        case "open": return "green";
        case "close": return "red";
        case "in_progress": return "blue";
        default: return "gray";
    }
}

watch(value, () => console.log(value.value));

const columns = ref([
    {
        title: '#',
        dataIndex: 'num_order',
        key: 'num_order',
    },
    {
        title: 'Дата',
        dataIndex: 'date',
        key: 'date',
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