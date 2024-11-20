"use strict";

import { fetchWord } from "./api.js";
import {
	hideNotFoundError,
	hideNullError,
	renderBlock,
	showNotFoundError,
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

document.addEventListener("keypress", async (e) => {
	if (search.value.trim() === "" && e.key === "Enter") {
		showNullError(search, wordContainer, errorTxt);
		renderBlock(container, [], []);
		return;
	}

	if (document.activeElement === search && e.key === "Enter") {
		const word = search.value.trim();
		try {
			const data = await fetchWord(word);
			const { phonetics, word: searchedWord } = data[0];

			const { audio: audioLink, text } = phonetics.find(
				(phonetic) => phonetic.audio && phonetic.text
			);

			if (searchedWord) {
				hideNotFoundError(search, wordContainer);
				keyword.textContent = searchedWord;
				phoneticsText.textContent = text;
				audio.src = audioLink;
				audio.load();

				errorTxt.classList.add("hide");
				renderBlock(container, data);
			}
		} catch (err) {
			showNotFoundError(search, wordContainer, errorTxt);
			renderBlock(container, [], []);
		}
	}
});

playBtn.addEventListener("click", () => audio.play());

playBtn.addEventListener(
	"mouseover",
	() => (playBtn.src = "../../assets/images/icon-play-hover.svg")
);

playBtn.addEventListener(
	"mouseout",
	() => (playBtn.src = "../../assets/images/icon-play.svg")
);

toggleBtn.addEventListener("change", () => {
	const currentTheme = document.documentElement.getAttribute("data-theme");
	const newTheme = currentTheme === "dark" ? "light" : "dark";

	document.documentElement.setAttribute("data-theme", newTheme);

	newTheme === "dark"
		? (themeImg.src = "../../assets/images/icon-moon-copy.svg")
		: (themeImg.src = "../../assets/images/icon-moon.svg");
});

fontOptions.addEventListener("change", () => {
	const selectedFont = fontOptions.value;
	document.body.style.fontFamily = selectedFont;
});
