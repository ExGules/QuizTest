// Данные викторины
const quizData = [
    {
        id: 1,
        question: "Какой оператор используется для присваивания значения переменной в JavaScript?",
        type: "multiple",
        options: ["=", "==", "===", ":="],
        correctAnswer: "="
    },
    {
        id: 2,
        question: "Как объявить переменную в JavaScript?",
        type: "multiple",
        options: ["variable x;", "var x;", "let x;", "const x;"],
        correctAnswer: "var x;"
    },
    {
        id: 3,
        question: "Что выведет этот код: console.log(typeof null);?",
        type: "multiple",
        options: ["null", "object", "undefined", "string"],
        correctAnswer: "object"
    },
    {
        id: 4,
        question: "Какой метод добавляет элемент в конец массива?",
        type: "multiple",
        options: ["append()", "push()", "add()", "insert()"],
        correctAnswer: "push()"
    },
    {
        id: 5,
        question: "Что такое DOM в JavaScript?",
        type: "text",
        correctAnswer: "Document Object Model"
    },
    {
        id: 6,
        question: "Как создать функцию в JavaScript?",
        type: "multiple",
        options: [
            "function myFunction() {}",
            "func myFunction() {}",
            "create myFunction() {}",
            "def myFunction() {}"
        ],
        correctAnswer: "function myFunction() {}"
    },
    {
        id: 7,
        question: "Что означает NaN в JavaScript?",
        type: "text",
        correctAnswer: "Not a Number"
    },
    {
        id: 8,
        question: "Какой оператор проверяет равенство и по значению и по типу?",
        type: "multiple",
        options: ["=", "==", "===", "!="],
        correctAnswer: "==="
    },
    {
        id: 9,
        question: "Как добавить комментарий в JavaScript?",
        type: "multiple",
        options: [
            "<!-- комментарий -->",
            "// комментарий",
            "** комментарий **",
            "/* комментарий */"
        ],
        correctAnswer: "// комментарий"
    },
    {
        id: 10,
        question: "Что выведет этот код: console.log('5' + 3);?",
        type: "multiple",
        options: ["8", "53", "Ошибка", "undefined"],
        correctAnswer: "53"
    }
];

// Элементы DOM
const questionText = document.getElementById('question-text');
const multipleChoiceContainer = document.getElementById('multiple-choice-container');
const textAnswerContainer = document.getElementById('text-answer-container');
const optionsContainer = document.getElementById('options-container');
const textAnswerInput = document.getElementById('text-answer');
const submitTextAnswer = document.getElementById('submit-text-answer');
const feedbackContainer = document.getElementById('feedback-container');
const feedbackMessage = document.getElementById('feedback-message');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const currentQuestionElement = document.getElementById('current-question');
const totalQuestionsElement = document.getElementById('total-questions');
const resultsContainer = document.getElementById('results-container');
const finalScoreElement = document.getElementById('final-score');
const scoreTextElement = document.getElementById('score-text');
const restartBtn = document.getElementById('restart-btn');
const reviewContainer = document.getElementById('review-container');
const answersReview = document.getElementById('answers-review');
const hideReviewBtn = document.getElementById('hide-review-btn');
const startBtn = document.getElementById('start-btn');
const quizBody = document.getElementById('quiz-body');

// Переменные состояния викторины
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let showReview = true;

// Инициализация викторины
function initQuiz() {
    totalQuestionsElement.textContent = quizData.length;
    startBtn.addEventListener('click', startQuiz);
}

// Начать викторину
function startQuiz() {
    startBtn.style.display = 'none';
    quizBody.style.display = 'block';
    showQuestion(currentQuestionIndex);
}

// Показать вопрос
function showQuestion(index) {
    const question = quizData[index];
    currentQuestionElement.textContent = index + 1;
    
    // Обновить прогресс бар
    progressBar.style.width = `${((index + 1) / quizData.length) * 100}%`;
    
    // Показать текст вопроса
    questionText.textContent = question.question;
    
    // Показать соответствующий тип ответа
    if (question.type === "multiple") {
        multipleChoiceContainer.style.display = "block";
        textAnswerContainer.style.display = "none";
        renderOptions(question.options);
    } else {
        multipleChoiceContainer.style.display = "none";
        textAnswerContainer.style.display = "block";
        textAnswerInput.value = userAnswers[index] || "";
    }
    
    // Обновить состояние кнопок навигации
    prevBtn.disabled = index === 0;
    nextBtn.disabled = !userAnswers[index];
    
    // Скрыть feedback
    feedbackContainer.style.display = "none";
}

