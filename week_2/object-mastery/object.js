"use strict";

const superhero = {
	name: "Hulk",
	secretIdentity: "Bruce Banner",
	powers: ["super strength", "healing factor", "high durability"],
	weakness: "gamma radiations",

	usePower(powerName) {
		this.powers.includes(powerName)
			? console.log(`${this.name} is using his ${powerName}`)
			: console.log(`${this.name} does not have this ability`);
	},

	revealIdentity() {
		console.log(`${this.name}'s secret identity is ${this.secretIdentity}`);
	},
};

export function Superhero(name, secretIdentity, powers, weakness) {
	this.name = name;
	this.secretIdentity = secretIdentity;
	this.powers = [...powers];
	this.weakness = weakness;
}

Superhero.prototype.usePower = function (powerName) {
	this.powers.includes(powerName)
		? console.log(`${this.name} is using his ${powerName}`)
		: console.log(`${this.name} does not have this ability`);
};

Superhero.prototype.revealIdentity = function () {
	console.log(`${this.name}'s secret identity is ${this.secretIdentity}`);
};

export const superheroes = [
	new Superhero(
		"Iron Man",
		"Tony Stark",
		["high tech suits", "nigh infinite resources"],
		"Vulnerable when not suited"
	),
	new Superhero(
		"Captain America",
		"Steve Rogers",
		["high stamina", "super strength", "high agility"],
		"fantastical attacks"
	),
	new Superhero(
		"Sentry",
		"Bob",
		[
			"super strength",
			"flight",
			"super speed",
			"healing factor",
			"high durability",
			"heat vision",
		],
		"none"
	),
	new Superhero(
		"Hulk",
		"Bruce Banner",
		["super strength", "healing factor", "high durability"],
		"gamma radiations"
	),
];

const categorizedHeroes = superheroes.map((hero) => {
	return {
		...hero,
		category: hero.weakness === "none" ? "overpowered" : "grounded",
	};
});
