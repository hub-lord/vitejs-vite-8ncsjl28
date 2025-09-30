import { defineStore } from 'pinia'
import { supabase } from '../api/client'
export const useMainStore = defineStore('counter', {
    state: () => {
        return {
            login: '',
            items: [],
            error: {},
            isAuth: false
        }
    },
    getters: {
        getItems: (s) => s.items,
        getLogin: (s) => s.login ?? '777',
        getAuth: (s) => s.isAuth
    },
    actions: {
        async login(userName) {
            const { } = await supabase
                .from('logs')
                .insert([
                    { log: 'open login ' + userName },
                ])
                .select()

            this.login = userName
            const { data } = await supabase
                .from('admins')
                .select()
                .eq('login', userName)
            if (data[0]) {
                this.isAuth = true
            }
        },
        async fetchOrders() {
            let { data, error } = await supabase
                .from('order_room')
                .select('*')
                .order('num_order', { ascending: false })
            if (error) {
                this.error = error
            }
            if (data) {
                this.items = data
            }
        },
        async refuse(id: string) {
            const { data } = await supabase
                .from('order_room')
                .update({ user_take: '' })
                .eq('id', id)
                .select()
            if (data) {
                const itemToUpdate = this.items.find(item => item.id === data[0].id);
                if (itemToUpdate) {
                    itemToUpdate.user_take = data[0].user_take;
                }
            }
        },
        async saveDescription(id: string, desc: string) {
            const { data } = await supabase
                .from('order_room')
                .update({ description: desc })
                .eq('id', id)
                .select()
            if (data) {
                const itemToUpdate = this.items.find(item => item.id === data[0].id);
                if (itemToUpdate) {
                    itemToUpdate.description = data[0].description;
                }
            }
        },
        async close(id: string) {
            const { data } = await supabase
                .from('order_room')
                .update({ state: 'close' })
                .eq('id', id)
                .select()
            if (data) {
                const itemToUpdate = this.items.find(item => item.id === data[0].id);
                if (itemToUpdate) {
                    itemToUpdate.state = data[0].state;
                }
            }

        },
        async takeToWork(id: string) {
            const { data: select } = await supabase
                .from('order_room')
                .select('*')
                .eq('id', id)

            if (select[0] && select[0].user_take) {
                alert(select[0].user_take)
                return;
            }

            const { data } = await supabase
                .from('order_room')
                .update({ user_take: this.login })
                .eq('id', id)
                .select()
            if (data) {
                const itemToUpdate = this.items.find(item => item.id === data[0].id);
                if (itemToUpdate) {
                    itemToUpdate.user_take = data[0].user_take;
                }
            }
        }
    },
})