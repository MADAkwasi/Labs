"use strict";

export function renderAlarm(list, alarms) {
	list.innerHTML = "";

	const setAlarms = alarms
		.map((alarm) => `<div><p>${alarm} daily</p> <button>&times;</button></div>`)
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

export function removeAlarm(target, audio) {
	const alarmString = target.previousElementSibling.textContent;

	const time = alarmString.match(/\d{2}:\d{2}:\d{2} [APM]{2}/);

	target.parentElement.remove();
	audio.pause();
	return time[0];
}

export function noActiveAlarms(alarmList) {
	if (alarmList.querySelector("h3") === null) {
		const text = document.createElement("h3");
		text.textContent = "No Active Alarms";

		alarmList.appendChild(text);
	}
}
