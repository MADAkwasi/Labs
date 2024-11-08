export const images = [
	{
		title: "Image 1",
		caption: "I like these headphones😁",
		src: "./images/hero.jpg",
	},
	{
		title: "Image 2",
		caption: "It's about to get loud🔥",
		src: "./images/hero-1.avif",
	},
	{
		title: "Image 3",
		caption: "Building the collection💪",
		src: "./images/hero-2.webp",
	},
	{
		title: "Image 4",
		caption: "Let's call it a wrap😪",
		src: "./images/hero-3.png",
	},
	{
		title: "A Chameleon",
		caption: "Nature is beautiful😍",
		src: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
	},
	{
		title: "Outer Space",
		caption: "Flat-earthers in the mud🤣",
		src: "https://thumbs.dreamstime.com/b/planet-earth-space-night-some-elements-image-furnished-nasa-52734504.jpg",
	},
];

export let openedImageId;
let nextImage;

export function renderImages(element, arr) {
	element.innerHTML = "";

	arr.forEach((el, i) => {
		const imageContainer = document.createElement("div");
		imageContainer.classList.add("image-container");
		imageContainer.innerHTML = `
					<img src="${el.src}" alt="${el.title}" data-image-id="${i}" class="thumbnail" />
				   
		`;
		element.appendChild(imageContainer);
	});
}

export function viewImage(target, imageElement, title, caption, tracker) {
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: "smooth",
	});

	const imageId = +target.getAttribute("data-image-id");
	const image = images.find((_, i) => i === imageId);
	openedImageId = imageId;
	imageElement.src = image.src;
	imageElement.alt = image.title;
	title.textContent = image.title;
	tracker.textContent = `(${imageId + 1} / ${images.length})`;
	caption.textContent = image.caption;
}

export function viewNextImage(imageElement, title, caption, tracker) {
	if (openedImageId === images.length - 1) {
		nextImage = images[0];
	} else {
		nextImage = images[openedImageId + 1];
	}
	imageElement.src = nextImage.src;
	imageElement.alt = nextImage.title;
	title.textContent = nextImage.title;
	caption.textContent = nextImage.caption;
	openedImageId = images.findIndex((el) => el === nextImage);
	tracker.textContent = `(${openedImageId + 1} / ${images.length})`;
}

export function viewPrevImage(imageElement, title, caption, tracker) {
	if (openedImageId === 0) {
		nextImage = images[images.length - 1];
	} else {
		nextImage = images[openedImageId - 1];
	}
	imageElement.src = nextImage.src;
	imageElement.alt = nextImage.title;
	title.textContent = nextImage.title;
	caption.textContent = nextImage.caption;
	openedImageId = images.findIndex((el) => el === nextImage);
	tracker.textContent = `(${openedImageId + 1} / ${images.length})`;
}
