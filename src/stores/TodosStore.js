import { writable } from "svelte/store";

const { set, update, subscribe } = writable([])
export const todos = {
    set,
    update,
    subscribe,
    getAllTodos: async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users/1/todos')
            const data = await response.json();
            set(data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    }
}