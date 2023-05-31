//if the document is ready/loaded
$(document).ready(function () {
    //a new button will be appended to the page, which will be used to go back at the starting page
  $("body").append(
    '<a href="index.html"><button class="backButton">Back</button></a>'
  );
  //define the score and the questions for the user
  var score = 0;
  //the questions are into 3 different parts defided, we have the question, the different options & the correct answer for each question
  var questions = [
    {
      question: "What does the abbreviation BINFO stand for??",
      options: [
        "Bachelor in Applied Information Technlogy",
        "Bachelor in Applied Science",
        "Bachelor in Computer Science",
        "Bachelor in Information",
      ],
      answer: 0,
    },
    {
      question: "How long does the BINFO study last? (in year(s))",
      options: ["1", "2", "3", "4"],
      answer: 2,
    },
    {
      question: "Are all binfo courses in english?",
      options: ["Yes", "No"],
      answer: 1,
    },
    {
      question: "Who is the course director of BINFO??",
      options: [
        "Volker Müller",
        "Sandra Rosin",
        "Steffen Rothkugel",
        "Bernard Steenis",
      ],
      answer: 0,
    },
    {
      question: "What does the abbrevation RAM stand for ?",
      options: [
        "Random Access Module",
        "Randomly Access Memory ",
        "Random Access Memory",
        "Retains Access Memory",
      ],
      answer: 2,
    },
    {
      question: "What was the year of creation of the internet?",
      options: ["1945", "1983", "1965", "1978"],
      answer: 2,
    },
    {
      question: "What is the derivate of ln(x)?",
      options: ["1/x", "x/1", "2ln(x)", "1"],
      answer: 0,
    },
    {
      question: "What is the value of sin(60°)",
      options: ["0", "1", "sqrt(3)/2", "sqrt(2)/2"],
      answer: 3,
    },
    {
      question: "What is the binary value of 8 ?",
      options: ["1000", "1001", "0100", "1010"],
      answer: 0,
    },
    {
      question: "Who create the operating system Linux ?",
      options: ["Ken Thompson", "Bill Gates", "Linus Torvald", "Henry Leland"],
      answer: 2,
    },
    {
      question:
        "Which of the following command allows you to list the content of a folder ?",
      options: ["rm", "sl", "cd", "ls"],
      answer: 3,
    },
    {
      question: "Is java an object oriented programming language ?",
      options: ["true", "false"],
      answer: 0,
    },
  ];
  //define a question for the current one
  var currentQuestion = 0;
  //a function to show the question(s) and his options on the page
  function showQuestion() {
    var questionObj = questions[currentQuestion];
    var question = questionObj.question;
    var options = questionObj.options;

    var showQuestionDiv = document.getElementById("showQuestionDiv");
    showQuestionDiv.innerHTML = question;

    var optionsDiv = document.getElementById("optionsDiv");
    optionsDiv.innerHTML = "";

    for (var s = 0; s < options.length; s++) {
      var option = document.createElement("button");
      option.innerHTML = options[s];
      option.className = "options";
      option.value = s;
      option.onclick = check;
      optionsDiv.appendChild(option);
    }
  }
  //this function checks the user's choosen option, updates the score & moves to the next question 
  function check(event) {
    var selectedOption = event.target.value;
    var questionObj = questions[currentQuestion];
    var correctAnswer = questionObj.answer;

    if (selectedOption == correctAnswer) {
      score++;
    }

    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
        //show the retry button to have the possibility to redo the quiz
      var retryButton = document.createElement("button");
      retryButton.innerHTML = "Retry";
      retryButton.className = "opButtons";
      retryButton.onclick = retryQuiz;

      var optionsDiv = document.getElementById("optionsDiv");
      optionsDiv.innerHTML = "";
      optionsDiv.appendChild(retryButton);
        //show the score at the end of the quiz
      alert("All questions answered! Score: " + score);
    }
  }
  // a retry function which allows you to redo the quiz, by setting the current question at 0 again, the score at 0 and shows the question again
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    showQuestion();
  }
//show the question(s)
  showQuestion();
  
});
