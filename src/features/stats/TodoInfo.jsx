import { memo, useContext } from "react"
import { TasksContext } from "@/entities/todo/model/TasksContext"
import { useMemo } from "react"

const ToDoInfo = (props) => {
    const { styles } = props;
    const {
        tasks,
        deleteAllTasks,

    } = useContext(TasksContext)

    const total = tasks.length
    const hasTask = total > 0
    const done = useMemo(() => {
        return tasks.filter(({ isDone }) => isDone).length
    }, [tasks])

    return (
        <div className={styles.info}>
            <div className={styles.totalTasks}>
                Done: {done} from {total}
            </div>

            {hasTask && (
                <button
                    className={styles.deleteAllButton}
                    type="button"
                    onClick={deleteAllTasks}
                >
                    Delete all
                </button>
            )}
        </div>
    )
}

export default memo(ToDoInfo)