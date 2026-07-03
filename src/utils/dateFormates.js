import _ from "lodash";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const dateFormatToEnglish = (date) => {
    if(date.length < 10){
        return "";
    }
    const day = date.substring(0, 2);
    const month = date.substring(3, 5);
    const year = date.substring(6, 10);
    return year + "-" + month + "-" + day;
}
export const dateFormatToSpanish = (date) => {
    if(_.isNil(date)){
        return "";
    }
    if(date.length < 10){
        return "";
    }
    const year = date.substring(0, 4);
    const month = date.substring(5, 7);
    const day = date.substring(8, 10);
    return day + "-" + month + "-" + year;
}
export const dateFormatToSpanishV2 = (date) => {
    if(date.length < 10){
        return "";
    }
    const year = date.substring(0, 4);
    const month = date.substring(5, 7);
    const day = date.substring(8, 10);
    return day + "/" + month + "/" + year;
}

export const formatDateComplete = (isoDate) => {
    const formattedDate = dayjs(isoDate).format('DD/MM/YYYY hh:mm A');
    return formattedDate;
};