export function Clock() {
	const time = new Date();
	this.hours = time.getHours();
	this.minutes = time.getMinutes();
	this.seconds = time.getSeconds();

	this.getFormattedTime = function () {
		return `${this.hours.toString().padStart(2, "0")}:${this.minutes
			.toString()
			.padStart(2, "0")}:${this.seconds.toString().padStart(2, "0")}`;
	};

	this.get12HoursTime = function () {
		const formattedHours = this.hours % 12 || 0;
		const miridian = this.hours >= 12 ? "PM" : "AM";

		return `${formattedHours.toString().padStart(2, "0")}:${this.minutes
			.toString()
			.padStart(2, "0")}:${this.seconds
			.toString()
			.padStart(2, "0")} ${miridian}`;
	};

	this.triggerAlarm = function (alarms, audio) {
		let triggeredAlarm;
		alarms.forEach((time) => {
			if (time === this.get12HoursTime() || time === this.getFormattedTime()) {
				audio.play();
				triggeredAlarm = time;
			}
		});
		setTimeout(() => {
			if (alarms.includes(triggeredAlarm)) audio.play();
		}, 60000);
	};
}
