function checkTypesCount(
	hasUppercase = false,
	hasLowercase = false,
	hasNumber = false,
	hasSymbol = false,
	typesCount
) {
	const checks = {
		hasUppercase,
		hasLowercase,
		hasNumber,
		hasSymbol,
	};

	const count = Object.values(checks).filter(Boolean).length;

	return count >= typesCount;
}

export function showStrengthIndicator(
	length,
	{ includeLowercase, includeSymbols, includeNum, includeUppercase }
) {
	if (length === 0) return null;

	if (length < 8) return "#f64a4a";

	if (
		length >= 8 &&
		checkTypesCount(
			includeUppercase,
			includeLowercase,
			includeNum,
			includeSymbols,
			3
		)
	) {
		return "#a4ffaf";
	}

	if (
		length >= 8 &&
		checkTypesCount(
			includeUppercase,
			includeLowercase,
			includeNum,
			includeSymbols,
			2
		)
	) {
		return "#f8cd65";
	}

	if (
		length >= 8 &&
		checkTypesCount(
			includeUppercase,
			includeLowercase,
			includeNum,
			includeSymbols,
			1
		)
	) {
		return "#fb7c58";
	}
}
