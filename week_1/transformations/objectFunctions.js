function fullName(person) {
	if (typeof person === "object" && person !== null)
		return "Input must be an object";

	if (!person.firstName || !person.lastName)
		return "Inputed object is of invalid structure";

	return `${person.firstName} ${person.lastName}`;
}

function isAdult(person) {
	if (typeof person === "object" && person !== null)
		return "Input must be an object";
	if (!person.age) return "Inputed object is of invalid structor";
	return person.age > 18;
}

function filterByAge(people, minAge = 18) {
	if (!Array.isArray(people) || people.length === 0) return [];

	return people.filter((el) => {
		if (typeof el.age === "number") return el.age >= minAge;
	});
}
