//Global Variables
let allQuizzes = [];
let myQuizzes = [];
let quizzTitle = "";
let quizzImage = "";
let quizzNumQuestions = 0;
let quizzNumLevels = 0;
const url = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";

getAllQuizzes();

/* ---------------- FUNCOES QUE RECEBEM TODOS OS QUIZZES DO SERVIDOR E RENDERIZAM ---------------- */

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

/* ---------------- FUNCOES DOS BOTOES DENTRO DO FORMS (CRIAÇÃO DO QUIZZ) ---------------- */

function goToFormQuestions(event) {
  event.preventDefault();  

  if(validateBasicInfo() === true) {
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
	document.querySelector(".creation-levels").classList.add("hidden");
	document.querySelector(".created-quiz").classList.remove("hidden");
}

/* ---------------- FUNÇÕES QUE PEGAM OS VALORES DO PRIMEIRO FORM E ALOCA DINAMICAMENTE OS PROXIMOS ---------------- */


//Essa função poderia ser desmembrada e reutilizada. 
function gettingBasicInfo() {
	const answers = document.querySelector(".basic-info-wrapper");

	quizzTitle = answers.querySelector("#basic-title").value;
	quizzImage = answers.querySelector("#basic-img").value;
	quizzNumQuestions = answers.querySelector("#basic-questions").value;
	quizzNumLevels = answers.querySelector("#basic-levels").value;

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

        <input type="text" id="question-background" name="question-background" placeholder="Cor de fundo da pergunta">
        <label for="question-background"></label>
          
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
          <img onclick="showQuestion(this)" src="src/images/edit.svg" alt="edit icon">
        </div>

        <div class="question-body hidden">
          <input type="text" id="question-text" name="question-text" placeholder="Texto da pergunta">
          <label for="question-text"></label>

          <input type="text" id="question-background" name="question-background" placeholder="Cor de fundo da pergunta">
          <label for="question-background"></label>
          
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
        <img onclick="showLevel(this)" src="src/images/edit.svg" alt="edit icon">
      </div>

      <div class="level-body">
        <input type="text" id="title-level-1" name="title-level-1" placeholder="Título do nível">
        <label for="title-level-1"></label>

        <input type="text" id="percentage-level-1" name="percentage-level-1" placeholder="% de acerto mínima">
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

          <input type="text" id="percentage-level-${i}" name="percentage-level-${i}" placeholder="% de acerto mínima">
          <label for="percentage-level-${i}"></label>

          <input type="url" id="image-level-${i}" name="image-level-${i}" placeholder="URL da imagem do nível">
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

  quizz.innerHTML = `
    <h3>Seu quizz está pronto!</h3>
    <article class="created-quiz-image">
      <img onclick="enterQuizz()" src="${img}" alt="">
      <div class="created-quiz-image__gradient"></div>
      <span>${title}</span>
    </article>
    <button onclick="enterQuizz()" class="open-quiz-button">Acessar Quiz</button>
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

/* SEMPRE QUE CLICAR NO LOGO DO SITE ELE TRÁS PARA PAGINA INICIAL */

function backToMain() {
	document.querySelector(".main-screen").classList.remove("hidden");
	document.querySelector(".quizz-screen").classList.add("hidden");
	document.querySelector(".creation-screen").classList.add("hidden");
}

/* FUNÇÃO PARA ENTRAR NO QUIZZ, APENAS ABRE A TELA QUE TEM OS FORMS */

function createNewQuizz() {
	document.querySelector(".main-screen").classList.add("hidden");
	document.querySelector(".creation-screen").classList.remove("hidden");
}

/* POR ENQUANTO A FUNÇÃO ENTRAR EM UM QUIZZ AINDA NÃO ESTÁ FUNCIONANDO, ELA NÃO RECEBE ID NENHUM, APENAS ACIONA A TELA DE EXECUÇÃO DE UM QUIZZ */

function enterQuizz(id) { 
	document.querySelector(".main-screen").classList.add("hidden");
	document.querySelector(".quizz-screen").classList.remove("hidden");
}

/*AI JESUS, VOU TENTAR IMITAR A ORGANIZAÇÃO DO HUGO*/

/* FUNCÕES DE VALIDAÇÃO DO FORM*/

//Repetição da função lá de cima, mas agora ela só tem uma responsabilidade, que é get as info.
function getgBasicInfo() {
	const answers = document.querySelector(".basic-info-wrapper");

	quizzTitle = answers.querySelector("#basic-title").value;
	quizzImage = answers.querySelector("#basic-img").value;
	quizzNumQuestions = parseInt(answers.querySelector("#basic-questions").value);
	quizzNumLevels = parseInt(answers.querySelector("#basic-levels").value);

  const info = {
    title: quizzTitle,
    image: quizzImage,
    questions: quizzNumQuestions,
    levels: quizzNumLevels
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
  if (typeof questions !== "number") {
    alert("A quantidade de questões deve ser escrita com algarismos");
    return false;
  } else if (questions < 3) {
    alert("O número de questões deve ser maior ou igual a 3");
    return false;
  } else {
    return true;
  }
};

const validateNumberLevels = (levels) => {
  if (typeof levels !== "number") {
    alert("A quantidade de níveis deve ser escrita com algarismos");
    return false;
  } else if (levels < 2) {
    alert("O número de níveis deve ser maior ou igual a 2");
    return false;
  } else {
    return true;
  }
};

const validateBasicInfo = () => {  
  const basicInfo = getgBasicInfo();

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

    if(text.length < 20) {
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

    if(regex.test(image)) {
      hasSomeUrl = true;
    }
  }

  if(hasSomeUrl === false) {
    alert("A imagem deve ser uma URL");
    return false;
  }

  return true;
}

const validateFormQuestions = () => {
  if (validateCorrectAnswer() === true && validateIncorrectAnswer() === true && validateAnswersImages() === true) {
    return true;
  }
}




document.querySelector(".basic-info-button").onclick = goToFormQuestions;

/* 
  Níveis

  Título do nível: mínimo de 10 caracteres
  % de acerto mínima: um número entre 0 e 100
  URL da imagem do nível: deve ter formato de URL
  Descrição do nível: mínimo de 30 caracteres
  É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%

  Caso alguma validação falhe, deve ser exibida um alerta pedindo para o usuário preencher os dados corretamente. Para simplificar, não é obrigatório informar qual foi a validação que falhou.

  */

function validateLevels() 
{
  const numOfQuestEachLevel = 4;
  const regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  const getLevelNodes = document.querySelectorAll('.level-body').childNodes;
  let trueValidations = 0;
  getLevelNodes.forEach((parentNode, ind) => {
    //Getting each value (of each Level)
    const values = {
      title: parentNode.querySelector("input[placeholder=Título do nível]").value,
      percentage: parentNode.querySelector("input[placeholder=% de acerto mínima").value,
      url: parentNode.querySelector("input[placeholder=URL da imagem do nível").value,
      description: parentNode.querySelector("input[placeholder=URL da imagem do nível").value
    }
    //----------------------Checking each value-----------------------//
    //Título do nível: mínimo de 10 caracteres
    values.title.length >= 10 ? trueValidations++ : alert(`Título do Nível ${ind} com problema`);
    
    //% de acerto mínima: um número entre 0 e 100
    values.percentage < 100 && values.percentage > 0 ? trueValidations++ : alert(`% de acerto do nível ${ind} está com problemas`);

    //URL da imagem do nível: deve ter formato de URL
    regex.test(values.url) ? trueValidations++ : alert(`Url do nível ${ind} não é válido`);

    //Descrição do nível: mínimo de 30 caracteres
    values.description.length >= 30? trueValidations++ : alert(`A descrição do Nível ${ind} está inválida`);
  })
    //É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%
  for (let i = 0; i < getLevelNode.length; i++)
  {
      if (getLevelNode[i].querySelector("input[placeholder=% de acerto mínima").value === 0)
      {
        trueValidations++;
        break;
      }
      else if (i === getLevelNode.length - 1)
      {
        alert(`Pelo menos um nível deve ter a porcentagem 0`);
      }
  }
  return trueValidations === (getLevelNodes.length * numOfQuestEachLevel) + 1;
}










// PROXIMOS PASSOS: 
// 1 - FAZER AS VERIFICAÇÕES DOS FORMS DE FORMA QUE PAREÇA UM ALERT PEDINDO PARA ARRUMAR OS DADOS SE ALGUM FALHAR
// 2 - PASSAR TODOS OS DADOS RECOLHIDOS DOS FORMS PARA UM OBJETO
// 3 - FAZER A FUNÇÃO DE ENVIAR ESSE OBJETO PARA A API, RECEBER O ID DO QUIZZ E SALVAR NO LOCAL STORAGE (PODE DEIXAR QUE EU FAÇO ISSO - HUGO)

// OBS: CRIEI UM JS NOVO CHAMADO "QUIZZMODEL.JS", ELE TEM A ESTRUTURA DO OBJETO QUE DEVE SER CRIADO E ENVIADO PARA A API, PARA FACILITAR A CONSULTA :)