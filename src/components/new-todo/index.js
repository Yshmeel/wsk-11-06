import React, {useCallback, useContext, useState} from 'react'
import AppContext from "../../contexts/app"
import styles from "./index.module.css"

const NewTodo = () => {
    const {
        storage
    } = useContext(AppContext);

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const [active, setActive] = useState(false);

    const toggleActive = useCallback(() => {
        setActive((prev) => !prev);
    }, [setActive]);

    const createTask = useCallback(() => {
        if(name === '') {
            alert('Введите название задачи');
            return;
        }

        if(date === '') {
            alert('Введите дату выполнения задачи');
            return;
        }

        if(time === '') {
            alert('Введите время выполнения задачи');
            return;
        }

        const splitedDate = date.split('.');
        storage.addTask(name, `${splitedDate[2]}.${splitedDate[1]}.${splitedDate[0]} ${time}`);

        setActive(false);
        setName('');
        setDate('');
        setTime('');
    }, [name, date, time]);

    return (
        <div className={styles.floatingWrapper}>
            <div className={styles.floatingDropdown + ' ' + (active ? styles.active : '')}>
                <div className={styles.input}>
                    <label>Название задачи</label>
                    <input type="text" value={name} placeholder={'Убраться дома'}
                            required={true}
                            onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className={styles.input}>
                    <label>Дата выполнения задачи</label>
                    <input type="date" value={date}
                           required={true}
                           onChange={(e) => setDate(e.target.value)}/>
                </div>
                <div className={styles.input}>
                    <label>Время выполнения задачи</label>
                    <input type="time" value={time}
                           required={true}
                           onChange={(e) => setTime(e.target.value)}/>
                </div>

                <button type={'button'} className={styles.button} onClick={createTask}>
                    Создать
                </button>
            </div>

            <div className={styles.floating} onClick={toggleActive}>
                <span className={'material-icons ' + styles.floatingIcon}>
                    {active ? 'close' : 'add'}
                </span>
            </div>
        </div>
    );
};

export default NewTodo;
