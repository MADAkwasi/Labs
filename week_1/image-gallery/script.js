"use strict";
import {
	images,
	renderImages,
	viewImage,
	viewNextImage,
	viewPrevImage,
} from "./functions.js";

const body = document.querySelector("body");
const lightboxContainer = document.querySelector(".lightbox-container");
const closeBtn = document.getElementById("close-btn");
const gallery = document.querySelector(".app-body");
const imageEl = document.querySelector(".image");
const nextBtn = document.querySelector("#right-btn");
const prevBtn = document.querySelector("#left-btn");
const imageTitle = document.querySelector("#image-title");
const imageCaption = document.querySelector("#image-caption");
const imageTracker = document.querySelector("#tracker");

closeBtn.addEventListener("click", () => {
	body.classList.remove("lightbox-opened");
	lightboxContainer.classList.add("hidden");
});

gallery.addEventListener("click", (e) => {
	if (e.target.className === "thumbnail") {
		viewImage(e.target, imageEl, imageTitle, imageCaption, imageTracker);
		lightboxContainer.classList.remove("hidden");
		body.classList.add("lightbox-opened");
	}
});

nextBtn.addEventListener("click", () =>
	viewNextImage(imageEl, imageTitle, imageCaption, imageTracker)
);
prevBtn.addEventListener("click", () =>
	viewPrevImage(imageEl, imageTitle, imageCaption, imageTracker)
);
body.addEventListener("keydown", (e) => {
	if (!lightboxContainer.classList.contains("hidden") && e.key === "ArrowRight")
		viewNextImage(imageEl, imageTitle, imageCaption, imageTracker);
	if (!lightboxContainer.classList.contains("hidden") && e.key === "ArrowLeft")
		viewPrevImage(imageEl, imageTitle, imageCaption, imageTracker);
});

renderImages(gallery, images);
