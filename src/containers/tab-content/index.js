import React from 'react'
import styles from './index.module.css'

const TabContent = (props) => {
    const {
        className,
        children
    } = props;

    return (
        <div className={styles.root + ' ' + className}>
            {children}
        </div>
    )
};

export default TabContent;
