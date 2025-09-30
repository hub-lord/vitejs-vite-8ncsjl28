import { defineStore } from 'pinia'
import { supabase } from '../api/client'
export const useMainStore = defineStore('counter', {
    state: () => {
        return {
            login: '',
            items: [],
            error: {}
        }
    },
    getters: {
        getItems: (s) => s.items,
        getLogin: (s) => s.login
    },
    actions: {
        async login(userName) {
            this.login = userName
        },
        async fetchOrders() {
            let { data, error } = await supabase
                .from('order_room')
                .select('*')
            if (error) {
                this.error = error
            }
            if (data) {
                this.items = data
            }
        },
        async takeToWork(id: string) {

        }
    },
})