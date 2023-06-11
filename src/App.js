import React, {useCallback, useEffect, useState} from 'react'
import tasksStorage from "./features/todo-storage"
import AppContext from "./contexts/app"
import ConfirmationAlert from "./containers/confirmation-alert"
import TasksScreen from "./screens/tasks"
import './index.css'

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const [activeTab, setActiveTab] = useState('active');

    const [alertShown, setAlertShown] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertDescription, setAlertDescription] = useState('');
    const [alertOKHandler, setAlertOKHandler] = useState(null);

    const [screen, setScreen] = useState('');
    const [manageActiveTask, setManageActiveTask] = useState(null);

    const storage = tasksStorage(tasks, setTasks);

    const showAlert = useCallback((title, description, handler) => {
        setAlertTitle(title);
        setAlertDescription(description);
        setAlertOKHandler(handler);
        setAlertShown(true);
    }, [setAlertShown, setAlertOKHandler, setAlertTitle, setAlertDescription]);

    const hideAlert = useCallback(() => {
        setAlertShown(false);
    }, [setAlertShown, setAlertOKHandler, setAlertTitle, setAlertDescription]);

    useEffect(() => {
        setTasks(storage.getTasksFromStorage());
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        storage.saveTasksToStorage();
    }, [tasks]);

    const contextValue = {
        tasks,
        filterValue,
        activeTab,
        storage,
        setActiveTab,
        manageActiveTask,
        setManageActiveTask,
        setFilterValue
    };

    return (
        <AppContext.Provider value={contextValue}>
            <TasksScreen />

            <ConfirmationAlert
                shown={alertShown}
                title={alertTitle}
                description={alertDescription}
                okHandler={alertOKHandler}
                onClose={hideAlert} />
        </AppContext.Provider>
    )
};

export default App;
