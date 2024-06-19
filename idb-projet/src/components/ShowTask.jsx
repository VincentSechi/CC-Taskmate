const ShowTask = ({tasklist, setTasklist, task, setTask, handleDeleteTask}) => {

    const handleEdit = (id) => {
        const selectedTask = tasklist.find(todo => todo.id === id)
        setTask(selectedTask)
    }

    const handleDelete = (id) => {
        handleDeleteTask(id)
    }
  return (
    <section className="showTask">
        <div className="head">
            <div>
                <span className="title">Todo</span>
                <span className="count">{tasklist && tasklist.length}</span>
            </div>
            <div className="clearAll" onClick={() => setTasklist([])}>
                Clear all
            </div>
        </div>
        <ul>
            {tasklist.map((todo) => {
                return(
                    <li key={todo.id}>
                        <p>
                            <span className="name">{todo.name}</span>
                            <span className="time">{todo.time}</span>
                        </p>
                        <i onClick={() => handleEdit(todo.id)} className="bi bi-pencil-square">Edit</i>
                        <i onClick={() => handleDelete(todo.id)} className="bi bi-trash">Delete</i>
                    </li>
                )
            })}
        </ul>
    </section>
  )
}

export default ShowTask