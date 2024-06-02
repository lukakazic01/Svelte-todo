<script>
  import "./assets/reset.css";
  import "./app.css";
  import NoTodosContainer from "./NoTodosContainer.svelte";
  import TodoForm from "./TodoForm.svelte";
  import TodoList from "./TodoList.svelte";

  let todos = [
    {
      id: 1,
      title: 'Finish Svelte screencast',
      isComplete: false,
      isEditing: false,
    },
    {
      id: 2,
      title: 'Go shopping',
      isComplete: false,
      isEditing: false,
    },
    {
      id: 3,
      title: 'Take over world',
      isComplete: false,
      isEditing: false,
    },
  ]
  let currentFilter = 'all'
  let beforeTitleCache = ''

  const addTodo = (event) => {
    const maxId = Math.max(...todos.reduce((acc, todo) => [...acc, todo.id], []))
    const newTodo = {id: maxId + 1, title: event.detail.todoTitle, isComplete: false, isEditing: false}
    todos = [...todos, newTodo];
  }

  const deleteTodo = (id) => {
    todos = todos.filter((todo) => todo.id !== id)
  }

  const checkAllTodos = () => {
   todos = todos.map((todo) => ({...todo, isComplete: true}))
  }

  const clearCompleted = () => {
    todos = todos.filter((todo) => !todo.isComplete)
  }
  const handleDoneEdit = (e, todo) => {
    if(todo.title.trim().length === 0) todo.title = beforeTitleCache
    if (e.key === 'Enter') leaveEditMode(todo)
    if(e.key === 'Escape') {
      todo.title = beforeTitleCache
      leaveEditMode(todo)
    }
  }

  const handleEdit = (todo) => {
    beforeTitleCache = todo.title
    todos = todos.map((t) => t.id === todo.id ? ({ ...t, isEditing: true }) : t)
  }

  const leaveEditMode = (todo) => todos = todos.map((t) => t.id === todo.id ? ({ ...t, isEditing: false }) : t)

  const applyFilter = (filter) => currentFilter = filter

  $: remainingTodos = todos.filter((todo) => !todo.isComplete).length
  $: remainingTodosText = remainingTodos === 1 ? 'item remaining' : 'items remaining';
  $: filteredTodos = currentFilter === 'all' ? todos : currentFilter === 'completed' ? todos.filter((todo) => todo.isComplete) : todos.filter((todo) => !todo.isComplete)

</script>

<div class="todo-app-container">
  <div class="todo-app">
    <h2>Todo App</h2>
    <TodoForm on:todoAdded={addTodo} />
    {#if todos.length > 0}
      <TodoList
              {filteredTodos}
              {remainingTodos}
              {remainingTodosText}
              {currentFilter}
              on:checkAllTodos={checkAllTodos}
              on:clearCompleted={clearCompleted}
              on:editTodo={(event) => handleEdit(event.detail.todo)}
              on:doneEdit={(event) => handleDoneEdit(event.detail.e, event.detail.todo)}
              on:leaveEditMode={(event) => leaveEditMode(event.detail.todo)}
              on:deleteTodo={(event) => deleteTodo(event.detail.id)}
              on:applyFilter={(event) => applyFilter(event.detail)}
      />
    {:else }
      <NoTodosContainer />
    {/if}
  </div>
</div>