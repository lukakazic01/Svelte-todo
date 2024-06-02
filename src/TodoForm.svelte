<script>
    import {createEventDispatcher} from "svelte";
    const emit = createEventDispatcher()
    let todoTitle = ''

    const addTodo = () => {
        emit('todoAdded', { todoTitle })
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