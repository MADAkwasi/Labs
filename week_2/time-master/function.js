"use strict";

export function renderAlarm(list, alarms) {
	list.innerHTML = "";

	const setAlarms = alarms
		.map(
			(alarm) =>
				`
		<div><p>Alarm set to ${alarm} daily</p> <button>&times;</button></div>
		`
		)
		.join("");

	list.insertAdjacentHTML("beforeEnd", setAlarms);
}

export function addAlarm(hourField, minField, miridian, alarmList, alarms) {
	const hoursHand = hourField.value;
	const minutesHand = minField.value;

	const newAlarm = `${hoursHand.toString().padStart(2, 0)}:${minutesHand
		.toString()
		.padStart(2, 0)}:00 ${miridian.value}`;

	alarms.push(newAlarm);

	renderAlarm(alarmList, alarms);

	hourField.value = null;
	minField.value = null;
}

export function removeAlarm(target, alarms) {
	const alarmString = target.previousElementSibling.textContent;

	const time = alarmString.match(/\d{2}:\d{2}:\d{2} [APM]{2}/);

	target.parentElement.remove();
	return time[0];
}
