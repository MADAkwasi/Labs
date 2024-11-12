function double(arr) {
	if (!Array.isArray(arr) || arr.length === 0) return [];

	const isNotNumber = arr.map((element) => typeof element !== "number");
	if (!!isNotNumber.length) return "Element of array must be a number";

	const filteredArr = arr.filter((el) => typeof el === "number");

	return filteredArr.map((number) => number * 2);
}

function filterEven(arr) {
	if (!Array.isArray(arr) || arr.length === 0) return [];

	const isNotNumber = arr.map((element) => typeof element !== "number");
	if (!!isNotNumber.length) return "Element of array must be a number";

	return arr.filter((num) => typeof num === "number" && num % 2 === 0);
}

function sum(arr) {
	if (!Array.isArray(arr) || arr.length === 0) return 0;

	const isNotNumber = arr.map((element) => typeof element !== "number");
	if (!!isNotNumber.length) return "Element of array must be a number";

	return arr.reduce((acc, cur) => {
		if (typeof cur === "number") return acc + cur;
	}, 0);
}

function average(arr) {
	if (!Array.isArray(arr) || arr.length === 0) return 0;

	const isNotNumber = arr.map((element) => typeof element !== "number");
	if (!!isNotNumber.length) return "Element of array must be a number";

	return (
		arr.reduce((acc, cur) => {
			if (typeof cur === "number") return acc + cur;
		}, 0) / arr.length
	);
}
