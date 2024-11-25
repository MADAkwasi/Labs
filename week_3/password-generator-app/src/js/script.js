"use strict";
import { Password } from "./password.js";

const generateBtn = document.querySelector(".generate-btn");
const strengthIndicators = document.getElementsByClassName("bar");
const inputField = document.querySelector(".app");
const strength = document.querySelector(".strength");
const slider = document.querySelector("#length-slider");
const passwordLengthDisplay = document.querySelector(".string-length");
const password = document.querySelector(".password");
const copyBtn = document.querySelector(".copy-icon");
const isCopied = document.querySelector(".copy-text");
const errorMsg = document.querySelector(".error-msg");
const toast = document.querySelector('[data-role="toast"]');
const copyIcon = document.querySelector(".copy-icon");

let includesLowercase = false;
let includesUppercase = false;
let includesNum = false;
let includesSymbols = false;
let passwordLength = 0;
let newPassword;

generateBtn.addEventListener("mouseover", () => {
	generateBtn.children[0].src = "assets/images/icon-arrow-right-copy.svg";
});
generateBtn.addEventListener("mouseout", () => {
	generateBtn.children[0].src = "assets/images/icon-arrow-right.svg";
});

copyIcon.addEventListener("mouseover", () => {
	copyIcon.src = "assets/images/icon-copy-copy.svg";
});
copyIcon.addEventListener("mouseout", () => {
	copyIcon.src = "assets/images/icon-copy.svg";
});

inputField.addEventListener("click", (e) => {
	if (e.target && e.target.type === "checkbox") {
		const id = e.target.id;

		includesUppercase =
			id === "uppercase-checkbox" ? e.target.checked : includesUppercase;
		includesLowercase =
			id === "lowercase-checkbox" ? e.target.checked : includesLowercase;
		includesNum = id === "numbers-checkbox" ? e.target.checked : includesNum;
		includesSymbols =
			id === "symbols-checkbox" ? e.target.checked : includesSymbols;

		updateStrengthIndicator();
	}
});

slider.addEventListener("change", () => {
	passwordLength = parseInt(slider.value, 10);
	passwordLengthDisplay.textContent = slider.value;
	updateStrengthIndicator();
});

generateBtn.addEventListener("click", () => {
	newPassword = new Password(
		passwordLength,
		includesUppercase,
		includesLowercase,
		includesNum,
		includesSymbols
	);

	try {
		const generatedPassword = newPassword.generateRandomString();
		password.textContent = generatedPassword;
		password.style.color = "#e6e5ea";
		isCopied.classList.add("hide");
	} catch (err) {
		errorMsg.textContent = err.message;
		toast.classList.add("toast");
		toast.classList.remove("hide");

		setTimeout(() => {
			toast.classList.remove("toast");
			toast.classList.add("hide");
		}, 4000);
	}
});

copyBtn.addEventListener("click", () => {
	const textToCopy = password.textContent;

	if (textToCopy) {
		navigator.clipboard.writeText(textToCopy).then(() => {
			isCopied.classList.remove("hide");
		});
	}
});

slider.addEventListener("input", () => {
	const progress = (slider.value / slider.max) * 100 + "%";
	slider.style.setProperty("--progress", progress);
});

////////////////////////////////

function updateStrengthIndicator() {
	const typesCount = [
		includesUppercase,
		includesLowercase,
		includesNum,
		includesSymbols,
	].filter(Boolean).length;

	[...strengthIndicators].forEach((bar) => {
		bar.style.backgroundColor = "transparent";
		bar.style.border = "1px solid #ccc";
	});

	if (passwordLength >= 8 && typesCount >= 3) {
		[...strengthIndicators].forEach((bar) => {
			bar.style.backgroundColor = "#a4ffaf";
			bar.style.border = "none";
		});
		strength.textContent = "STRONG";
	} else if (passwordLength >= 8 && typesCount === 2) {
		[...strengthIndicators].forEach((bar, i) => {
			if (i <= 2) {
				bar.style.backgroundColor = "#f8cd65";
				bar.style.border = "none";
			}
		});
		strength.textContent = "MEDIUM";
	} else if (passwordLength >= 8 && typesCount === 1) {
		[...strengthIndicators].forEach((bar, i) => {
			if (i <= 1) {
				bar.style.backgroundColor = "#fb7c58";
				bar.style.border = "none";
			}
		});
		strength.textContent = "WEAK";
	} else if (passwordLength < 8) {
		strengthIndicators[0].style.backgroundColor = "#f64a4a";
		strengthIndicators[0].style.border = "none";
		strength.textContent = "TOO WEAK!";
	} else {
		strength.textContent = "";
	}
}
