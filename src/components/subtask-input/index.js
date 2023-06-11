import React, {useCallback, useEffect, useState} from 'react'
import styles from './index.module.css'

const SubtaskInput = (props) => {
    const {
        onCreate
    } = props;

    const [name, setName] = useState('');

    const onChangeValue = useCallback((e) => {
        setName(e.target.value);
    }, [setName]);

    const onKeyUp = useCallback((e) => {
        if(e.key === 'Enter') {
            // avoid empty value and value with spaces only
            if(name.trim().length === 0) {
                return;
            }

            onCreate(name);
            setName('');
        }
    }, [name, onCreate]);

    return (
        <div className={styles.root}>
            <input type={'text'}
                   value={name}
                   placeholder={'Введите название подзадачи'}
                   className={styles.input}
                   onChange={onChangeValue}
                   onKeyUp={onKeyUp} />

            <span className={styles.hint}>Нажмите Enter или Ввод для создания подзадачи</span>
        </div>
    )
};

export default SubtaskInput;
