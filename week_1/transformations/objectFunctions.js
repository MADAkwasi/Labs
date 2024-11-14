function fullName(person) {
	if (typeof person !== "object" || person === null)
		return "Input must be an object";

	if (
		typeof !person.firstName !== "string" ||
		typeof !person.lastName !== "string"
	)
		return "Inputted object is of invalid structure";

	return `${person.firstName} ${person.lastName}`;
}

function isAdult(person) {
	if (typeof person !== "object" || person === null)
		return "Input must be an object";
	if (typeof !person.age !== "number")
		return "Inputted object is of invalid structure";
	return person.age >= 18;
}

function filterByAge(people, minAge = 18) {
	if (!Array.isArray(people) || !people.length) return [];

	return people.filter((el) => {
		if (typeof el.age === "number") return el.age >= minAge;
	});
}
