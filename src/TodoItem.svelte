<script>
    import { fade, fly } from 'svelte/transition'
    import { todos } from './stores/TodosStore.js'
    export let todo;
    let beforeTitleCache = ''

    const handleEdit = (todo) => {
      beforeTitleCache = todo.title
      todos.update(allTodos => allTodos.map((t) => t.id === todo.id ? ({ ...t, isEditing: true }) : t))
    }
    const handleDoneEdit = (e, todo) => {
      if(todo.title.trim().length === 0) todo.title = beforeTitleCache
      if (e.key === 'Enter') leaveEditMode(todo)
      if(e.key === 'Escape') {
        todo.title = beforeTitleCache
        leaveEditMode(todo)
      }
    }

    const leaveEditMode = (todo) => {
      todos.update(allTodos => allTodos.map((t) => t.id === todo.id ? ({ ...t, isEditing: false }) : t))
    }

    const deleteTodo = (id) => {
        todos.update(allTodos => allTodos.filter((todo) => todo.id !== id))
    }
</script>

<li class="todo-item-container" in:fly={{ x: 100, duration: 1000 }} out:fade>
  <div class="todo-item">
    <input type="checkbox" bind:checked={todo.isComplete} />
      {#if !todo.isEditing}
        <span
          on:dblclick={() => handleEdit(todo)}
          class="todo-item-label {todo.isComplete && 'line-through'}">
          {todo.title}
        </span>
      {:else }
        <input
          type="text"
          class="todo-item-input"
          bind:value="{todo.title}"
          on:keydown={(e) => handleDoneEdit(e, todo)}
          on:blur={() => leaveEditMode(todo)}
        />
      {/if}
  </div>
  <button class="x-button" on:click={() => deleteTodo(todo.id)}>
    <svg
      class="x-button-icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
</li>