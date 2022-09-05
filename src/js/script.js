let allQuizzes = [];
let allQuizzesToDisplay = [];
let myQuizzes = [];
let quizzTitle = "";
let quizzImage = "";
let quizzNumQuestions = 0;
let quizzNumLevels = 0;
let quizzInGame = {
	gameOn: false,
	selected: 0,
	questions: 0,
	rightAnswers: 0,
	levelsStorage: 0,
	id: 0,
};

const url = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";

callLocalStorage();
renderMyQuizzes();
getAllQuizzes();
document.querySelector(".basic-info-button").onclick = goToFormQuestions;

function equalID(quizz) {
	let nfalse = 0;
	if (myQuizzes.length === 0) {
		return true;
	} else {
		for (let i = 0; i < myQuizzes.length; i++) {
			if (quizz.id === myQuizzes[i].id) {
				nfalse++;
			}
		}
	}
	return (nfalse === 0 ? true : false);
}

function getAllQuizzes() {
	const promisse = axios.get(`${url}`);
	promisse.then(renderAllQuizzes);
}

function renderAllQuizzes(data) {
	allQuizzes = data.data;
	allQuizzesToDisplay = allQuizzes.filter(equalID);

	document.querySelector(".loading-all-quizzes-wrapper").classList.add("hidden");

	const quizzes = document.querySelector(".all-quizzes__quizz-list");
	quizzes.innerHTML = "";

	for (let i = 0; i < allQuizzesToDisplay.length; i++) {
		quizzes.innerHTML += `
			<article onclick="enterQuizz(${allQuizzesToDisplay[i].id})" class="quizz-list__quizz" data-identifier="quizz-card">
				<img src="${allQuizzesToDisplay[i].image}" alt="">
				<div class="quizz-list__quizz__gradient"></div>
				<span>${allQuizzesToDisplay[i].title}</span>
			</article>
		`;
	}
}

function renderMyQuizzes() {
	if (myQuizzes.length === 0) {
		return;
	} else {
		const quizzes = document.querySelector(".my-quizzes__quizz-list");
		quizzes.innerHTML = "";
		for (let i = 0; i < myQuizzes.length; i++) {
			quizzes.innerHTML += `
      <article class="quizz-list__quizz" data-identifier="quizz-card">
        <img src="${myQuizzes[i].image}" alt="">
        <div onclick="enterQuizz(${myQuizzes[i].id})" class="quizz-list__quizz__gradient"></div>
        <span onclick="enterQuizz(${myQuizzes[i].id})">${myQuizzes[i].title}</span>
				<div class="edit-delete">
					<ion-icon onclick="editQuizz(${myQuizzes[i].id})" name="create-outline"></ion-icon>
					<ion-icon onclick="deleteQuizz(${myQuizzes[i].id})" name="trash-outline"></ion-icon>
				</div>
      </article>
      `;
		}
		document.querySelector(".my-quizzes__zero-quizzes").classList.add("hidden");
		document.querySelector(".my-quizzes__some-quizzes").classList.remove("hidden");
	}
}

function goToFormQuestions() {
	if (validateBasicInfo() === true) {
		gettingBasicInfo();
		document.querySelector(".creation-basic-info").classList.add("hidden");
		document.querySelector(".creation-questions").classList.remove("hidden");
	}
}

function goToFormLevels() {
	if (validateFormQuestions() === true) {
		document.querySelector(".creation-questions").classList.add("hidden");
		document.querySelector(".creation-levels").classList.remove("hidden");
	}
}

function goToSucessPageForm() {
	if (validateLevels()) {
		document.querySelector(".creation-levels").classList.add("hidden");
		document.querySelector(".created-quiz").classList.remove("hidden");
		sendNewQuizz();
	}
}

function gettingBasicInfo() {
	const answers = getBasicInfo();

	quizzTitle = answers.title;
	quizzImage = answers.image;
	quizzNumQuestions = answers.questions;
	quizzNumLevels = answers.levels;

	renderQuestions(quizzNumQuestions);
	renderLevels(quizzNumLevels);

	document.querySelector(".questions-button").onclick = () => {goToFormLevels()};
	document.querySelector(".submit-button").onclick = () => {goToSucessPageForm()};
}

