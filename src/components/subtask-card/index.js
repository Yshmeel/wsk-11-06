import React, {useCallback} from 'react'
import styles from './index.module.css'

const SubtaskCard = (props) => {
    const {
        task,
        editable = false,
        onDone,
        onDelete
    } = props;

    const setDone = useCallback(() => {
        onDone(task.id);
    }, [task.id, onDone]);

    const deleteSubtask = useCallback(() => {
        onDelete(task.id);
    }, [task.id]);

    return (
        <div className={styles.root + ' ' + (task.completed ? styles.rootDone : '')}>
            <span className={styles.name + ' ' + (task.completed ? styles.nameDone : '')}>
                {task.name}
            </span>

            <div className={styles.icons}>
                <button type={'button'} className={styles.icon} onClick={setDone}>
                    <span className={'material-icons'}>
                        done
                    </span>
                </button>

                <button type={'button'} className={styles.icon} onClick={deleteSubtask}>
                    <span className={'material-icons'}>
                        close
                    </span>
                </button>
            </div>
        </div>
    )
};

export default SubtaskCard;
