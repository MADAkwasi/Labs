function double(arr) {
	if (!Array.isArray(arr) || arr.length === 0) return [];

	const filteredArr = arr.filter((el) => typeof el === "number");

	return filteredArr.map((el) => el * 2);
}

function filterEven(arr) {
	if (!Array.isArray(arr) || arr.length === 0) return [];
	return arr.filter((num) => {
		if (typeof num === "number" && num % 2 === 0) return num;
	});
}

function sum(arr) {
	if (!Array.isArray(arr) || arr.length === 0) return 0;
	return arr.reduce((acc, cur) => {
		if (typeof cur === "number") return acc + cur;
	}, 0);
}

function average(arr) {
	if (!Array.isArray(arr) || arr.length === 0) return 0;
	return (
		arr.reduce((acc, cur) => {
			if (typeof cur === "number") return acc + cur;
		}, 0) / arr.length
	);
}

console.log(double([1, 2, 3, 4, 5, 6, 7, "hrllp"]));
