function parsedDate(date) {
	const newDate = new Date(date);
	const time = newDate.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});

	return time;
}

function daysLeft(date) {
	const parsedDate = new Date(date);
	const today = new Date();
	const timeDifference = parsedDate - today;
	const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

	return days;
}

export function displayToast(element) {
	element.children[0].textContent =
		"An item must have at least a title and due date";
	element.classList.add("toast");
	element.classList.remove("hidden");
	setTimeout(() => {
		element.classList.add("hidden");
		element.classList.remove("toast");
	}, 5000);
	return;
}

export function renderItems(element, arr) {
	element.innerHTML = "";

	if (arr.length === 0) {
		const placeholderElement = document.createElement("h3");
		placeholderElement.textContent = `Let's get started`;
		element.appendChild(placeholderElement);
	} else {
		arr.forEach((el) => {
			const listItem = document.createElement("div");
			listItem.classList.add("list-item");
			listItem.innerHTML = `
					<div data-item-id="${el._id}">
						<div class="list-header">
							<h4 class="title">${el.title}</h4>
							<button class="markdown">&plus;</button>
						</div>
						<div class="hidden">
							<p class="desc">${el.description}</p>
							${
								daysLeft(el.time) > 0
									? `<p class="time">${parsedDate(el.time)} (${daysLeft(
											el.time
									  )} days left)</p>`
									: `<p class="time">Task is due today</p>`
							}
						</div>
					</div>
					<span class="hidden">
						<button class="del-btn">&times;</button>
						<button class="done-btn">&check;</button>
						<button class="edit-btn" ${el.isDone ? `disabled` : ``}>&#9998;</button>
					</span>
		`;

			if (el.isDone === true)
				listItem.children[0].style.textDecoration = "line-through";
			element.appendChild(listItem);
		});
	}
}

export function addItem(element) {
	let title;
	let desc;
	let time;

	Array.from(element).forEach((el) => {
		if (el.name === "title") {
			title = el.value;
			el.value = "";
		}
		if (el.name === "description") {
			desc = el.value;
			el.value = "";
		}
		if (el.name === "time") {
			time = el.value;
			el.value = "";
		}
	});

	const obj = {
		title,
		description: desc,
		time,
		isDone: false,
		_id: Date.now(),
	};

	return obj;
}

export function deleteItem(target, parent, arr) {
	const item = target.parentNode.parentNode;
	parent.removeChild(item);

	arr = arr.filter(
		(el) =>
			el._id !==
			+target.parentNode.previousElementSibling.getAttribute("data-item-id")
	);
}

export function editItem(target, titleField, descField, timeField) {
	const title =
		target.parentNode.previousElementSibling.children[0].children[0]
			.textContent;
	const desc =
		target.parentNode.previousElementSibling.children[1].children[0]
			.textContent;
	const time =
		target.parentNode.previousElementSibling.children[1].children[1]
			.textContent;

	const id =
		target.parentNode.previousElementSibling.getAttribute("data-item-id");

	titleField.value = title;
	descField.value = desc;
	timeField.value = time;
	return id;
}

export function checkItem(target, arr) {
	const item = target.parentNode.parentNode;
	const text = [...item.children][0];
	const id = +text.getAttribute("data-item-id");
	const checkedItem = arr.find((el) => el._id === id);

	checkedItem.isDone = !checkedItem.isDone;
	checkedItem.isDone ? (text.style.textDecoration = "line-through") : "";
}

export function showItemDetails(target) {
	const info = target.parentNode.nextElementSibling;
	const btn = target.parentNode.parentNode.nextElementSibling;

	if (info.classList.contains("hidden")) target.textContent = "-";
	else target.textContent = "+";
	info.classList.toggle("hidden");
	btn.classList.toggle("hidden");
}

export function toggleForm(form) {
	form.classList.toggle("hide-form");
}

export function updateItem(arr, id, titleField, descField, timeField) {
	const editedEl = arr.find((el) => el._id === +id);
	editedEl.title = titleField.value;
	editedEl.description = descField.value;
	editedEl.time = timeField.value;
	titleField.value = "";
	descField.value = "";
	timeField.value = "";
}

export function sortItems(arr, direction) {
	arr.sort((a, b) =>
		direction === "ascend"
			? new Date(a.time) - new Date(b.time)
			: new Date(b.time) - new Date(a.time)
	);
}

export function filterItems(element, val, arr) {
	const filteredItems = arr.filter((el) => {
		if (val === "checked") return el.isDone;
		if (val === "pending") return !el.isDone;

		return true;
	});
	renderItems(element, filteredItems);
}
