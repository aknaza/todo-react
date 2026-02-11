
import { memo } from "react"
import TodoItem from "./TodoItem";

const TodoList = (props) => {
    const {
        tasks = [],
        filteredTasks,
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
        onDeleteTaskButtonClick,
        onTaskCompleteChange
    } = props;

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
            ref={task.id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
            onDeleteTaskButtonClick={onDeleteTaskButtonClick}
            onTaskCompleteChange={onTaskCompleteChange}
            {...task}
            />
        ))}
      </ul>
    )
};

export default memo(TodoList);