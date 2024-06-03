<script>
    import { todos } from './stores/TodosStore.js'
    let todoTitle = ''
    const addTodo = () => {
        todos.update(todos => {
            const maxId = Math.max(...todos.reduce((acc, todo) => [...acc, todo.id], []))
            const newTodo = {id: maxId === -Infinity ? 0 : maxId + 1, title: todoTitle, isComplete: false, isEditing: false}
            todoTitle = ""
            return [...todos, newTodo];
        })
    }

</script>

<form action="#" on:submit|preventDefault={addTodo}>
  <input
    type="text"
    class="todo-input"
    placeholder="What do you need to do?"
    bind:value={todoTitle}
  />
</form>