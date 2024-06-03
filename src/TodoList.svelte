<script>
  import {fly} from 'svelte/transition'
  import TodoItem from "./TodoItem.svelte";
  import {todos} from "./stores/TodosStore.js"

  let currentFilter = 'all'

    $: remainingTodos = $todos.filter((todo) => !todo.isComplete).length
    $: remainingTodosText = remainingTodos === 1 ? 'item remaining' : 'items remaining';
    $: filteredTodos = currentFilter === 'all' ? $todos : currentFilter === 'completed' ? $todos.filter((todo) => todo.isComplete) : $todos.filter((todo) => !todo.isComplete)

    const checkAllTodos = () => {
      todos.update(allTodos =>  allTodos.map((todo) => ({...todo, isComplete: true})))
    }
    const clearCompleted = () => {
      todos.update(allTodos => allTodos.filter((todo) => !todo.isComplete))
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
        on:click={() => currentFilter = 'all'}
        class="button filter-button"
        class:filter-button-active={currentFilter === 'all'}>
        All
      </button>
      <button
        on:click={() => currentFilter = 'active'}
        class="button filter-button"
        class:filter-button-active={currentFilter === 'active'}>
        Active
      </button>
      <button
        on:click={() => currentFilter = 'completed'}
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