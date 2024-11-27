"use strict";

import { fetchWord } from "./api.js";
import {
	addEventListeners,
	hideNotFoundError,
	hideNullError,
	renderBlock,
	showNullError,
} from "./function.js";

const search = document.querySelector(".search");
const keyword = document.querySelector("h1");
const phoneticsText = document.querySelector(".phonetics");
const audio = document.querySelector("audio");
const playBtn = document.querySelector(".play-btn");
const container = document.querySelector(".definitions-container");
const wordContainer = document.querySelector(".word-container");
const errorTxt = document.querySelector(".error-msg");
const toggleBtn = document.querySelector(".switch");
const fontOptions = document.querySelector("select");
const themeImg = document.querySelector(".theme-image");

search.addEventListener("blur", hideNullError(search));

addEventListeners(document, ["keypress", "click"], async (e) => {
	if (
		search.value.trim() === "" &&
		(e.key === "Enter" || e.target.id === "search-icon")
	) {
		showNullError(search, wordContainer, errorTxt);
		renderBlock(container, []);
		return;
	}

	if (
		(document.activeElement === search && e.key === "Enter") ||
		e.target.id === "search-icon"
	) {
		const word = search.value.trim();
		try {
			const data = await fetchWord(word);
			const { phonetics, word: searchedWord } = data[0];
			const orals = {
				audio: "",
				text: "",
			};

			phonetics.forEach((phonetic) => {
				if (phonetic.audio) orals.audio = phonetic.audio;
				if (phonetic.text) orals.text = phonetic.text;
			});

			if (searchedWord) {
				hideNotFoundError(search, wordContainer);
				keyword.textContent = searchedWord;
				phoneticsText.textContent = orals.text;
				audio.src = orals.audio;
				audio.load();

				errorTxt.classList.add("hide");
				renderBlock(container, data);
			}
		} catch (err) {
			errorTxt.innerHTML = "";
			errorTxt.innerHTML = err.message;
			errorTxt.classList.remove("hide");
			wordContainer.classList.add("hide");
			renderBlock(container, []);
		}
	}
});

playBtn.addEventListener("click", () => audio.play());

playBtn.addEventListener(
	"mouseover",
	() => (playBtn.src = "./assets/images/icon-play-hover.svg")
);

playBtn.addEventListener(
	"mouseout",
	() => (playBtn.src = "./assets/images/icon-play.svg")
);

toggleBtn.addEventListener("change", () => {
	const currentTheme = document.documentElement.getAttribute("data-theme");
	const newTheme = currentTheme === "dark" ? "light" : "dark";

	document.documentElement.setAttribute("data-theme", newTheme);

	newTheme === "dark"
		? (themeImg.src = "./assets/images/icon-moon-copy.svg")
		: (themeImg.src = "./assets/images/icon-moon.svg");
});

fontOptions.addEventListener("change", () => {
	const selectedFont = fontOptions.value;
	document.body.style.fontFamily = selectedFont;
});