function renderQuestions(numQuestions) {
	const questions = document.querySelector(".creation-questions");

	questions.innerHTML = `
    <legend>Crie suas perguntas</legend>

    <div class="question-wrapper question-1" data-identifier="question-form">
      <div class="question-header-cr">
        <h2>Pergunta 1</h2>
        <img onclick="showQuestion(this)" src="src/images/edit.svg" alt="edit icon" data-identifier="expand">
      </div>

      <div class="question-body">
        <input type="text" id="question-text" name="question-text" placeholder="Texto da pergunta">
        <label for="question-text"></label>

        <div class="color-picker">
              <label for="question-background">Cor de fundo da pergunta:</label>
              <input type="color" id="question-background" name="question-background" placeholder="Cor de fundo da pergunta">
        </div>
          
        <h2 class="correct-answer-info">Resposta correta</h2>

        <input type="text" id="correct-answer" name="question-correct-answer" placeholder="Resposta correta" class="question-body__answer">
        <label for="correct-answer"></label>

        <input type="url" id="correct-answer-image" name="correct-answer-image" placeholder="URL da imagem" class="answers-image question-body__answer">
        <label for="correct-answer-image"></label>

        <h2 class="incorrect-answer-info">Respostas incorretas</h2>

        <input type="text" id="incorrect-answer-1" name="incorrect-answer-1" placeholder="Resposta incorreta 1" class="incorrect-answers question-body__answer">
        <label for="incorrect-answer-1"></label>

        <input type="url" id="incorret-image-1" name="incorrect-image-1" placeholder="URL da imagem 1" class="answers-image question-body__answer">
				<label for="incorrect-image-1"></label>

        <input type="text" id="incorrect-answer-2" name="incorrect-answer-2" placeholder="Resposta incorreta 2" class="incorrect-answers question-body__answer">
        <label for="incorrect-answer-2"></label>

        <input type="url" id="incorrect-image-2" name="incorrect-image-2" placeholder="URL da imagem 2" class="answers-image question-body__answer">
        <label for="incorrect-image-2"></label>
          
        <input type="text" id="incorrect-answer-3" name="incorrect-answer-3" placeholder="Resposta incorreta 3" class="incorrect-answers question-body__answer">
        <label for="incorrect-answer-3"></label>

        <input type="url" id="incorrect-image-3" name="incorrect-answer-3" placeholder="URL da imagem 3" class="answers-image question-body__answer">
        <label for="incorrect-image-3"></label>
      </div>
    </div>
  `;

	for (let i = 2; i <= numQuestions; i++) {
		questions.innerHTML += `
      <div class="question-wrapper question-${i}" data-identifier="question-form">
        <div class="question-header-cr">
          <h2>Pergunta ${i}</h2>
          <img onclick="showQuestion(this)" src="src/images/edit.svg" alt="edit icon" data-identifier="expand">
        </div>

        <div class="question-body hidden" data-identifier="question-form">
          <input type="text" id="question-text" name="question-text" placeholder="Texto da pergunta">
          <label for="question-text"></label>

          <div class="color-picker">
              <label for="question-background">Cor de fundo da pergunta:</label>
              <input type="color" id="question-background" name="question-background" placeholder="Cor de fundo da pergunta">
          </div>
          
          <h2 class="correct-answer-info">Resposta correta</h2>

          <input type="text" id="correct-answer" name="question-correct-answer" placeholder="Resposta correta" class="question-body__answer">
          <label for="correct-answer"></label>

          <input type="url" id="correct-answer-image" name="correct-answer-image" placeholder="URL da imagem" class="answers-image question-body__answer">
          <label for="correct-answer-image"></label>

          <h2 class="incorrect-answer-info">Respostas incorretas</h2>

          <input type="text" id="incorrect-answer-1" name="incorrect-answer-1" placeholder="Resposta incorreta 1" class="incorrect-answers question-body__answer">
          <label for="incorrect-answer-1"></label>

          <input type="url" id="incorret-image-1" name="incorrect-image-1" placeholder="URL da imagem 1" class="answers-image question-body__answer">
			<label for="incorrect-image-1"></label>

          <input type="text" id="incorrect-answer-2" name="incorrect-answer-2" placeholder="Resposta incorreta 2" class="incorrect-answers question-body__answer">
          <label for="incorrect-answer-2"></label>

          <input type="url" id="incorrect-image-2" name="incorrect-image-2" placeholder="URL da imagem 2" class="answers-image question-body__answer">
          <label for="incorrect-image-2"></label>
          
          <input type="text" id="incorrect-answer-3" name="incorrect-answer-3" placeholder="Resposta incorreta 3" class="incorrect-answers question-body__answer">
          <label for="incorrect-answer-3"></label>

          <input type="url" id="incorrect-image-3" name="incorrect-answer-3" placeholder="URL da imagem 3" class="answers-image question-body__answer">
          <label for="incorrect-image-3"></label>
        </div>
      </div>
    `;
	}

	questions.innerHTML += `
  <button type="button" class="questions-button">Prosseguir para criar níveis</button>
  `;
}

