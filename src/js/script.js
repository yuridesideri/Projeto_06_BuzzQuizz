//Global Variables
let allQuizzes = [];
let myQuizzes = [];
let quizzTitle = "";
let quizzImage = "";
let quizzNumQuestions = 0;
let quizzNumLevels = 0;

const url = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";

callLocalStorage();
getAllQuizzes();
renderMyQuizzes();
document.querySelector(".basic-info-button").onclick = goToFormQuestions;

/* ---------------- FUNCOES QUE RECEBEM TODOS OS QUIZZES DO SERVIDOR E RENDERIZAM ---------------- */

function getAllQuizzes() {
	const promisse = axios.get(`${url}`);
	promisse.then(renderAllQuizzes);
}

function renderAllQuizzes(data) {
	allQuizzes = data.data;

	document.querySelector(".loading-all-quizzes-wrapper").classList.add("hidden");

	const quizzes = document.querySelector(".all-quizzes__quizz-list");
	quizzes.innerHTML = "";

	for (let i = 0; i < allQuizzes.length; i++) {
		quizzes.innerHTML += `
    <article onclick="enterQuizz(${allQuizzes[i].id})" class="quizz-list__quizz" data-identifier="quizz-card">
      <img src="${allQuizzes[i].image}" alt="">
      <div class="quizz-list__quizz__gradient"></div>
      <span>${allQuizzes[i].title}</span>
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
      <article onclick="enterQuizz(${myQuizzes[i].id})" class="quizz-list__quizz" data-identifier="quizz-card">
        <img src="${myQuizzes[i].image}" alt="">
        <div class="quizz-list__quizz__gradient"></div>
        <span>${myQuizzes[i].title}</span>
      </article>
      `;
		}
		document.querySelector(".my-quizzes__zero-quizzes").classList.add("hidden");
		document.querySelector(".my-quizzes__some-quizzes").classList.remove("hidden");
	}
}

/* ---------------- FUNCOES DOS BOTOES DENTRO DO FORMS (CRIAÇÃO DO QUIZZ) ---------------- */

function goToFormQuestions(event) {
	event.preventDefault();

	if (validateBasicInfo() === true) {
		gettingBasicInfo();
		document.querySelector(".creation-basic-info").classList.add("hidden");
		document.querySelector(".creation-questions").classList.remove("hidden");
	}
}

function goToFormLevels(event) {
	event.preventDefault();
	if (validateFormQuestions() === true) {
		document.querySelector(".creation-questions").classList.add("hidden");
		document.querySelector(".creation-levels").classList.remove("hidden");
	}
}

function goToSucessPageForm(event) {
	event.preventDefault();
	if (validateLevels()) {
		document.querySelector(".creation-levels").classList.add("hidden");
		document.querySelector(".created-quiz").classList.remove("hidden");
	}
	sendNewQuizz();
}

/* ---------------- FUNÇÕES QUE PEGAM OS VALORES DO PRIMEIRO FORM E ALOCA DINAMICAMENTE OS PROXIMOS ---------------- */

function gettingBasicInfo() {
	const answers = getBasicInfo();

	quizzTitle = answers.title;
	quizzImage = answers.image;
	quizzNumQuestions = answers.questions;
	quizzNumLevels = answers.levels;

	renderQuestions(quizzNumQuestions);
	renderLevels(quizzNumLevels);
	renderCreatedQuizz(quizzTitle, quizzImage);

	document.querySelector(".questions-button").onclick = goToFormLevels;
	document.querySelector(".submit-button").onclick = goToSucessPageForm;
}

