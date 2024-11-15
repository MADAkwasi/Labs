export function renderElements(
	parentElement,
	options,
	initialRender = false,
	selectedValue
) {
	parentElement.innerHTML = "";

	const optionsHTML = options
		.map((hero) => {
			const isSelected = hero.name === selectedValue ? "selected" : "";
			return `<option value="${hero.name}" ${isSelected}>${hero.name}</option>`;
		})
		.join("");

	initialRender
		? parentElement.insertAdjacentHTML(
				"beforeEnd",
				`
        <option value="${null}">--Select a character--</option>
        ${optionsHTML}
        `
		  )
		: parentElement.insertAdjacentHTML("beforeEnd", optionsHTML);
}

export function simulateBattle(text, character1, character2) {
	const num = Math.floor(Math.random() * (50 - 1 + 1)) + 1;

	if (num % 2 === 0)
		text.textContent = `${character1.textContent} defeats ${character2.textContent}`;
	else
		text.textContent = `${character2.textContent} defeats ${character1.textContent}`;
}