function renderLevels(numLevels) {
	const levels = document.querySelector(".creation-levels");

	levels.innerHTML = `
    <legend>Agora, decida os níveis</legend>
            
    <div class="levels-wrapper level-1" data-identifier="level">
      <div class="level-header">
        <h2>Nível 1</h2>
        <img onclick="showLevel(this)" src="src/images/edit.svg" alt="edit icon" data-identifier="expand">
      </div>

      <div class="level-body" data-identifier="level">
        <input type="text" id="title-level-1" name="title-level-1" placeholder="Título do nível">
        <label for="title-level-1"></label>

        <input type="number" id="percentage-level-1" name="percentage-level-1" placeholder="% de acerto mínima">
        <label for="percentage-level-1"></label>

        <input type="url" id="image-level-1" name="image-level-1" placeholder="URL da imagem do nível">
        <label for="image-level-1"></label>

        <input type="text" id="description-level-1" name="description-level-1" placeholder="Descrição do nível">
        <label for="description-level-1"></label>
      </div>
    </div>
  `;

	for (let i = 2; i <= numLevels; i++) {
		levels.innerHTML += `
      <div class="levels-wrapper level-${i}" data-identifier="level">
        <div class="level-header">
          <h2>Nível ${i}</h2>
          <img onclick="showLevel(this)" src="src/images/edit.svg" alt="edit icon" data-identifier="expand">
        </div>

        <div class="level-body hidden">
          <input type="text" id="title-level-${i}" name="title-level-${i}" placeholder="Título do nível">
          <label for="title-level-${i}"></label>

          <input type="number" id="percentage-level-${i}" name="percentage-level-${i}" placeholder="% de acerto mínima" min="0">
          <label for="percentage-level-${i}"></label>

          <input type="url" id="image-level-${i}" name="image-level-${i}" placeholder="URL da imagem do nível" min="0">
          <label for="image-level-${i}"></label>

          <input type="text" id="description-level-${i}" name="description-level-${i}" placeholder="Descrição do nível">
          <label for="description-level-${i}"></label>
        </div>
      </div>
    `;
	}

	levels.innerHTML += `
  <button type="button" class="submit-button">Finalizar Quizz</button>
  `;
}

function renderCreatedQuizz() {
	const quizz = document.querySelector(".created-quiz");
	const answers = getBasicInfo();
	const id = getQuizzID();

	quizzTitle = answers.title;
	quizzImage = answers.image;

	quizz.innerHTML = `
    <h3>Seu quizz está pronto!</h3>
    <article class="created-quiz-image">
      <img onclick="enterQuizz(${id})" src="${quizzImage}" alt="">
      <div class="created-quiz-image__gradient"></div>
      <span>${quizzTitle}</span>
    </article>
    <button onclick="enterQuizz(${id})" class="open-quiz-button">Acessar Quiz</button>
    <button onclick="backToMain()" class="homepage-button">Voltar para home</button>
  `;
}

