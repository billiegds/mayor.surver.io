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

function startSurvey() {
  // Hide the intro screen and show the first question screen
  document.getElementById("intro-screen").classList.remove("active");
  document.getElementById("question-screens").classList.add("active");

  loadQuestion();

  // Play the intro video and stop after the first question
  const videoElement = document.getElementById("survey-video");
  videoElement.src = "intro.mp4";
  videoElement.play();
  videoElement.onended = () => {
    if (currentQuestion === 0) {
      // Stop the intro video after the first question starts
      videoElement.pause();
    }
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const videoElement = document.getElementById("survey-video");

  // Automatically play the intro video on page load
  videoElement.src = "intro.mp4";
  videoElement.play();
  videoElement.onended = () => {
    if (currentQuestion === 0) {
      // Stop the intro video after the first question starts
      videoElement.pause();
    }
  };
});

function loadQuestion() {
  const questionText = document.getElementById("question-text");
  const optionButtons = document.querySelectorAll(".option");
  const question = questions[currentQuestion];

  // Update the question text
  questionText.innerText = question.text;

  // Loop over each option button and assign text and video source
  optionButtons.forEach((button, index) => {
    button.innerText = question.options[index];
    button.setAttribute("data-video", question.videos[index]);
    
    // Attach a click listener to each button
    button.onclick = function() {
      nextQuestion(index);  // Pass the selected option index
    };
  });
}

function nextQuestion(optionIndex) {
  const videoElement = document.getElementById("survey-video");
  const selectedButton = document.querySelectorAll(".option")[optionIndex];
  const videoSrc = selectedButton.getAttribute("data-video");

  // Change the video source based on the selected option and autoplay
  videoElement.src = videoSrc;
  videoElement.play();

  // Record the selected response
  responses.push({
    question: questions[currentQuestion].text,
    answer: questions[currentQuestion].options[optionIndex], // Use the selected option
  });

  // Move to the next question or end the survey
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    endSurvey();
  }
}



function endSurvey() {
  document.getElementById("question-screens").classList.remove("active");
  document.getElementById("thankyou-screen").classList.add("active");

  // Call sendToGoogleSheet to save responses
  sendToGoogleSheet();
}

function restartSurvey() {
  const videoElement = document.getElementById("survey-video");

  currentQuestion = 0;
  responses = [];
  document.getElementById("thankyou-screen").classList.remove("active");
  document.getElementById("intro-screen").classList.add("active");

  // Reset the video to the intro and autoplay
  videoElement.src = "intro.mp4";
  videoElement.play();
}

const googleScriptURL_1 =
  "https://script.google.com/macros/s/AKfycbzxnsg3cdXeZJl39w7V_GMQU7ZhDqqqqhfg9Y4f6ssJCiJMwxEUEBmahLoFb3ShIRh1Vw/exec";


// Send responses to Google Sheets
function sendToGoogleSheet() {
  const data = { responses };

  // Send to first Google Script URL
  fetch(googleScriptURL_1, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    mode: "no-cors", // This disables CORS restrictions
  })
    .then((response) => response.json())
    .then((data) => console.log("Success with URL 1:", data))
    .catch((error) => console.error("Error with URL 1:", error));

}