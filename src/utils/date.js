/**
 * @param datetime - format: 2023-06-11
 */
const isDateExpired = (datetime) => {
    const date = new Date(datetime);
    const now = new Date();

    return now.getTime() > date.getTime();
};

const getStatusTimeBeforeEnd = (datetime) => {
    const date = new Date(datetime);
    const now = new Date();

    if(isDateExpired(datetime)) {
        return {
            status: 'expired',
        };
    }

    let days = 0;

    const daysRelative = date.getDay() - now.getDay();
    const monthsRelative = date.getMonth() - now.getMonth();

    if(monthsRelative >= 1) {
        // @todo учитывать изменения количества дней в месяцах
        days += monthsRelative * 30;
    }

    if(daysRelative >= 0) {
        days += daysRelative;
    }

    // routine to check days before end
    switch(days) {
        case 0:
            return {
                status: 'today'
            };
        case 1:
            return {
                status: 'tomorrow'
            };
        case 2:
            return {
                status: 'after-tomorrow'
            };
        default:
            return {
                status: 'many-days',
                days
            };
    }
};

export {
    isDateExpired,
    getStatusTimeBeforeEnd
};
