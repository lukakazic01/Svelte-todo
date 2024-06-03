import { writable } from "svelte/store";

export const todos = writable([])

export const getAllTodos = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1/todos')
        const data = await response.json();
        todos.set(data);
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}