import React, {useCallback, useEffect, useMemo, useState} from 'react'
import styles from './index.module.css'
import SubtaskInput from "../subtask-input"
import {getStatusTimeBeforeEnd} from "../../utils/date"
import SubtaskCard from "../subtask-card"

const TodoCard = (props) => {
    const {
        /**
         * @type {{
         *     id: number,
         *     name: string,
         *     datetime: string
         * }}
         */
        task,
        onComplete,
        onCreateSubtask,
        onSubtaskComplete,
        onSubtaskDelete,
        onDelete,
    } = props;

    const [active, setActive] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [confirming, setConfirming] = useState(false);

    const [editable, setEditable] = useState(false);

    useEffect(() => {
        setActive(true);
    }, []);

    const onCreate = useCallback((name) => {
        onCreateSubtask(task.id, name);
    }, [onCreateSubtask, task]);

    const setCompleted = useCallback(() => {
        if(task.subtasks.some((v) => !v.completed)) {
            alert('Вы не можете завершить задачу, пока у вас есть незавершенные подзадачи');
            return;
        }

        setConfirming(true);

        setTimeout(() => {
            onComplete(task.id);
        }, 300);
    }, [task.id]);

    const onSubtaskDone = useCallback((id) => {
        onSubtaskComplete(task.id, id);
    }, [onSubtaskComplete]);

    const deleteSubtask = useCallback((id) => {
        if(window.confirm('Вы точно хотите удалить подзадачу?')) {
            onSubtaskDelete(task.id, id);
        }
    }, [onSubtaskDelete]);

    const onEdit = useCallback(() => {
        setEditable((prev) => !prev);
    }, [setEditable])

    const deleteTask = useCallback(() => {
        if(window.confirm('Вы точно хотите удалить задачу?')) {
            setDeleting(true);

            setTimeout(() => {
                onDelete(task.id);
            }, 300);
        }
    }, [onDelete]);

    const rootClasses = useMemo(() => {
        const classes = [styles.root];

        if(active) {
            classes.push(styles.active);
        }

        if(deleting) {
            classes.push(styles.deleting);
        }

        return classes;
    }, [active, deleting]);

    const status = useMemo(() => {
        return getStatusTimeBeforeEnd(task.datetime);
    }, [task.datetime]);

    const statusText = useMemo(() => {
        switch(status.status) {
            case 'today':
                return 'Сегодня';
            case 'tomorrow':
                return 'Завтра';
            case 'after-tomorrow':
                return 'Послезавтра';
            case 'many-days':
                return `Через ${status.days} дней`;
            case 'expired':
                return `Просрочено`;
        }
    }, [task.datetime]);

    const indicatorClasses = useMemo(() => {
        const classes = [styles.indicator];

        switch(status.status) {
            case 'today':
                classes.push(styles.indicatorToday);
                break;
            case 'tomorrow':
                classes.push(styles.indicatorTomorrow);
                break;
            case 'after-tomorrow':
                classes.push(styles.indicatorAfterTomorrow);
                break;
            case 'many-days':
                classes.push(styles.indicatorManyDays);
                break;
            case 'expired':
                classes.push(styles.indicatorExpired);
                break;
        }

        return classes.join(' ');
    }, [status]);

    const renderedSubtasks = (task.subtasks || []).map((v) => {
        return (
            <SubtaskCard task={v}
                         key={`subtask-${task.id}-${v.id}`}
                         onDone={onSubtaskDone}
                         onDelete={deleteSubtask} />
        );
    });

    return (
        <div className={styles.root + ' ' + (active ? styles.active : '')
        + ' ' + (deleting ? styles.deleting: '')
        + ' ' + (confirming ? styles.confirming: '')}>
            <div className={styles.task}>
                <div className={indicatorClasses}/>

                <div className={styles.info}>
                    <div className={styles.title}>{task.name}</div>
                    <div className={styles.datetime + ' ' + (status.status === 'expired' ? styles.datetimeExpired : '')}>
                        {statusText}
                    </div>
                </div>

                <div className={styles.icons}>
                    <button type={'button'} className={styles.icon} onClick={onEdit}>
                        <span className="material-icons">edit</span>
                    </button>

                    <button type={'button'} className={styles.icon} onClick={setCompleted}>
                        <span className="material-icons">done</span>
                    </button>

                    <button type={'button'} className={styles.icon} onClick={deleteTask}>
                        <span className="material-icons">close</span>
                    </button>
                </div>
            </div>

            <div className={styles.subtasks}>
                {renderedSubtasks}
                {editable && (
                    <SubtaskInput onCreate={onCreate} />
                )}
            </div>
        </div>
    );
};

export default TodoCard;