function showQuestion(element) {
	const question = element.parentNode.parentNode.querySelector(".question-body");
	question.classList.toggle("hidden");
}

function showLevel(element) {
	const level = element.parentNode.parentNode.querySelector(".level-body");
	level.classList.toggle("hidden");
}

function backToMain() {
	document.querySelector(".main-screen").classList.remove("hidden");
	document.querySelector(".quizz-screen").classList.add("hidden");
	document.querySelector(".creation-screen").classList.add("hidden");
	document.location.reload(true);
}

function createNewQuizz() {
	document.querySelector(".main-screen").classList.add("hidden");
	document.querySelector(".creation-screen").classList.remove("hidden");
}

function enterQuizz(id) {
	document.querySelector(".quizz-screen").classList.remove("end-screen-update-space");
	document.querySelector(".creation-screen").classList.add("hidden");
	document.querySelector(".main-screen").classList.add("hidden");
	document.querySelector(".quizz-screen").classList.remove("hidden");
	document.querySelector(".rendering-quizz-wrapper").classList.add("hidden");
	downloadQuizz(id);
}

function getBasicInfo() {
	const answers = document.querySelector(".basic-info-wrapper");

	quizzTitle = answers.querySelector("#basic-title").value;
	quizzImage = answers.querySelector("#basic-img").value;
	quizzNumQuestions = answers.querySelector("#basic-questions").value;
	quizzNumLevels = answers.querySelector("#basic-levels").value;

	if (quizzNumQuestions === "") {
		quizzNumQuestions = 0
	}

	if (quizzNumLevels === "") {
		quizzNumLevels = 0
	}

	const info = {
		title: quizzTitle,
		image: quizzImage,
		questions: parseInt(quizzNumQuestions),
		levels: parseInt(quizzNumLevels),
	};

	return info;
}

const validateQuizTitle = (title) => {
	const error = validationMessages();
	const input = document.querySelector("#basic-title");
	const label = document.querySelector('label[for="basic-title"]');	

	if (title.length < 20) {
		input.classList.add("wrong-background");
		label.textContent = error.titleMin;
		return false;
	} else if (title.length > 65) {
		input.classList.add("wrong-background");
		label.textContent = error.titleMax;
		return false;
	} else {
		input.classList.remove("wrong-background");
		label.textContent = "";
		return true;
	}
};

const validateImageUrl = (string) => {
	const error = validationMessages();
	const input = document.querySelector("#basic-img");
	const label = document.querySelector('label[for="basic-img"]');	
	const regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

	if (!regex.test(string)) {
		label.textContent = error.url;
		input.classList.add("wrong-background");
		return false;
	} else {
		input.classList.remove("wrong-background");
		label.textContent = "";
		return true;
	}
};

const validateNumberQuestions = (questions) => {
	const error = validationMessages();
	const input = document.querySelector("#basic-questions");
	const label = document.querySelector('label[for="basic-questions"]');

	if (questions < 3 || questions === "") {
		label.textContent = error.questions;
		input.classList.add("wrong-background");
		return false;
	} else {
		input.classList.remove("wrong-background");
		label.textContent = "";
		return true;
	}
};

const validateNumberLevels = (levels) => {
	const error = validationMessages();
	const input = document.querySelector("#basic-levels");
	const label = document.querySelector('label[for="basic-levels"]');

	if (levels < 2 || levels === "") {
		label.textContent = error.levels;
		input.classList.add("wrong-background");
		return false;
	} else {
		input.classList.remove("wrong-background");
		label.textContent = "";
		return true;
	}
};

