import React, {useEffect, useState} from 'react'
import './DateAndTime.scss'

const DateAndTime = ({}: any) => {

    const [localInterval, setLocalInterval] = useState(null);

    const getDateTimeStringFromData = (date: Date): string => {
        let dateTimeString = date.getDate() + '.' +
            date.getMonth() + '.' +
            date.getFullYear() + ' ' +
            date.getHours() + '.' +
            date.getMinutes() + '.';

        let seconds = date.getSeconds();
        let stringSeconds = seconds + '';
        if (seconds < 10) {
            stringSeconds = '0' + seconds;
        }
        dateTimeString += stringSeconds;

        return dateTimeString;
    };

    const initDateTimeString = getDateTimeStringFromData(new Date());

    const [dateTimeString, setDateTimeString] = useState(initDateTimeString);

    const interval1 = setInterval(() => {
        const dateTimeString = getDateTimeStringFromData(new Date);
        setDateTimeString(dateTimeString);
    }, 1000);
    // setLocalInterval(interval1);

    // useEffect(() => {
    //     return () => {
    //         clearInterval(localInterval);
    //     }
    // }, []);

    return <div className={'datetime_string'}>
        {dateTimeString}
    </div>
};

export default DateAndTime;