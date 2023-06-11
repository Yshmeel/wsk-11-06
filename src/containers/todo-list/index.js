import React, {useCallback, useContext, useMemo} from 'react'
import TodoCard from "../../components/todo-card"
import styles from './index.module.css'
import AppContext from "../../contexts/app"

const TodoList = (props) => {
    const {
        tasks
    } = props;

    const {
        storage
    } = useContext(AppContext);

    const onCreateSubtask = useCallback((id, name) => {
        storage.addSubtask(id, name);
    }, [storage.addSubtask]);

    const onDelete = useCallback((id) => {
        storage.deleteTask(id);
    }, [storage.deleteTask]);

    const onComplete = useCallback((id) => {
        storage.setTaskCompleted(id, true);
    }, [storage]);

    const onSubtaskComplete = useCallback((id, subtaskID) => {
        storage.setSubtaskCompleted(id, subtaskID, true);
    }, [storage]);

    const onSubtaskDelete = useCallback((id, subtaskID) => {
        storage.deleteSubtask(id, subtaskID);
    }, [storage.deleteSubtask]);

    const renderedTasks = useMemo(() => {
        return tasks.map((task) => {
            return (
                <TodoCard task={task}
                          key={`task-${task.id}`}
                          onComplete={onComplete}
                          onCreateSubtask={onCreateSubtask}
                          onSubtaskComplete={onSubtaskComplete}
                          onSubtaskDelete={onSubtaskDelete}
                          onDelete={onDelete} />
            )
        });
    }, [tasks, onCreateSubtask, onSubtaskDelete, onSubtaskComplete]);

    return (
        <div className={styles.root}>
            {renderedTasks}
        </div>
    )
};

export default TodoList;
