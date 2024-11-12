function capitalize(str) {
	if (typeof str !== "string") return "Input a string value";
	if (str.trim() === "") return "String is a whitespace or empty string";

	if (/^[^a-zA-Z0-9]/.test(str)) return str;
	else return str[0].toUpperCase() + str.slice(1);
}

function reverse(str) {
	if (typeof str !== "string") return "Input a string value";
	if (str.trim() === "") return "String is a whitespace or empty string";
	return [...str].reverse().join("");
}

function compose(...fns) {
	return function (inputValue) {
		return fns.reduceRight((acc, cur) => {
			const result = cur(acc);
			if ((result && result.startsWith("Input")) || result.startsWith("String"))
				return acc;
			return result;
		}, inputValue);
	};
}

const reverseCaps = compose(reverse, capitalize);