function renderQuestions(numQuestions) {
	const questions = document.querySelector(".creation-questions");

	questions.innerHTML = `
    <legend>Crie suas perguntas</legend>

    <div class="question-wrapper question-1">
      <div class="question-header">
        <h2>Pergunta 1</h2>
        <img onclick="showQuestion(this)" src="src/images/edit.svg" alt="edit icon">
      </div>

      <div class="question-body">
        <input type="text" id="question-text" name="question-text" placeholder="Texto da pergunta">
        <label for="question-text"></label>

        <div class="color-picker">
              <label for="question-background">Cor de fundo da pergunta</label>
              <input type="color" id="question-background" name="question-background" placeholder="Cor de fundo da pergunta">
        </div>
          
        <h2 class="correct-answer-info">Resposta correta</h2>

        <input type="text" id="correct-answer" name="question-correct-answer" placeholder="Resposta correta">
        <label for="correct-answer"></label>

        <input type="url" id="correct-answer-image" name="correct-answer-image" placeholder="URL da imagem">
        <label for="correct-answer-image"></label>

        <h2 class="incorrect-answer-info">Respostas incorretas</h2>

        <input type="text" id="incorrect-answer-1" name="incorrect-answer-1" placeholder="Resposta incorreta 1" class="incorrect-answers">
        <label for="incorrect-answer-1"></label>

        <input type="url" id="incorret-image-1" name="incorrect-image-1" placeholder="URL da imagem 1" class="answers-image">

        <input type="text" id="incorrect-answer-2" name="incorrect-answer-2" placeholder="Resposta incorreta 2" class="incorrect-answers">
        <label for="incorrect-answer-2"></label>

        <input type="url" id="incorrect-image-2" name="incorrect-image-2" placeholder="URL da imagem 2" class="answers-image">
        <label for="incorrect-answer-2"></label>
          
        <input type="text" id="incorrect-answer-3" name="incorrect-answer-3" placeholder="Resposta incorreta 3" class="incorrect-answers">
        <label for="incorrect-answer-3"></label>

        <input type="url" id="incorrect-image-3" name="incorrect-answer-3" placeholder="URL da imagem 3" class="answers-image">
        <label for="incorrect-image-3"></label>
      </div>
    </div>
  `;

	for (let i = 2; i <= numQuestions; i++) {
		questions.innerHTML += `
      <div class="question-wrapper question-${i}">
        <div class="question-header">
          <h2>Pergunta ${i}</h2>
          <img onclick="showQuestion(this)" src="src/images/edit.svg" alt="edit icon" data-identifier="expand">
        </div>

        <div class="question-body hidden" data-identifier="question-form">
          <input type="text" id="question-text" name="question-text" placeholder="Texto da pergunta">
          <label for="question-text"></label>

          <div class="color-picker">
              <label for="question-background">Cor de fundo da pergunta</label>
              <input type="color" id="question-background" name="question-background" placeholder="Cor de fundo da pergunta">
          </div>
          
          <h2 class="correct-answer-info">Resposta correta</h2>

          <input type="text" id="correct-answer" name="question-correct-answer" placeholder="Resposta correta">
          <label for="correct-answer"></label>

          <input type="url" id="correct-answer-image" name="correct-answer-image" placeholder="URL da imagem" class="answers-image">
          <label for="correct-answer-image"></label>

          <h2 class="incorrect-answer-info">Respostas incorretas</h2>

          <input type="text" id="incorrect-answer-1" name="incorrect-answer-1" placeholder="Resposta incorreta 1" class="incorrect-answers">
          <label for="incorrect-answer-1"></label>

          <input type="url" id="incorret-image-1" name="incorrect-image-1" placeholder="URL da imagem 1" class="answers-image">

          <input type="text" id="incorrect-answer-2" name="incorrect-answer-2" placeholder="Resposta incorreta 2" class="incorrect-answers">
          <label for="incorrect-answer-2"></label>

          <input type="url" id="incorrect-image-2" name="incorrect-image-2" placeholder="URL da imagem 2" class="answers-image">
          <label for="incorrect-answer-2"></label>
          
          <input type="text" id="incorrect-answer-3" name="incorrect-answer-3" placeholder="Resposta incorreta 3" class="incorrect-answers">
          <label for="incorrect-answer-3"></label>

          <input type="url" id="incorrect-image-3" name="incorrect-answer-3" placeholder="URL da imagem 3" class="answers-image">
          <label for="incorrect-image-3"></label>
        </div>
      </div>
    `;
	}

	questions.innerHTML += `
  <button class="questions-button">Prosseguir para criar níveis</button>
  `;
}

function renderLevels(numLevels) {
	const levels = document.querySelector(".creation-levels");

	levels.innerHTML = `
    <legend>Agora, decida os níveis</legend>
            
    <div class="levels-wrapper level-1">
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
      <div class="levels-wrapper level-${i}">
        <div class="level-header">
          <h2>Nível ${i}</h2>
          <img onclick="showLevel(this)" src="src/images/edit.svg" alt="edit icon">
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
  <button class="submit-button">Finalizar Quizz</button>
  `;
}

