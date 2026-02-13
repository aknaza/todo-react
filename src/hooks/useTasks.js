import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import useTasksLocalStorage from "./useTasksLocalStorage"

const useTasks = () => {
    const {
        savedTasks,
        saveTasks
    } = useTasksLocalStorage()
    const [tasks, setTasks] = useState(savedTasks ?? [
        { id: 1, title: "kupit", isDone: false },
        { id: 2, title: "cate", isDone: true }
    ]);

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [searchQuery, setSearchQuery] = useState('')

    const newTaskInputRef = useRef(null)


    const deleteAllTasks = useCallback(() => {
        const isConfirmed = confirm('Вы уверены что хотите удалить все задачи?')

        if (isConfirmed) {
            setTasks([])
        }
    }, [])

    const deleteTask = useCallback((taskId) => {
        setTasks(
            tasks.filter((task) => task.id !== taskId)
        )
    }, [tasks])

    const toggleTaskComplete = useCallback((taskId, isDone) => {
        setTasks(
            tasks.map((task) => {
                if (task.id === taskId) {
                    return { ...task, isDone }
                }

                return task
            })
        )
    }, [tasks])

    const addTask = useCallback(() => {

        if (newTaskTitle.trim().length > 0) {
            const newTask = {
                id: crypto.randomUUID() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone: false
            }

            setTasks((prevTasks) => [...prevTasks, newTask])
            setNewTaskTitle('')
            setSearchQuery('')
            newTaskInputRef.current.focus()
        }
    }, [newTaskTitle])

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
        saveTasks(tasks)
    }, [tasks])

    useEffect(() => {
        newTaskInputRef.current.focus()
    }, [])

    const renderCount = useRef(0)

    useEffect(() => {
        renderCount.current++
    })

    const filteredTasks = useMemo(() => {
        const clearSearchQuery = searchQuery.trim().toLowerCase()
        return clearSearchQuery.length > 0
            ? tasks.filter(({ title }) => title.toLowerCase().includes(clearSearchQuery))
            : null
    }, [searchQuery, tasks])

    return {
        tasks,
        filteredTasks,
        deleteTask,
        deleteAllTasks,
        toggleTaskComplete,
        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask
    }
}

export default useTasks