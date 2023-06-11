import React, {useEffect, useMemo, useState} from 'react'
import styles from './index.module.css'

const ANIMATION_DURATION = 300;

const ConfirmationAlert = (props) => {
    const {
        shown,
        title,
        description,
        okHandler
    } = props;

    const [animationState, setAnimationState] = useState(null);

    useEffect(() => {
        if(!shown) {
            setAnimationState('disappearing');

            setTimeout(() => {
                setAnimationState('disappear');
            }, ANIMATION_DURATION);
        } else {
            setAnimationState('activating');

            setTimeout(() => {
                setAnimationState('active');
            }, ANIMATION_DURATION);
        }
    }, [shown]);

    const rootStyles = useMemo(() => {
        let classes = [styles.root];

        switch(animationState) {
            case 'disappearing':
                classes.push(styles.disappearing);
                break;
            case 'disappear':
                classes.push(styles.disappear);
                break;
            case 'activating':
                classes.push(styles.activating);
                break;
            case 'active':
                classes.push(styles.active);
                break;
        }

        return classes.join(' ');
    }, [animationState]);

    return (
        <div className={rootStyles}>

        </div>
    )
};

export default ConfirmationAlert;
