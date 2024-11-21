"use strict";

import { renderElements, simulateBattle } from "./functions.js";
import { superheroes } from "./object.js";

const select1 = document.querySelector(".select-1");
const select2 = document.querySelector(".select-2");
const character1 = document.querySelector(".character-1");
const character2 = document.querySelector(".character-2");
const btn = document.querySelector("button");
const outcome = document.querySelector("h4");
let initial1 = true;
let initial2 = true;

select1.addEventListener("change", () => {
	character1.textContent = select1.value;

	const options = superheroes.filter((option) => option.name !== select1.value);

	renderElements(select2, options, initial2, character2.textContent);
	initial2 = false;
});

select2.addEventListener("change", () => {
	character2.textContent = select2.value;

	const options = superheroes.filter((option) => option.name !== select2.value);

	renderElements(select1, options, initial1, character1.textContent);
	initial1 = false;
});

btn.addEventListener("click", () => {
	if (character1.textContent === "- -" || character2.textContent === "- -") {
		alert("Select characters for battle");
		return;
	}

	simulateBattle(outcome, character1, character2);
});

renderElements(select1, superheroes, true);
renderElements(select2, superheroes, true);
