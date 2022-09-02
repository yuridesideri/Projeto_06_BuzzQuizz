function getQuizzInfo(data) {
	callLocalStorage();

	myQuizzes.push(data.data);

	console.log(myQuizzes);

	const myQuizzesSerialized = JSON.stringify(myQuizzes);
	localStorage.setItem("myQuizzes", myQuizzesSerialized);
	renderMyQuizzes();
	renderCreatedQuizz();
}

function renderCreatedQuizz() {
	const quizz = document.querySelector(".created-quiz");
	const answers = getBasicInfo();
	const id = getQuizzID();
	console.log(id);

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

function goToSucessPageForm(event) {
	event.preventDefault();
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

	document.querySelector(".questions-button").onclick = goToFormLevels;
	document.querySelector(".submit-button").onclick = goToSucessPageForm;
}