const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
  {
    question: "by Including the “img” tag between the “a href” tag and the “a” closing tag?",
    choice1: 'you embed a image ',
    choice2: '4',
    choice3: 'you embed any file ',
    choice4: '17',
    answer: 1,
  },
  {
    question:
      "what does Console.log do",
    choice1: "print",
    choice2: "Display chicken nuggets",
    choice3: "Shanghai",
    choice4: "None of the above",
    answer: 1,
  },
  {
    question: "What are JavaScript types?",
    choice1: "Number, String, Boolean, Function, Object, Null, Undefined",
    choice2: "string",
    choice3: "orangutang ",
    choice4: "33%",
    answer: 3,
  },
  {
    question: "How to set a HTML document's background color?",
    choice1:
"document.bgcolor .",
    choice2: "const",
    choice3: "var",
    choice4: "30%-40%",
    answer: 1,
  },
   {
    question: "Why do i hate Css?",
    choice1: "its hard ",
    choice2: "its unneccesary ",
    choice3: "It takes too much time ",
    choice4: "Im lazy",
    answer: 3,
  },
      {
    question: "Is Bootstrap 3 mobile ?",
    choice1: "its hard ",
    choice2: "its unneccesary ",
    choice3: "yes ",
    choice4: "no",
    answer: 3,
  },{
    question: "What is Javascripts file name?",
    choice1: ".javascript",
    choice2: ".js ",
    choice3: ".fuehfuef ",
    choice4: "orange",
    answer: 2,
  },{
    question: "Choose the correct HTML element for the largest heading",
    choice1: "<head> ",
    choice2: "h6",
    choice3: "h1",
    choice4: "h2",
    answer: 2,
  },{
    question: "What is Css file name ending ?",
    choice1: ".css",
    choice2: ".ultar",
    choice3: "orangutang ",
    choice4: "Im lazy",
    answer: 1,
  },{
    question: "What is a hex code ",
    choice1: "the name for a color  ",
    choice2: "its unneccesary ",
    choice3: "a way to identify a color ",
    choice4: "Im lazy",
    answer: 3,
  },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
  questionCounter = 0
  score = 0
  availableQuestions = [...questions]
  getNewQuestion()
}

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('/end.html')
  }

  questionCounter++
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionsIndex, 1)

  acceptingAnswers = true
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if (classToApply === 'correct') {
      incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()

    }, 1000)
  })
})

incrementScore = num => {
  score += num
  scoreText.innerText = score
}

startGame()