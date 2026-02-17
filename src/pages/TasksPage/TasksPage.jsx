import { TasksProvider } from "@/entities/todo"
import ToDo from "@/widgets/Todo"

const TasksPage = () => {
    return (
        <TasksProvider>
            <ToDo />
        </TasksProvider>
    )
}

export default TasksPage