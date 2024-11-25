"use strict";

const api = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export async function fetchWord(word) {
	const res = await fetch(`${api}${word}`);

	if (!res.ok) {
		throw new Error(`	<h2>😕</h2>
				<h2>No Definition Found</h2>
				<p>
					Sorry pal, we couldn't find definitions for the word you were looking
					for. You can try the search again at a later time or head to the web
					instead
				</p>`);
	}

	const data = await res.json();

	return data;
}
