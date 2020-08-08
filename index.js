//question database
const STORE = [
  {
    question:
      "The amount of light or darkness on a photograph is known as the:",
    answers: ["Contrast", "Exposure", "Aperture", "ISO"],
    correctAnswer: "Exposure",
  },
  {
    question: 'The term "Bokeh" is usually used to describe:',
    answers: [
      "The diffraction of light through a lens in an image",
      "The sharpness of an image",
      "The aesthetic quality of the out-of-focus areas in an image",
      "The amount of ambient light in an image",
    ],
    correctAnswer:
      "The aesthetic quality of the out-of-focus areas in an image",
  },
  {
    question:
      "To create a perfect exposure, it is the result of the right mixture of:",
    answers: [
      "ISO, Exposure, and aperture",
      "Shutter speed, ISO, and aperture",
      "Shutter speed, aperture, and resolution",
      "Aperture, ISO, and resolution",
    ],
    correctAnswer: "Shutter speed, ISO, and aperture",
  },
  {
    question:
      "When shooting in a low light setting like a concert, the ISO should be set to:",
    answers: [
      "Generally, between 400 and 1600, depending on the camera",
      "The highest setting on the camera",
      "Any setting, and have your shutter speed set to 2 seconds or longer",
      "The lowest setting on the camera",
    ],
    correctAnswer: "Generally, between 400 and 1600, depending on the camera",
  },
  {
    question: "What is aperture measure in?",
    answers: ["Spots", "F-stops", "Seconds", "Millimeters"],
    correctAnswer: "F-stops",
  },
  {
    question: 'The term "Nifty Fifty" describes:',
    answers: [
      "When you give a client the best 50 photos",
      "A 50mm f1.8 lens",
      "A shutter speed technique",
      "A famed photographer that is older than 50 years old",
    ],
    correctAnswer: "A 50mm f1.8 lens",
  },
  {
    question:
      "If there is dust on your image sensor, it can be best removed by:",
    answers: [
      "Using a rocket blower",
      "Using compressed air",
      "Using eye glass cleaner",
      "NOTHING, send it in for service!",
    ],
    correctAnswer: "Using a rocket blower",
  },
  {
    question: "A low aperture would create:",
    answers: [
      "A grainy image",
      "A clear image",
      "A larger depth of field",
      "A smaller depth of field",
    ],
    correctAnswer: "A larger depth of field",
  },
  {
    question: "A macro lens is a lens that:",
    answers: [
      "Is used for extreme close ups",
      "Is very small in size",
      "Shoots a very wide angle",
      "Create bokeh in an image",
    ],
    correctAnswer: "Is used for extreme close ups",
  },
  {
    question:
      "If you want to capture action in an image without motion blur, you want to set:",
    answers: [
      "Your aperture to a low setting",
      "Your aperture to a high setting",
      "Your shutter speed to 1/125 or faster",
      "Your shutter speed to 1/125 or slower",
    ],
    correctAnswer: "Your shutter speed to 1/125 or faster",
  },
];

//variables to store the quiz score and question number information
let score = 0;
let questionNumber = 0;

//template to generate each question
function generateQuestion() {
  if (questionNumber < STORE.length) {
    return createThing(questionNumber);
  } else {
    $(".questionBox").hide();
    finalScore();
    $(".questionNumber").text(10);
  }
}

//increments the number value of the "score" variable by one
//and updates the "score" number text in the quiz view
function updateScore() {
  score++;
  $(".score").text(score);
}

//increments the number value of the "question number" variable by one
//and updates the "question number" text in the quiz view
function updateQuestionNumber() {
  questionNumber++;
  $(".questionNumber").text(questionNumber + 1);
}

//resets the text value of the "question number" and "score" variables
//and updates their repective text in the quiz view
function resetStats() {
  score = 0;
  questionNumber = 0;
  $(".score").text(0);
  $(".questionNumber").text(0);
}

//begins the quiz
function startQuiz() {
  $(".altBox").hide();
  $(".startQuiz").on("click", ".startButton", function (event) {
    $(".startQuiz").hide();
    $(".questionNumber").text(1);
    $(".questionBox").show();
    $(".questionBox").prepend(generateQuestion());
  });
}

//submits a selected answer and checks it against the correct answer
//runs answer functions accordingly
function submitAnswer() {
  $(".questionBox").on("submit", function (event) {
    event.preventDefault();
    $(".submitButton").replaceWith(
      `<button type="button" class="nextButton button">Next</button>`
    );
    if ($("input:checked").val() === STORE[questionNumber].correctAnswer) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  });
}

//creates html for question form
function createThing(questionIndex) {
  $(".questionBox").html(`<form>
      <legend class="questionText">${STORE[questionIndex].question}</legend>
  </form>`);

  let addAnswer = $(".questionBox").find("form");

  STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
    $(`<label class="sizeMe" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>
      `).appendTo(addAnswer);
  });
  $(
    `<button type="submit" class="submitButton button"> Submit</button > `
  ).appendTo(addAnswer);
}

//resulting feedback if a selected answer is correct
//increments user score by one
function correctAnswer() {
  $(".questionBox").append(`<h3>Your answer is correct!</h3>`);
  $(".questionBox").css("background-color", "rgb(0 ,128, 0, 0.8)");
  updateScore();
}

//resulting feedback if a selected answer is incorrect
function wrongAnswer() {
  $(".questionBox").append(
    `<h3>Sorry, wrong answer...</h3>
    <p class="sizeMe">The answer is: ${STORE[questionNumber].correctAnswer}</p>`
  );
  $(".questionBox").css("background-color", "rgba(255, 0, 0, 0.8)");
}

//generates the next question
function nextQuestion() {
  $(".questionBox").on("click", ".nextButton", function (event) {
    $(".questionBox").css("background-color", "white");
    updateQuestionNumber();
    $(".questionBox form").replaceWith(generateQuestion());
  });
}

//determines final score and feedback at the end of the quiz
function finalScore() {
  $(".final").show();
  if (score >= 8) {
    $(".final").html(
      `<h3>GREAT</h3>
      <h3>Your Score is: ${score}</h3>
      <p>LOOKS LIKE SOMEONE HAS TAKEN THEIR PHOTO</p>
      <button type="submit" class="restartButton button">Restart</button>`
    );
  } else if (score < 8 && score >= 5) {
    $(".final").html(
      `<h3>GOOD</h3>
      <h3>Your Score is: ${score}</h3>
      <p>A LITTLE MORE PRACTICE AND YOULL BE A PRO</p>
      <button type="submit" class="restartButton button">Restart</button>`
    );
  } else {
    $(".final").html(
      `<h3>BAD</h3>
      <h3>Your Score is: ${score}</h3>
      <p>KEEP STUDING</p>
      <button type="submit" class="restartButton button">Restart</button>`
    );
  }
}

//takes user back to the starting view to restart the quiz
function restartQuiz() {
  $(".final").on("click", ".restartButton", function (event) {
    event.preventDefault();
    resetStats();
    $(".altBox").hide();
    $(".startQuiz").show();
  });
}

//runs the functions
function runQuiz() {
  startQuiz();
  generateQuestion();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(runQuiz);
