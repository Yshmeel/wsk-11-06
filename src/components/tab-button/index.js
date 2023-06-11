import React from 'react'
import styles from './index.module.css'

const TabButton = (props) => {
    const {
        text,
        active = false,
        onClick
    } = props;

    return (
        <button className={styles.root + ' ' + (active ? styles.active : '')} onClick={onClick}>
            {text}
        </button>
    )
};

export default TabButton;
