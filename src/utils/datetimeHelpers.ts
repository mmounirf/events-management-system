import * as dayjs from "dayjs";
import { default as dayjsIsToday } from "dayjs/plugin/isToday";
import relativeTime from "dayjs/plugin/relativeTime";

export function getDateTime(datetimeString: string) {
	const datetime = dayjs(datetimeString);
	const year = datetime.format("YYYY");
	const month = datetime.format("MMM");
	const dayOfMonth = datetime.format("DD");
	const dayOfWeek = datetime.format("ddd");
	const hour = datetime.format("hh");
	const minute = datetime.format("mm");
	const ampm = datetime.format("A");

	const fullDate = datetime.format("ddd. DD MMM YYYY - hh:mmA");

	return { year, month, dayOfMonth, dayOfWeek, hour, minute, ampm, fullDate };
}

export function getDiff(firstDate: string, secondDate: string) {
	const firstDateTime = dayjs(firstDate);
	const secondDateTime = dayjs(secondDate);

	return firstDateTime.diff(secondDateTime, "d");
}

export function timeFromNow(date: string) {
	dayjs.extend(relativeTime);
	const dateTime = dayjs(date);

	return dateTime.fromNow();
}

export function isSameDay(date: Date | string | dayjs.Dayjs) {
	dayjs.extend(dayjsIsToday);
	return dayjs(date).isToday();
}
