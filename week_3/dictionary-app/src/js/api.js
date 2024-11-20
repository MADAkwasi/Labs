"use strict";

const api = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export async function fetchWord(word) {
	const res = await fetch(`${api}${word}`);

	if (!res.ok) {
		throw new Error(`Word not found: ${word}`);
	}

	const data = await res.json();

	return data;
}