// Отобразить варианты ответов
function renderOptions(options) {
    optionsContainer.innerHTML = "";
    
    options.forEach(option => {
        const button = document.createElement("button");
        button.className = "option-btn";
        button.textContent = option;
        
        // Проверить, был ли уже выбран этот вариант
        if (userAnswers[currentQuestionIndex] === option) {
            button.classList.add("selected");
        }
        
        button.addEventListener("click", () => {
            // Убрать выделение с других вариантов
            document.querySelectorAll(".option-btn").forEach(btn => {
                btn.classList.remove("selected");
            });
            
            // Выделить выбранный вариант
            button.classList.add("selected");
            
            // Сохранить ответ
            userAnswers[currentQuestionIndex] = option;
            nextBtn.disabled = false;
            
            // Автоматически проверяем ответ
            setTimeout(() => checkAnswer(), 500);
        });
        
        optionsContainer.appendChild(button);
    });
}

// Проверить ответ
function checkAnswer() {
    const userAnswer = userAnswers[currentQuestionIndex];
    const correctAnswer = quizData[currentQuestionIndex].correctAnswer;
    
    if (userAnswer && userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()) {
        score++;
        showFeedback("Правильно! 👍", true);
    } else {
        showFeedback(`Неправильно. Правильный ответ: ${correctAnswer}`, false);
    }
}

// Показать обратную связь
function showFeedback(message, isCorrect) {
    feedbackContainer.style.display = "block";
    feedbackMessage.textContent = message;
    feedbackContainer.className = isCorrect ? 
        "feedback-container feedback-correct" : 
        "feedback-container feedback-incorrect";
}

// Показать результаты
function showResults() {
    quizBody.style.display = "none";
    resultsContainer.style.display = "block";
    finalScoreElement.textContent = `${score} / ${quizData.length}`;
    
    // Подобрать текст в зависимости от результата
    if (score === quizData.length) {
        scoreTextElement.textContent = "Идеально! Вы настоящий эксперт JavaScript!";
    } else if (score >= quizData.length * 0.7) {
        scoreTextElement.textContent = "Отличный результат! Вы хорошо знаете основы JavaScript.";
    } else if (score >= quizData.length * 0.5) {
        scoreTextElement.textContent = "Неплохо! Но есть куда стремиться.";
    } else {
        scoreTextElement.textContent = "Попробуйте еще раз! Изучайте основы JavaScript.";
    }
    
    // Показать обзор ответов
    renderAnswersReview();
}

// Отобразить обзор ответов
function renderAnswersReview() {
    reviewContainer.innerHTML = "";
    
    quizData.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer && 
            userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
        
        const reviewItem = document.createElement("div");
        reviewItem.className = isCorrect ? 
            "review-item review-correct" : 
            "review-item review-incorrect";
        
        reviewItem.innerHTML = `
            <div class="review-question">${index + 1}. ${question.question}</div>
            <div class="review-answer">
                <span class="answer-label">Ваш ответ:</span>
                <span class="${isCorrect ? 'user-answer' : 'incorrect-answer'}">${userAnswer || "Нет ответа"}</span>
            </div>
            <div class="review-answer">
                <span class="answer-label">Правильный ответ:</span>
                <span class="correct-answer">${question.correctAnswer}</span>
            </div>
        `;
        
        reviewContainer.appendChild(reviewItem);
    });
}

// Переключить отображение обзора ответов
function toggleAnswersReview() {
    showReview = !showReview;
    answersReview.style.display = showReview ? "block" : "none";
    hideReviewBtn.textContent = showReview ? "Скрыть ответы" : "Показать ответы";
}

// Перезапустить викторину
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    quizBody.style.display = "block";
    resultsContainer.style.display = "none";
    startBtn.style.display = 'block';
    progressBar.style.width = "0%";
}

// Обработчики событий
submitTextAnswer.addEventListener("click", () => {
    userAnswers[currentQuestionIndex] = textAnswerInput.value;
    if (userAnswers[currentQuestionIndex]) {
        checkAnswer();
        nextBtn.disabled = false;
    }
});

nextBtn.addEventListener("click", () => {
    // Проверить ответ при переходе к следующему вопросу
    if (!userAnswers[currentQuestionIndex]) return;
    
    // Перейти к следующему вопросу или показать результаты
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    } else {
        showResults();
    }
});

prevBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
});

restartBtn.addEventListener("click", restartQuiz);
hideReviewBtn.addEventListener("click", toggleAnswersReview);

// Запустить инициализацию при загрузке страницы
window.addEventListener("load", initQuiz);