const validateBasicInfo = () => {
	const basicInfo = getBasicInfo();

	const validatedTitle = validateQuizTitle(basicInfo.title);
	const validatedImage = validateImageUrl(basicInfo.image);
	const validatedQuestions = validateNumberQuestions(basicInfo.questions);
	const validatedLevels = validateNumberLevels(basicInfo.levels);

	if (validatedTitle && validatedImage && validatedQuestions && validatedLevels) {
		return true;
	} else {
		return false;
	}
};

const validateQuestionText = () => {
	const error = validationMessages();
	const questions = document.querySelectorAll("input[name=question-text]");
	const labels = document.querySelectorAll('label[for="question-text"]');
	let validation = true;
	for (let i = 0; i < questions.length; i++) {
		let question = questions[i];
		let label = labels[i];
		let text = question.value;

		if (text.length === 0) {
			label.textContent = error.questionMinChar;
			question.classList.add("wrong-background");
			validation = false;
		} else if (text.length < 20) {
			label.textContent = error.questionMinChar;
			question.classList.add("wrong-background");
			validation = false;
		} else if (!(text.length < 20)) {
			label.textContent = '';
			question.classList.remove("wrong-background");
			validation = true;
		} else if (!(text.length === 0)) {
			label.textContent = '';
			question.classList.remove("wrong-background");
			validation = true;
		}
	}
	return validation;
};

const validateQuestionBackground = () => {
	const backgrounds = document.querySelectorAll("input[name=question-background]");
	const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

	for (let i = 0; i < backgrounds.length; i++) {
		let bg = backgrounds[i];
		let color = bg.value;

		if (!regex.test(color)) {
			alert("A cor de fundo deve ser uma cor hexadecimal");
			return false;
		}
	}

	return true;
};

const validateCorrectAnswer = () => {
	const error = validationMessages();
	const answers = document.querySelectorAll("input[name=question-correct-answer]");
	const labels = document.querySelectorAll('label[for="correct-answer"]');
	let validation = true;
	for (let i = 0; i < answers.length; i++) {
		let answer = answers[i];
		let label = labels[i];

		if (answer.value.length === 0) {
			label.textContent = error.answersQuantity;
			answer.classList.add("wrong-background");
			validation = false;
		}
		else {
			label.textContent = '';
			answer.classList.remove("wrong-background");
			validation = true;
		}
	}

	return validation;
};

const validateIncorrectAnswer = () => {
	const answers = document.querySelectorAll("input[name=incorrect-answer-1]");
	const error = validationMessages();
	const labels = document.querySelectorAll('label[for="incorrect-answer-1"]');
	let validation = true;
	for (let i = 0; i < answers.length; i++) {
		let answer = answers[i];
		let label = labels[i];
		if (answer.value.length === 0) {
			label.textContent = error.answersQuantity;
			answer.classList.add("wrong-background");
			validation = false;
		}
		else if (!(answer.value.length === 0)) {
			label.textContent = '';
			answer.classList.remove("wrong-background");
			validation = true;
		}
	}

	return validation;
};

const validateAnswersImages = () => {
	const images = document.querySelectorAll(".answers-image");
	const regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

	for (let i = 0; i < images.length; i++) {
		let image = images[i].value;

		if (image !== "" && !regex.test(image)) {
			alert("A imagem deve ser uma URL");
			return false;
		}
	}

	return true;
};

const urlRegex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
const validateAnswerURLPair = () => {
	const answerTypes = ["question-correct-answer", "incorrect-answer-1", "incorrect-answer-2", "incorrect-answer-3"];

	for (let i = 0; i < answerTypes.length; i++) {
		const answerType = answerTypes[i];
		const selector = `input[name=${answerType}]`;
		const answers = document.querySelectorAll(selector);

		for (let j = 0; j < answers.length; j++) {
			const answer = answers[j];
			const url = answer.nextElementSibling.nextElementSibling;
			if (url !== null)
				{
					label = url.nextElementSibling;
				}
			if (answer.value !== "" && url && !urlRegex.test(url.value)) {
				if (url !== null)
				{
					label.textContent = 'Cada resposta deve conter uma URL correspondente.';
				}
				url.classList.add("wrong-background");
				validation = false;
			}
			else if (!(answer.value !== "" && url && !urlRegex.test(url.value))) {
				if (url !== null)
				{
					label.textContent = '';
					url.classList.remove("wrong-background");
				}
				validation = true;
			}
		}
	}
	return true;
};

