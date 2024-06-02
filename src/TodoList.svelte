<script>
    import { fly } from 'svelte/transition'
    import {createEventDispatcher} from "svelte";
    import TodoItem from "./TodoItem.svelte";

    export let filteredTodos;
    export let remainingTodos;
    export let currentFilter;
    export let remainingTodosText;

    const emit = createEventDispatcher();
    const checkAllTodos = () => {
        emit('checkAllTodos')
    }
    const clearCompleted = () => {
        emit('clearCompleted')
    }
</script>

<div>
  <ul class="todo-list">
    {#each filteredTodos as todo (todo.id)}
      <TodoItem {todo} on:deleteTodo on:doneEdit on:leaveEditMode on:editTodo />
    {/each}
  </ul>
  <div class="check-all-container">
    <div>
      <button class="button" on:click={checkAllTodos}>Check All</button>
    </div>
      {#key remainingTodos}
        <span in:fly={{ y: -10 }}>{remainingTodos} {remainingTodosText}</span>
      {/key}
    </div>
  <div class="other-buttons-container">
    <div>
      <button
        on:click={() => emit('applyFilter', 'all')}
        class="button filter-button"
        class:filter-button-active={currentFilter === 'all'}>
        All
      </button>
      <button
        on:click={() => emit('applyFilter', 'active')}
        class="button filter-button"
        class:filter-button-active={currentFilter === 'active'}>
        Active
      </button>
      <button
        on:click={() => emit('applyFilter', 'completed')}
        class="button filter-button"
        class:filter-button-active={currentFilter === 'completed'}>
        Completed
      </button>
    </div>
    <div>
      <button class="button" on:click={clearCompleted}>Clear completed</button>
    </div>
  </div>
</div>