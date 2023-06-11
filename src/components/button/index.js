import React from 'react'
import styles from './index.module.css'

const Button = (props) => {
    const {
        type,
        text,
        onClick,
    } = props;

    return (
        <button type={type}
                className={styles.root}
                onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