const validateFormQuestions = () => {
	let first = validateQuestionText(), second = validateCorrectAnswer(), third = validateIncorrectAnswer(), fourth = validateAnswersImages(), fifth = validateAnswerURLPair();
	if (first === true && second === true && third === true && fourth === true && fifth === true) {
		return true;
	}
};

const validationMessages = () => {
	const errorMessages = {

		titleMin: "O título deve ter pelo menos 20 caracteres",
		titleMax: "O título pode ter no máximo 65 caracteres",
		url: "O endereço da imagem deve ser uma URL",
		questions: "O número de questões deve ser maior ou igual a 3",
		levels: "O número de níveis deve ser maior ou igual a 2",

		answersTitle: "Texto das respostas não pode estar vazio",
		questionMinChar: "Texto da pergunta deve ter no mínimo 20 caracteres",
		answersQuantity: "É obrigatória a inserção da resposta correta e de pelo menos 1 resposta errada.",

		levelTitleMin:	"Título do nível deve ter no mínimo 10 caracteres",
		percentage: "% de acerto deve ser um número entre 0 e 100",
		levelDesc: "Descrição do nível deve ter no mínimo 30 caracteres",
		minPercentage: "É obrigatório existir pelo menos 1 nível cujar % de acerto mínima seja 0%"
	}

	return errorMessages;
}

function validateLevels() {
	const numOfQuestEachLevel = 4;
	const regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
	const getLevelNodes = document.querySelectorAll(".level-body");
	let trueValidations = 0;
	function setWrong(el, text)
	{
		el.nextElementSibling.textContent = text;
		el.classList.add('wrong-background');
	}


	getLevelNodes.forEach((parentNode, ind) => {
		const nodeValues = {
			title: parentNode.querySelector("input[placeholder='Título do nível']"),
			percentage: parentNode.querySelector("input[placeholder='% de acerto mínima']"),
			url: parentNode.querySelector("input[placeholder='URL da imagem do nível']"),
			description: parentNode.querySelector("input[placeholder='Descrição do nível']"),
		};

		Object.values(nodeValues).forEach(el => {el.nextElementSibling.textContent = ''; el.classList.remove('wrong-background')})


		nodeValues.title.value.length >= 10 ? trueValidations++ : setWrong(nodeValues.title, `Título do Nível ${ind+1} deve ter no mínimo 10 caracteres`);

		nodeValues.percentage.value <= 100 && nodeValues.percentage.value >= 0 && nodeValues.percentage.value !== "" ? trueValidations++ : setWrong(nodeValues.percentage, `% de acerto do nível ${ind+1} deve estar entre 0 e 100`);

		regex.test(nodeValues.url.value) ? trueValidations++ : setWrong(nodeValues.url, `Url do nível ${ind+1} não é válido`);

		nodeValues.description.value.length >= 30 ? trueValidations++ : setWrong(nodeValues.description, `A descrição do Nível ${ind+1} deve ter no mínimo 30 caracteres`);
	});
	for (let i = 0; i < getLevelNodes.length; i++) {
		let node = getLevelNodes[i].querySelector("input[placeholder='% de acerto mínima']");
		if (node.value === "0") {
			trueValidations++;
			break;
		} else if (i === getLevelNodes.length - 1) {
			setWrong(getLevelNodes[0].querySelector("input[placeholder='% de acerto mínima']"),`Pelo menos um nível deve ter a porcentagem 0`);
		}
	}
	return trueValidations === getLevelNodes.length * numOfQuestEachLevel + 1 ? true : false;
}

