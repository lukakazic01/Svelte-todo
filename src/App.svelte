<script>
  import "./assets/reset.css";
  import "./app.css";
  import NoTodosContainer from "./NoTodosContainer.svelte";
  import TodoForm from "./TodoForm.svelte";
  import TodoList from "./TodoList.svelte";
  import { todos } from "./stores/TodosStore.js"
  import {onMount} from "svelte";

  onMount(async () => {
    await todos.getAllTodos()
  });
</script>

<div class="todo-app-container">
  <div class="todo-app">
    <h2>Todo App</h2>
    <TodoForm />
    {#if $todos.length > 0}
      <TodoList />
    {:else }
      <NoTodosContainer />
    {/if}
  </div>
</div>