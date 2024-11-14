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

function compose(...fns) {
	return function (inputValue) {
		return fns.reduceRight((acc, cur) => {
			if (acc && acc.error) return;
			return cur(acc);
		}, inputValue);
	};
}

const capReverse = compose(reverse, capitalize);