function newQuizz() {
	const info = getBasicInfo();
	const newQuizz = {
		title: "",
		image: "",
		questions: [],
		levels: [],
	};

	const questions = Array.from(document.querySelectorAll(".question-body")).map((el) => {
		return {
			title: el.querySelector("input[name='question-text'").value,
			color: el.querySelector("input[name='question-background").value,
			answers: Array.from(el.querySelectorAll(".question-body__answer"))
				.map((el, ind, arr) => {
					return ind % 2 === 0 ? { text: arr[ind].value, image: arr[(ind += 1)].value, isCorrectAnswer: quizzGetCorrectAnswer(el) } : "";
				})
				.filter((el) => el !== "" && el !== null && !(el.image === "" || el.text === "")),
		};
	});

	const levels = Array.from(document.querySelectorAll(".level-body")).map((el) => {
		const levelInputs = el.querySelectorAll("input");
		return {
			title: levelInputs[0].value,
			image: levelInputs[2].value,
			text: levelInputs[3].value,
			minValue: parseInt(levelInputs[1].value),
		};
	});
	newQuizz.title = info.title;
	newQuizz.image = info.image;
	newQuizz.questions = questions;
	newQuizz.levels = levels;

	return newQuizz;
}

function quizzGetCorrectAnswer(el) {
	if (el.getAttribute("name") === "question-correct-answer") {
		return true;
	} else {
		return false;
	}
}

async function downloadQuizz(id) {
	const promise = await axios.get(`${url}/${id}`);
	data = promise.data;

	quizzInGame = {
		gameOn: true,
		selected: 0,
		questions: data.questions.length,
		rightAnswers: 0,
		levelsStorage: data.levels,
		id: id,
	};

	quizzHtmlCreation(data);
}

function quizzHtmlCreation(data) {
	const quizzObject = randomizeQuizz(data);
	const newHTML = `
    <section class="quizz-header">
      <p class="quizz-header__title">${quizzObject.title}</p>
      <div class="quizz-header-opacity">
        <img draggable="false" src="${quizzObject.image}" alt=""/>
      </div>
    </section>
    <section class="quizz-questions">
      ${quizzObject.questions
				.map((el) => {
					return `
          <div class="quizz-questions__quizz-box">
            <div class="quizz-question-header-div" style="background-color:${el.color}" data-identifier="question">
              <p class="question-header">${el.title}</p>
            </div>
            <div class="quizz-questions-options-div">
      
            ${el.answers
							.map((newEl) => {
								return `
                <div onclick='checkCorrect(this)' class="questions-answer ${newEl.isCorrectAnswer ? "correct-answer" : "wrong-answer"}" data-identifier="answer">
                  <img draggable="false" src=${newEl.image} alt="" class="answer-img">
                  <p class="answer-p">${newEl.text}</p>
                </div>
              `;
							})
							.reduce((acc, el) => acc + el, "")}
      
            </div>
          </div>
        `;
				})
				.reduce((acc, el) => acc + el, "")}
    </section>
    `;
	renderQuizz(newHTML);
}

function renderQuizz(render) {
	document.querySelector(".quizz-screen").innerHTML += render;
}

function sendNewQuizz() {
	const quizz = newQuizz();

	const promisse = axios.post(`${url}`, quizz);
	promisse.then(getQuizzInfo);
}

function getQuizzInfo(data) {
	callLocalStorage();

	myQuizzes.push(data.data);

	sendToLocalStorage();
	renderMyQuizzes();
	renderCreatedQuizz();
}

function sendToLocalStorage() {
	const myQuizzesSerialized = JSON.stringify(myQuizzes);
	localStorage.setItem("myQuizzes", myQuizzesSerialized);
}

function callLocalStorage() {
	const myQuizzesSerialized = localStorage.getItem("myQuizzes");

	if (myQuizzesSerialized !== null) {
		myQuizzes = JSON.parse(myQuizzesSerialized);
	}
}

function getQuizzID() {
	const id = myQuizzes[myQuizzes.length - 1].id;
	return id;
}

