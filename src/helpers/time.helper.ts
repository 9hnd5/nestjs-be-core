import { endOfQuarter, getQuarter, startOfQuarter, startOfMonth, endOfMonth, compareDesc } from 'date-fns';
export class TimeHelper {
    public static getQuarterOfYear = (date: Date) => getQuarter(date);

    public static firstDateOfQuarter = (date: Date) => startOfQuarter(date);

    public static lastDateOfQuarter = (date: Date) => endOfQuarter(date);

    public static firstDateOfMonth = (date: Date) => startOfMonth(date);

    public static lastDateOfMonth = (date: Date) => endOfMonth(date);

    public static calculateBusinessDay = (firstDate: Date, lastDate: Date) => {
        if (compareDesc(firstDate, lastDate)) {
            return -1;
        }
    };
}

const date = new Date('2022-01-15');
console.log(TimeHelper.firstDateOfQuarter(date).getDate());
