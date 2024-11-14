"use strict";
const btn = document.querySelector("button");
const text = document.querySelector("h1");

/// call(), apply() and bind()
const person = {
	name: "Mike",
	age: 50,
	greet(hobby) {
		console.log(
			`Hello, my name is ${this.name} and I am ${this.age} years old and hobby is ${hobby}`
		);
	},
};

const worker = {
	name: "Bob",
	age: 4,
};

// person.greet();
const aboutWorker = person.greet.bind(worker, "playing keyboard");
aboutWorker();

person.greet.apply(worker, ["playing keyboard"]);
person.greet.call(worker, "playing keyboard");

///Event handlers and this

function handleClick() {
	console.log(this.textContent);
}

const clickHandler = () => {
	console.log(this.id);
};

btn.addEventListener("click", handleClick);

btn.addEventListener("click", clickHandler);

///Private Variables

function createCounter() {
	let count = 0;

	return {
		increment: function () {
			count++;
			console.log(this.count);
		},
		getCount: function () {
			return count;
		},
	};
}

const counter = createCounter();

counter.increment();
counter.increment();
counter.increment();
counter.increment();
console.log(counter.getCount());

///Reusable Components

function createTimer(duration, elementId) {
	const intervalId = setInterval(() => {
		elementId.textContent = duration;
		duration--;

		if (duration < 0) {
			clearInterval(intervalId);
			elementId.textContent = 0;
			console.log("Timer expired");
		}
	}, 1000);

	return { startTime: duration, elementId };
}

const remainingTime = createTimer(5, text);

console.log(remainingTime);
