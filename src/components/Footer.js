export function Footer ({
                            notCompletedCount,
                            filter,
                            setFilter,
                            completedCount,
                            deleteCompleted
}) {

    const handleClick = (e, option) => {
        e.preventDefault()
        setFilter(option);
    }

    return (
    <footer className="footer">
        <span className="todo-count">
          <strong>{notCompletedCount} </strong>
           items left
        </span>
        <ul className="filters">
            <li>
                <a href="/"
                   className={filter === "all" ? "selected" : ""}
                   onClick={(e) => {handleClick(e, "all")}}
                >All
                </a>
            </li>
            <li>
                <a href="/active"
                   className={filter === "active" ? "selected" : ""}
                   onClick={(e) => {handleClick(e, "active")}}
                >Active
                </a>
            </li>
            <li>
                <a href="/completed"
                   className={filter === "completed" ? "selected" : ""}
                   onClick={(e) => {handleClick(e, "completed")}}
                >Completed
                </a>
            </li>
        </ul>
        { completedCount > 0 &&
        (<button
            className="clear-completed"
            onClick={deleteCompleted}
        >Clear completed</button>)}
    </footer>
    )
}


