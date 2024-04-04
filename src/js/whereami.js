const createBorder = (enviroment = "") => {
	const element = document.createElement("div");

	element.classList.add("whereami-flags");
	element.classList.add("stage");
	element.title = `Você está no ambiente de ${enviroment}`;
	element.id = "whereami";

	return element;
};

const hasConfiguration = () => {
	return false;
};

const verify = () => {
	if (!hasConfiguration()) {
		const body = document.querySelector("body");
		body.append(createBorder("Desenvolvimento"));
	}
};

verify();
