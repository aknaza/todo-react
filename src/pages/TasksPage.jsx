import { TasksProvider } from "../context/TasksContext"
import ToDo from "../components/Todo/Todo"

const TasksPage = () => {
    return (
        <TasksProvider>
            <ToDo />
        </TasksProvider>
    )
}

export default TasksPage