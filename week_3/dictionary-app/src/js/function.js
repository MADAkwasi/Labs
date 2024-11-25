"use strict";

function renderSynonymsAndAntonyms(synonyms, antonyms) {
	const renderList = (list) =>
		list && list.length > 0
			? `<p>${list[0]}: ${list
					.slice(1)
					.map((word) => `<span>${word}</span>`)
					.join(", ")}</p>`
			: "";

	return `
      ${renderList(
				synonyms && synonyms.length ? ["Synonyms", ...synonyms] : []
			)}
      ${renderList(
				antonyms && antonyms.length ? ["Antonyms", ...antonyms] : []
			)}
    `;
}

function renderSources(sources) {
	return sources
		.map(
			(url) => `
        <div class="footer">
          <p>Source</p>
          <a href="${url}" target="_blank">${url}</a>
          <img src='assets/images/icon-new-window.svg' alt='open new window' />
        </div>
      `
		)
		.join("");
}

function renderDefinition(definition, sources) {
	return `
      <div class="type">
        <p>${definition.partOfSpeech}</p>
        <hr />
      </div>
      <div class="definition">
        <p>Meaning</p>
        <ul>
          ${definition.definitions
						.map(
							(def) => `
                             <li>${def.definition}</li>
                             ${
																def.example
																	? `<p class="example">"${def.example}"</p>`
																	: ""
															}
                        `
						)
						.join("")}
        </ul>
        ${renderSynonymsAndAntonyms(definition.synonyms, definition.antonyms)}
        </div>
      ${renderSources(sources)} 
    `;
}

export function renderBlock(parent, data) {
	parent.innerHTML = "";
	const definitionblock = document.createElement("div");

	const definitionHTML = data
		.map((entry) => {
			return entry.meanings
				.map((definition) => renderDefinition(definition, entry.sourceUrls))
				.join("");
		})
		.join("");

	definitionblock.insertAdjacentHTML("beforeend", definitionHTML);

	parent.appendChild(definitionblock);
}

export function hideNullError(inputField) {
	inputField.nextElementSibling.style.display = "none";
	inputField.style.outline = "";
}

export function showNullError(inputField, wordField) {
	inputField.nextElementSibling.style.display = "block";
	inputField.style.outline = "1px solid #ff5252";
	wordField.classList.add("hide");
}

export function hideNotFoundError(inputField, wordCont) {
	wordCont.classList.remove("hide");
	inputField.nextElementSibling.style.display = "none";
	inputField.style.outline = "";
}

export function addEventListeners(element, events, handler) {
	events.forEach((event) => element.addEventListener(event, handler));
}
