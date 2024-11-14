"use strict";
import {
	addItem,
	checkItem,
	deleteItem,
	displayToast,
	editItem,
	filterItems,
	renderItems,
	showItemDetails,
	sortItems,
	toggleForm,
	updateItem,
} from "./functions.js";

const list = document.querySelector(".list-box");
const addBtn = document.querySelector(".add-btn");
const form = document.querySelector(".form-container");
const submitBtn = document.querySelector(".submit-btn");
const inputFields = document.getElementsByTagName("input");
const titleField = document.getElementById("title-field");
const descField = document.getElementById("desc-field");
const timeField = document.getElementById("time-field");
const asecBtn = document.querySelector(".asec-btn");
const descBtn = document.querySelector(".desc-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const filter = document.getElementById("filter");
const toast = document.querySelector('[data-role="toast"]');
const today = new Date().toISOString().split("T")[0];
timeField.setAttribute("min", today);

let isEditing = false;
let editItemId;

let itemsArr = [
	{
		title: "Finish up labs",
		description: "Todo, Image Gallery and Functional programming",
		time: "2024-11-20",
		isDone: false,
		_id: Number(new Date()),
	},
];

addBtn.addEventListener("click", () => toggleForm(form));

list.addEventListener("click", (e) => {
	if (e.target.className === "del-btn") deleteItem(e.target, list, itemsArr);

	if (e.target.className === "done-btn") {
		checkItem(e.target, itemsArr);
		filterItems(list, filter.value, itemsArr);
	}

	if (e.target.className === "markdown") showItemDetails(e.target);

	if (e.target.className === "edit-btn") {
		isEditing = true;
		editItemId = editItem(e.target, titleField, descField, timeField);
		toggleForm(form);
	}
});

submitBtn.addEventListener("click", (e) => {
	e.preventDefault();

	if (titleField.value.trim() === "" || timeField.value.trim() === "") {
		displayToast(toast);
		return;
	}
	if (isEditing) {
		updateItem(itemsArr, editItemId, titleField, descField, timeField);
		isEditing = false;
	} else {
		const newItem = addItem(inputFields);
		itemsArr.push(newItem);
	}
	toggleForm(form);
	renderItems(list, itemsArr);
});

asecBtn.addEventListener("click", () => {
	sortItems(itemsArr, "ascend");
	renderItems(list, itemsArr);
});

descBtn.addEventListener("click", () => {
	sortItems(itemsArr, "descend");
	renderItems(list, itemsArr);
});

filter.addEventListener("click", () =>
	filterItems(list, filter.value, itemsArr)
);

cancelBtn.addEventListener("click", (e) => {
	e.preventDefault();
	toggleForm(form);

	titleField.value = "";
	descField.value = "";
	timeField.value = "";
});

renderItems(list, itemsArr);
