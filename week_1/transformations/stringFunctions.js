function capitalize(str) {
	if (typeof str !== "string") return "Input a string value";
	if (str.trim() === "") return "String is a whitespace or empty string";
	return str[0].toUpperCase() + str.slice(1);
}

function reverse(str) {
	if (typeof str !== "string") return "Input a string value";
	if (str.trim() === "") return "String is a whitespace or empty string";
	return [...str].reverse().join("");
}

function isPalindrome(str) {
	if (typeof str !== "string") return "Input a string value";
	if (str.trim() === "") return "String is a whitespace or empty string";
	const reversedStr = [...str].reverse().join("");
	return str.toLowerCase() === reversedStr.toLowerCase();
}

function wordCount(str) {
	if (typeof str !== "string") return "Input a string value";
	if (str.trim() === "") return "String is a whitespace or empty string";
	const words = str.trim().split(/\s+/).filter(Boolean);
	return words.length;
}
