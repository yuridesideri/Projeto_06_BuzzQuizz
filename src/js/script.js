//Global Variables
let allQuizzes = [];
let myQuizzes = [];
const url = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";

getAllQuizzes();

function getAllQuizzes() {
	const promisse = axios.get(`${url}`);
	promisse.then(renderAllQuizzes);
}

function renderAllQuizzes(data) {
	allQuizzes = data.data;

	const quizzes = document.querySelector(".all-quizzes__quizz-list");
	quizzes.innerHTML = "";

	for (let i = 0; i < allQuizzes.length; i++) {
		quizzes.innerHTML += `
    <article onclick="enterQuizz(${allQuizzes[i].id})" class="quizz-list__quizz">
      <img src="${allQuizzes[i].image}" alt="">
      <div class="quizz-list__quizz__gradient"></div>
      <span>${allQuizzes[i].title}</span>
    </article>
    `;
	}
}

const goToFormQuestions = (e) => {
  e.preventDefault();
  document.querySelector(".creation-basic-info").classList.add("hidden");
  document.querySelector(".creation-questions").classList.remove("hidden");
};

const goToFormLevels = (e) => {
  e.preventDefault();
  document.querySelector(".creation-questions").classList.add("hidden");
  document.querySelector(".creation-levels").classList.remove("hidden");
};

const goToSucessPageForm = (e) => {
  e.preventDefault();
  document.querySelector(".creation-levels").classList.add("hidden");
  document.querySelector(".created-quiz").classList.remove("hidden");
};

document.querySelector(".basic-info-button").onclick = goToFormQuestions;
document.querySelector(".questions-button").onclick = goToFormLevels;
document.querySelector(".creation-levels").onclick = goToSucessPageForm;













function backToMain() {
  document.querySelector(".main-screen").classList.remove("hidden");  
  document.querySelector(".quizz-screen").classList.add("hidden"); 
  document.querySelector(".creation-screen").classList.add("hidden");
}

function createNewQuizz() {
  document.querySelector(".main-screen").classList.add("hidden");  
  document.querySelector(".creation-screen").classList.remove("hidden");  
}

function enterQuizz(id) {
  document.querySelector(".main-screen").classList.add("hidden");  
  document.querySelector(".quizz-screen").classList.remove("hidden");  
}