function randomizeQuizz(quiz) {
	let questions = quiz.questions;
	for (let i = 0; i < 5; i++) {
		questions.forEach((el) =>
			el.answers.forEach((el, ind, arr) => {
				const newInd = Math.floor(Math.random() * arr.length);
				const tmpEl = arr[newInd];
				arr[newInd] = el;
				arr[ind] = tmpEl;
			})
		);
	}
	quiz.questions = questions;

	return quiz;
}

function checkCorrect(el) {
	const parentNode = el.closest(".quizz-questions-options-div");
	parentNode.querySelectorAll('div[onclick="checkCorrect(this)"]').forEach((el) => el.removeAttribute("onclick")); //Removes all onClicks
	el.classList.add("lock-selected");
	parentNode.querySelectorAll(".questions-answer:not(.lock-selected)").forEach((el) => el.classList.add("lock-unselected"));
	parentNode.querySelector(".correct-answer").classList.add("color-right");
	parentNode.querySelectorAll(".wrong-answer").forEach((el) => el.classList.add("color-wrong"));
	el.getAttribute("class").includes("correct-answer") ? (quizzInGame.gameOn === true ? (quizzInGame.rightAnswers += 1) : "") : 0;
	quizzInGame.selected += 1;
	checkEndGame();

	quizzInGame.selected !== 0 && quizzInGame.selected !== quizzInGame.questions
		? setTimeout(() => {
				el.closest(".quizz-questions__quizz-box").nextElementSibling.scrollIntoView({ behavior: "smooth", block: "center" });
		  }, 2000)
		: null;
}

function checkEndGame() {
	quizzInGame.questions === quizzInGame.selected ? loadEndGame() : "";
}

function loadEndGame() {
	const percentage = parseFloat((quizzInGame.rightAnswers / quizzInGame.questions).toFixed(2)) * 100;
	const getRightLevel = quizzInGame.levelsStorage.reduce((acc, el) => (percentage - el.minValue > 0 && el.minValue > acc.minValue ? el : acc));
	const finalHTML = `
	<section class="quizz-completed">
	<div class="quizz-completed__inner-box">
	  <div class="quizz-completed-header-div">
		<p class="completed-status-header">${percentage}% de acerto: ${getRightLevel.title}</p>
	  </div>
	  <div class="quizz-completed-main-content" data-identifier="quizz-result">
		<img src="${getRightLevel.image}" alt="">
		<p>${getRightLevel.text}</p>
	  </div>
	</div>
	<div class="quizz-completed__buttons">
		<button class="quizz-completed__restart-quizz">Reiniciar Quizz</button>
		<p onclick="backToMain()" class="quizz-completed__go-home">Voltar pra home</p>
	</div>
	</section>
	
	`;

	renderQuizz(finalHTML);
	document.querySelector(".quizz-screen").classList.add("end-screen-update-space");
	setTimeout(() => {
		document.querySelector(".quizz-completed").scrollIntoView({ behavior: "smooth" });
	}, 2000);

	quizzInGame.gameOn = false;

	document.querySelector(".quizz-completed__restart-quizz").onclick = () => {
		resetQuizz();
		enterQuizz(quizzInGame.id);
	};
}

function resetQuizz() {
	document.querySelector(".quizz-screen").innerHTML = `
	<div class="rendering-quizz-wrapper">
					<div class="loading-all-quizzes">
						<div class="lds-ripple">
							<div></div>
							<div></div>
						</div>
						<p>Carregando o Quizz...</p>
					</div>
				</div>
	`;
}

function deleteQuizz(id) {
	const answer = confirm("Tem certeza que deseja deletar esse quizz?");

	if (answer) {
		const quizzSorted = myQuizzes.filter((el) => el.id === id);
		const myOtherQuizzes = myQuizzes.filter((el) => el.id !== id);

		myQuizzes = myOtherQuizzes;
		sendToLocalStorage();

		const headers = {
			"Secret-Key": quizzSorted[0].key,
		};

		axios.delete(`${url}/${id}`, { headers }).then(() => {
			alert("Quizz Deletado");
			window.location.reload();
		});
	} else {
		window.location.reload();
	}
}
