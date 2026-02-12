
import { memo } from "react"
import TodoItem from "./TodoItem";
import { useContext } from "react"
import { TasksContext } from "../context/TasksContext"

const TodoList = () => {
    const {
            tasks,
            filteredTasks,
    
        } = useContext(TasksContext)
        

    const hasTask = tasks.length > 0
    const isEmptyFilteredTasks = filteredTasks?.length === 0

    if (!hasTask) {
        return <div className="todo__empty-message">There are no tasks</div>
    }

    if (hasTask && isEmptyFilteredTasks) {
        return <div className="todo__empty-message">Tasks not found</div>
    }

    return(
        <ul className="todo__list">
        {(filteredTasks ?? tasks).map((task) => (
            <TodoItem
            className="todo__item"
            key={task.id}
            {...task}
            />
        ))}
      </ul>
    )
};

export default memo(TodoList);