function renderCreatedQuizz(title, img) {
	const quizz = document.querySelector(".created-quiz");
	const id = getQuizzID();

	quizz.innerHTML = `
    <h3>Seu quizz está pronto!</h3>
    <article class="created-quiz-image">
      <img onclick="enterQuizz(${id})" src="${img}" alt="">
      <div class="created-quiz-image__gradient"></div>
      <span>${title}</span>
    </article>
    <button onclick="enterQuizz(${id})" class="open-quiz-button">Acessar Quiz</button>
    <button onclick="backToMain()" class="homepage-button">Voltar para home</button>
  `;
}

/* ---------------- FUNÇÕES QUE MOSTRAM A PERGUNTA OU LEVEL QUE ANTES ESTAVA ESCONDIDO ---------------- */

function showQuestion(element) {
	const question = element.parentNode.parentNode.querySelector(".question-body");
	question.classList.toggle("hidden");
}

function showLevel(element) {
	const level = element.parentNode.parentNode.querySelector(".level-body");
	level.classList.toggle("hidden");
}

/* FUNÇÕES DE NAVEGAÇÃO */

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
	document.querySelector(".creation-screen").classList.add("hidden");
	document.querySelector(".main-screen").classList.add("hidden");
	document.querySelector(".quizz-screen").classList.remove("hidden");
	downloadQuizz(id);
}

/* -------------------FUNCÕES DE *VALIDAÇÃO* DO FORM && Criação de objeto *NEW QUIZZ*-------------------*/

function getBasicInfo() {
	const answers = document.querySelector(".basic-info-wrapper");

	quizzTitle = answers.querySelector("#basic-title").value;
	quizzImage = answers.querySelector("#basic-img").value;
	quizzNumQuestions = parseInt(answers.querySelector("#basic-questions").value);
	quizzNumLevels = parseInt(answers.querySelector("#basic-levels").value);

	const info = {
		title: quizzTitle,
		image: quizzImage,
		questions: quizzNumQuestions,
		levels: quizzNumLevels,
	};

	return info;
}

const validateQuizTitle = (title) => {
	if (title.length < 20) {
		alert("O título deve ter pelo menos 20 caracteres!");
		return false;
	} else if (title.length > 65) {
		alert("O título pode ter no máximo 65 caracteres!");
		return false;
	} else {
		return true;
	}
};

const validateImageUrl = (string) => {
	const regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

	if (!regex.test(string)) {
		alert("O endereço da imagem deve ser uma URL");
		return false;
	} else {
		return true;
	}
};

const validateNumberQuestions = (questions) => {
	if (questions < 3) {
		alert("O número de questões deve ser maior ou igual a 3");
		return false;
	} else {
		return true;
	}
};

