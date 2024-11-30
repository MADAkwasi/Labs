export class Password {
	constructor(
		stringLength,
		includesUppercase,
		includesLowercase,
		includesNum,
		includesSymbols
	) {
		this.stringLength = stringLength;
		this.types = {
			includesUppercase,
			includesLowercase,
			includesNum,
			includesSymbols,
		};
	}

	generateRandomString() {
		if (this.stringLength === 0) throw new Error("Specify length of password");

		const lowercase = "abcdefghijklmnopqrstuvwxyz";
		const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const numbers = "0123456789";
		const symbols = "!@#$%^&*()_+-=[]{}|;:',.<>?/";

		let characterPool = "";

		if (this.types.includesLowercase) characterPool += lowercase;
		if (this.types.includesUppercase) characterPool += uppercase;
		if (this.types.includesNum) characterPool += numbers;
		if (this.types.includesSymbols) characterPool += symbols;

		if (!characterPool) {
			throw new Error(
				"No character types selected! Please enable at least one option."
			);
		}

		let randomString = "";
		for (let i = 0; i < this.stringLength; i++) {
			const randomIndex = Math.floor(Math.random() * characterPool.length);
			randomString += characterPool[randomIndex];
		}

		return randomString;
	}
}
