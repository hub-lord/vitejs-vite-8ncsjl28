import { defineStore } from 'pinia'
import { supabase } from '../api/client'
export const useCounterStore = defineStore('counter', {
    state: () => {
        return {
            items: [],
            error: {}
        }
    },
    getters: {
        getItems: (s) => s.items
    },
    actions: {
        async fetchOrders() {
            let { data, error } = await supabase
                .from('order_room')
                .select('id')
            if (error) {
                this.error = error
            }
            if (data) {
                this.items = data
            }
        },
    },
})