const validateNumberLevels = (levels) => {
	if (levels < 2) {
		alert("O número de níveis deve ser maior ou igual a 2");
		return false;
	} else {
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
	const questions = document.querySelectorAll("input[name=question-text]");

	for (let i = 0; i < questions.length; i++) {
		let question = questions[i];
		let text = question.value;

		if (text.length < 20) {
			alert("O texto da pergunta deve ter pelo menos 20 caracteres");
			return false;
		}
	}

	return true;
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
	const answers = document.querySelectorAll("input[name=question-correct-answer]");

	if (answers.length === 0) {
		alert("A resposta correta não pode ficar em branco");
		return false;
	}

	for (let i = 0; i < answers.length; i++) {
		let answer = answers[i].value;

		if (answer.length === 0) {
			alert("A resposta correta não pode ficar em branco");
			return false;
		}
	}

	return true;
};

const validateIncorrectAnswer = () => {
	const answers = document.querySelectorAll(".incorrect-answers");
	let hasSomeAnswer = false;

	for (let i = 0; i < answers.length; i++) {
		let answer = answers[i].value;

		if (answer.length !== 0) {
			hasSomeAnswer = true;
		}
	}

	if (hasSomeAnswer === false) {
		alert("Você deve inserir pelo menos uma resposta incorreta para cada pergunta");
		return false;
	}

	return true;
};

const validateAnswersImages = () => {
	const images = document.querySelectorAll(".answers-image");
	const regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
	let hasSomeUrl = false;

	for (let i = 0; i < images.length; i++) {
		let image = images[i].value;

		if (regex.test(image)) {
			hasSomeUrl = true;
		}
	}

	if (hasSomeUrl === false) {
		alert("A imagem deve ser uma URL");
		return false;
	}

	return true;
};

const validateFormQuestions = () => {
	if (validateCorrectAnswer() === true && validateIncorrectAnswer() === true && validateAnswersImages() === true) {
		return true;
	}
};

function validateLevels() {
	const numOfQuestEachLevel = 4;
	const regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
	const getLevelNodes = document.querySelectorAll(".level-body");
	let trueValidations = 0;
	getLevelNodes.forEach((parentNode, ind) => {
		//Getting each value (of each Level)
		const values = {
			title: parentNode.querySelector("input[placeholder='Título do nível']").value,
			percentage: parentNode.querySelector("input[placeholder='% de acerto mínima']").value,
			url: parentNode.querySelector("input[placeholder='URL da imagem do nível']").value,
			description: parentNode.querySelector("input[placeholder='URL da imagem do nível']").value,
		};
		//----------------------Checking each value-----------------------//
		//Título do nível: mínimo de 10 caracteres
		values.title.length >= 10 ? trueValidations++ : alert(`Título do Nível ${ind} com problema`);

		//% de acerto mínima: um número entre 0 e 100
		values.percentage <= 100 && values.percentage >= 0 ? trueValidations++ : alert(`% de acerto do nível ${ind} está com problemas`);

		//URL da imagem do nível: deve ter formato de URL
		regex.test(values.url) ? trueValidations++ : alert(`Url do nível ${ind} não é válido`);

		//Descrição do nível: mínimo de 30 caracteres
		values.description.length >= 30 ? trueValidations++ : alert(`A descrição do Nível ${ind} está inválida`);
	});
	//É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%
	for (let i = 0; i < getLevelNodes.length; i++) {
		if (getLevelNodes[i].querySelector("input[placeholder='% de acerto mínima']").value === "0") {
			trueValidations++;
			break;
		} else if (i === getLevelNodes.length - 1) {
			alert(`Pelo menos um nível deve ter a porcentagem 0`);
		}
	}
	return trueValidations === getLevelNodes.length * numOfQuestEachLevel + 1 ? true : false;
}

function newQuizz() {
	const newQuizz = {
		title: "",
		image: "",
		questions: [],
		levels: [],
	};
	const info = getBasicInfo();
	const levelsObject = [];
	const finalQuestionObject = [];
	document.querySelectorAll(".question-body").forEach((el) => {
		const questionObject = {
			title: "",
			color: "",
			answers: [
				{
					text: "Texto da resposta 1",
					image: "https://http.cat/411.jpg",
					isCorrectAnswer: true,
				},
			],
		};
		questionObject.title = el.querySelector("#question-text").value;
		questionObject.color = el.querySelector("#question-background").value;
		const inputs = el.querySelectorAll("input:not(#question-text):not(#question-background)");
		questionObject.answers[0].text = el.querySelector("#correct-answer").value;
		questionObject.answers[0].image = el.querySelector("#correct-answer-image").value;
		questionObject.answers[0].isCorrectAnswer = true;
		for (let i = 0; i < inputs.length - 2; i += 2) {
			const tmpObject = {
				title: inputs[i].value,
				image: inputs[i++].value,
				isCorrectAnswer: false,
			};
			questionObject.answers.push(tmpObject);
		}
		finalQuestionObject.push(questionObject);
	});

	document.querySelectorAll(".level-body").forEach((el) => {
		const inputs = el.querySelectorAll("input");
		const tmpObject = {
			title: inputs[0].value,
			image: inputs[3].value,
			text: inputs[2].value,
			minValue: Number(inputs[1].value),
		};
		levelsObject.push(tmpObject);
	});

	newQuizz.title = info.title;
	newQuizz.image = info.image;
	newQuizz.questions = finalQuestionObject;
	newQuizz.levels = levelsObject;

	return newQuizz;
}

/*---------------------------- FUNÇÕES DE EXBIÇÃO DO QUIZZ -------------------------------*/

function downloadQuizz(id) {
	axios.get(`${url}/${id}`).then(quizzHtmlCreation);
}
function quizzHtmlCreation(data) {
	const quizzObject = data.data;
	console.log(quizzObject);
	//Criação dinâmica de HTML
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
            <div class="quizz-question-header-div" style="bakcground-color:${el.color}" data-identifier="question">
              <p class="question-header">${el.title}</p>
            </div>
            <div class="quizz-questions-options-div">
      
            ${el.answers
							.map((newEl) => {
								return `
                <div class="questions-answer answer-1 ${newEl.isCorrectAnswer ? "correct-answer" : "wrong-answer"}" data-identifier="answer">
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
    <section class="quizz-completed">
      <div class="quizz-completed__inner-box">
        <div class="quizz-completed-header-div">
          <p class="completed-status-header">Pergunta Pergunta Pergunta</p>
        </div>
        <div class="quizz-completed-main-content" data-identifier="quizz-result">
          <img src="" alt="">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Culpa, quae sequi! Ipsam, ullam facere tenetur ducimus distinctio 
            laudantium nostrum magni quas eligendi suscipit earum sequi! 
            Consectetur amet ratione inventore magni!</p>
        </div>
      </div>
      <div class="quizz-completed__buttons">
        <button class="quizz-completed__restart-quizz">Reiniciar Quizz</button>
        <p class="quizz-completed__go-home">Voltar pra home</p>
      </div>
    </section>
    `;
	renderQuizz(newHTML); //A última section remete à finalização do jogo e onde deve interagir a % de acerto com os níveis
}

function renderQuizz(render) {
	document.querySelector(".quizz-screen").innerHTML = render;
}

function sendNewQuizz() {
	let quizzModelo = {
		title: "Título fsdfsdfsdfsdfgdfgf sf sddfgquizz",
		image: "https://http.cat/411.jpg",
		questions: [
			{
				title: "Título da pergunta 1",
				color: "#123456",
				answers: [
					{
						text: "Texto da resposta 1",
						image: "https://http.cat/411.jpg",
						isCorrectAnswer: true,
					},
					{
						text: "Texto da resposta 2",
						image: "https://http.cat/412.jpg",
						isCorrectAnswer: false,
					},
				],
			},
			{
				title: "Título da pergunta 2",
				color: "#123456",
				answers: [
					{
						text: "Texto da resposta 1",
						image: "https://http.cat/411.jpg",
						isCorrectAnswer: true,
					},
					{
						text: "Texto da resposta 2",
						image: "https://http.cat/412.jpg",
						isCorrectAnswer: false,
					},
				],
			},
			{
				title: "Título da pergunta 3",
				color: "#123456",
				answers: [
					{
						text: "Texto da resposta 1",
						image: "https://http.cat/411.jpg",
						isCorrectAnswer: true,
					},
					{
						text: "Texto da resposta 2",
						image: "https://http.cat/412.jpg",
						isCorrectAnswer: false,
					},
				],
			},
		],
		levels: [
			{
				title: "Título do nível 1",
				image: "https://http.cat/411.jpg",
				text: "Descrição do nível 1",
				minValue: 0,
			},
			{
				title: "Título do nível 2",
				image: "https://http.cat/412.jpg",
				text: "Descrição do nível 2",
				minValue: 50,
			},
		],
	};

	const promisse = axios.post(`${url}`, quizzModelo);
	promisse.then(getQuizzInfo);
}

function getQuizzInfo(data) {
	callLocalStorage();

	myQuizzes.push(data.data);

	const myQuizzesSerialized = JSON.stringify(myQuizzes);
	localStorage.setItem("myQuizzes", myQuizzesSerialized);
	renderMyQuizzes();
}

function callLocalStorage() {
	const myQuizzesSerialized = localStorage.getItem("myQuizzes");

	if (myQuizzesSerialized !== null) {
		myQuizzes = JSON.parse(myQuizzesSerialized);
	}
}

function getQuizzID() {
	let id = myQuizzes[myQuizzes.length - 1].id;
	return id;
}
