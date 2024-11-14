"use strict";

import { Clock } from "./clock.js";
import { addAlarm, removeAlarm } from "./function.js";

const digits = document.querySelector(".digits");
const format = document.querySelector(".format");
const formContainer = document.querySelector(".hide");
const alarmBtn = document.querySelector(".alarm-btn");
const alarm = document.querySelector("audio");
const cancelBtn = document.querySelector(".cancel-btn");
const addBtn = document.querySelector(".add-btn");
const hourField = document.querySelector('[for="hour"]');
const minField = document.querySelector('[for="min"]');
const miridian = document.querySelector(".option");
const alarmList = document.querySelector("ul");

let alarms = [];

setInterval(() => {
	const clock1 = new Clock();

	digits.textContent =
		format.value === "12-hours"
			? clock1.get12HoursTime()
			: clock1.getFormattedTime();

	clock1.triggerAlarm(alarms, alarm);
}, 1000);

alarmBtn.addEventListener("click", () =>
	formContainer.classList.remove("hide")
);

cancelBtn.addEventListener("click", () => formContainer.classList.add("hide"));

addBtn.addEventListener("click", () => {
	addAlarm(hourField, minField, miridian, alarmList, alarms);
	formContainer.classList.add("hide");
});

alarmList.addEventListener("click", (e) => {
	if (e.target.nodeName === "BUTTON") {
		const time = removeAlarm(e.target, alarms);
		alarms = alarms.filter((alarm) => alarm !== time);
	}
});
