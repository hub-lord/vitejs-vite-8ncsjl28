<template>    
  <a-table :dataSource="getItems" :columns="columns" />
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from '../store/main'
import { onMounted } from 'vue';
import { ref } from 'vue';
const { getItems } = storeToRefs(useCounterStore())
const { fetchOrders } = useCounterStore()

const columns = ref( [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
          },
          {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
          },
        ])

onMounted(() => {
    fetchOrders()
})

</script>