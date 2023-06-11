import localStorageService from "../../services/localStorage"

const TASKS_STORAGE_KEY = '@tasks';

const tasksStorage = (tasks, setTasks) => {
    /**
     * @returns {Array<{
     *     id: number,
     *     name: string,
     *     datetime: string,
     *     completed: bool,
     *     subtasks: Array<{
     *         id: number,
     *         name: string,
     *         completed: bool,
     *     }>,
     * }>}
     */
    const getTasksFromStorage = () => {
        return localStorageService.getJSON(TASKS_STORAGE_KEY);
    };

    const saveTasksToStorage = () => {
        return localStorageService.setJSON(TASKS_STORAGE_KEY, tasks);
    };

    const editTaskInState = (id, task) => {
        setTasks((prev) => {
            return prev.map((v) => v.id === id ? task : v);
        });
    };

    const addTask = (name, datetime) => {
        const task = {
            id: Date.now(),
            name,
            datetime,
            completed: false,
            subtasks: [],
        };

        setTasks((prev) => [...prev, task]);
        return task;
    };

    /**
     * @param id - parent id
     * @param name - subtask name
     */
    const addSubtask = (id, name) => {
        const task = tasks.find((t) => t.id === id);

        if(!task) {
            console.error('Failed to find task with ID: ' + id);
            return;
        }

        if(!task.subtasks) {
            task.subtasks = [];
        }

        task.subtasks.push({
            id: Date.now(),
            name,
            completed: false,
        });

        editTaskInState(id, task);
    };

    const setTaskCompleted = (id, status) => {
        const task = tasks.find((t) => t.id === id);

        if(!task) {
            console.error('Failed to find task with ID: ' + id);
            return;
        }

        task.completed = status;
        editTaskInState(id, task);
    };

    const setSubtaskCompleted = (id, subtaskID, status) => {
        const task = tasks.find((t) => t.id === id);

        if(!task) {
            console.error('Failed to find task with ID: ' + id);
            return;
        }

        const subtask = task.subtasks.find((v) => v.id === subtaskID);

        if(!subtask) {
            console.error('Failed to find subtask with ID: ' + id);
            return;
        }

        subtask.completed = status;
        editTaskInState(id, task);
    };

    const editTask = (id, name, datetime) => {
        const task = tasks.find((t) => t.id === id);

        if(!task) {
            console.error('Failed to find task with ID: ' + id);
            return;
        }

        task.name = name;
        task.datetime = datetime;

        editTaskInState(id, task);
    };

    const deleteTask = (id) => {
        const task = tasks.find((t) => t.id === id);

        if(!task) {
            console.error('Failed to find task with ID: ' + id);
            return;
        }

        setTasks((prev) => {
            return prev.filter((v) => v.id !== id);
        });
    };

    const deleteSubtask = (id, subtaskID) => {
        const task = tasks.find((t) => t.id === id);

        if(!task) {
            console.error('Failed to find task with ID: ' + id);
            return;
        }

        task.subtasks = task.subtasks.filter((v) => v.id !== subtaskID);
        editTaskInState(id, task);
    };

    return {
        getTasksFromStorage,
        saveTasksToStorage,
        addTask,
        addSubtask,
        editTask,
        deleteTask,
        deleteSubtask,
        setTaskCompleted,
        setSubtaskCompleted,
    }
};

export default tasksStorage;
