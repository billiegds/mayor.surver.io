const questions = [
  {
    text: "Who do you think would be the best candidate to lead the community into a brighter future?",
    options: ["Ricky Santos Buenaventura","Omeng Ramos",],
    videos: ["good_choice.mp4", "are_you_sure.mp4"],
  },
  {
    text: "Which candidate do you trust more to prioritize community welfare?",
    options: ["Ricky Santos Buenaventura","Omeng Ramos",],
    videos: ["good_choice.mp4", "are_you_sure.mp4"],
  },
  {
    text: "Who would you prefer to handle the local economy and improve job opportunities?",
    options: ["Ricky Santos Buenaventura","Omeng Ramos",],
    videos: ["good_choice.mp4", "are_you_sure.mp4"],
  },
  {
    text: "Which candidate do you believe will do the most for local education and schools?",
    options: ["Ricky Santos Buenaventura","Omeng Ramos",],
    videos: ["good_choice.mp4", "are_you_sure.mp4"],
  },
  {
    text: "Who would you vote for if you want better healthcare facilities and services in the area?",
    options: ["Ricky Santos Buenaventura","Omeng Ramos",],
    videos: ["good_choice.mp4", "are_you_sure.mp4"],
  },
  {
    text: "Which candidate do you think has the best leadership qualities for handling public safety and security?",
    options: ["Ricky Santos Buenaventura","Omeng Ramos",],
    videos: ["good_choice.mp4", "are_you_sure.mp4"],
  },
  {
    text: "Who is more committed to fighting corruption and promoting transparency in local government?",
    options: ["Ricky Santos Buenaventura","Omeng Ramos",],
    videos: ["good_choice.mp4", "are_you_sure.mp4"],
  },
  {
    text: "Which candidate do you think will improve infrastructure and public transportation in your community?",
    options: ["Ricky Santos Buenaventura","Omeng Ramos",],
    videos: ["good_choice.mp4", "are_you_sure.mp4"],
  },
  {
    text: "Who would you choose to bring positive change and development to the local agriculture industry?",
    options: ["Ricky Santos Buenaventura","Omeng Ramos",],
    videos: ["good_choice.mp4", "are_you_sure.mp4"],
  },
  {
    text: "Which candidate do you believe will create a stronger sense of unity and collaboration within the community?",
    options: ["Ricky Santos Buenaventura","Omeng Ramos",],
    videos: ["good_choice.mp4", "are_you_sure.mp4"],
  },
];

let currentQuestion = 0;
let responses = [];
let userDetails = {
  name: '',
  address: ''
};

// Store name and address when the form is submitted
document.getElementById('user-details-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Collect name and address from input fields
  userDetails.name = document.getElementById('name').value;
  userDetails.address = document.getElementById('address').value;

  // Hide intro screen and show the question screen
  document.getElementById("intro-screen").classList.add("hidden");
  document.getElementById("question-screens").classList.add("active");

  // Load the first question
  loadQuestion();
});

// Load the current question and its options
function loadQuestion() {
  const questionText = document.getElementById("question-text");
  const optionButtons = document.querySelectorAll(".option");

  const question = questions[currentQuestion];

  // Display the question and the options
  questionText.innerText = question.text;

  optionButtons.forEach((button, index) => {
    button.innerText = question.options[index];
    button.setAttribute("data-video", question.videos[index]);

    button.onclick = function () {
      nextQuestion(index);
    };
  });
}

// Process the answer and move to the next question
function nextQuestion(optionIndex) {
  const videoElement = document.getElementById("survey-video");
  const selectedButton = document.querySelectorAll(".option")[optionIndex];
  const videoSrc = selectedButton.getAttribute("data-video");

  // Play the corresponding video
  videoElement.src = videoSrc;
  videoElement.play();

  // Record the answer to the question
  responses.push({
    question: questions[currentQuestion].text,
    answer: questions[currentQuestion].options[optionIndex]
  });

  currentQuestion++;

  // Move to the next question or end the survey
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    endSurvey();
  }
}

// End the survey and thank the user
function endSurvey() {
  document.getElementById("question-screens").classList.remove("active");
  document.getElementById("thankyou-screen").classList.add("active");

  // Send the responses to the backend
  sendToGoogleSheet();
}

// Send the collected responses to a Google Sheet or server
function sendToGoogleSheet() {
  const data = {
    userDetails,
    responses
  };

  const googleScriptURL =
    "https://script.google.com/macros/s/AKfycbzxnsg3cdXeZJl39w7V_GMQU7ZhDqqqqhfg9Y4f6ssJCiJMwxEUEBmahLoFb3ShIRh1Vw/exec";

  fetch(googleScriptURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    mode: "no-cors",
  })
    .then((response) => response.json())
    .then((data) => console.log("Success:", data))
    .catch((error) => console.error("Error:", error));
}

// Start Survey function
function startSurvey() {
  // Get the survey container and check if it exists
  const surveyContainer = document.getElementById('name-address-fields');
  
  if (surveyContainer) {
    surveyContainer.classList.add('screen', 'active'); // Add active class to show the survey screen
    surveyContainer.style.display = 'none'; // Hide the name-address-fields after starting the survey
  } else {
    console.error("Survey container not found.");
  }

  // Hide the intro screen
  const introScreen = document.getElementById('intro-screen');
  if (introScreen) {
    introScreen.classList.remove('active'); // Remove active class to hide the intro screen
  } else {
    console.error("Intro screen not found.");
  }
}


// Enable the "Start Now" button when the form is valid and the checkbox is checked
function toggleSubmitButton() {
  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const checkbox = document.getElementById('data-privacy-checkbox').checked;
  const startSurveyBtn = document.getElementById('start-survey-btn');

  // Enable the button only if name, address are filled and the checkbox is checked
  if (name && address && checkbox) {
    startSurveyBtn.disabled = false;
  } else {
    startSurveyBtn.disabled = true;
  }
}
// Initialize the button state on page load
document.addEventListener('DOMContentLoaded', function () {
  toggleSubmitButton();
});
