import React, {useCallback, useContext, useMemo} from 'react'
import AppContext from "../../contexts/app"
import TabButton from "../../components/tab-button"
import styles from './index.module.css'
import TodoList from "../todo-list"
import TabContent from "../tab-content"
import NewTodo from "../../components/new-todo"

const Tabs = () => {
    const {
        activeTab,
        filterValue,
        tasks,
        setActiveTab,
        setFilterValue
    } = useContext(AppContext);

    const toggleActiveTab = useCallback(() => {
        setActiveTab('active');
    }, [setActiveTab]);

    const toggleCompletedTab = useCallback(() => {
        setActiveTab('completed');
    }, [setActiveTab]);

    const activeTasks = useMemo(() => {
        return tasks.filter((v) => !v.completed);
    }, [tasks]);

    const completedTasks = useMemo(() => {
        return tasks.filter((v) => v.completed);
    }, [tasks]);

    return (
        <div className={styles.root}>
            <div className={styles.buttons}>
                <TabButton text={'Активные'}
                           active={activeTab === 'active'}
                           onClick={toggleActiveTab} />
                <TabButton text={'Выполненные'}
                           active={activeTab === 'completed'}
                           onClick={toggleCompletedTab} />
            </div>

            <div className={styles.filter}>
                <input type="text" placeholder={'Поиск по задачам'}
                       value={filterValue}
                       onChange={(e) => setFilterValue(e.target.value)}/>
            </div>

            <div className={styles.tabs}>
                {activeTab === 'active' && (
                    <TabContent className={styles.tab}>
                        <TodoList tasks={activeTasks} />
                    </TabContent>
                )}

                {activeTab === 'completed' && (
                    <TabContent className={styles.tab}>
                        <TodoList tasks={completedTasks} />
                    </TabContent>
                )}
            </div>

            <NewTodo />
        </div>
    )
};

export default Tabs;
