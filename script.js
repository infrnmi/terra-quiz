const startPage = document.getElementById("start-page");
const startBtn = document.getElementById("start-btn");
const quizBox = document.getElementById("quiz-box");
const storyBox = document.getElementById("story");
const choicesBox = document.getElementById("choices");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const resultName = document.getElementById("result-name");
const resultDesc = document.getElementById("result-description");
const retryBtn = document.getElementById("retry-btn");
const shareBtn = document.getElementById("share-btn");

let currentQuestion = 0;
let score = {};

startBtn.addEventListener("click", () => {
  startPage.classList.add("hidden");
  quizBox.classList.remove("hidden");
  showQuestion();
});

const quizData = [
    {
      story: "One day, you wake up and realize you’ve found yourself stranded on a jungle island… What do you do?",
      answers: [
        { text: "This is all a dream and I will wake up soon", type: "Tonluew" },
        { text: "Look around for essential materials needed for survival", type: "Fuji" },
        { text: "Scream as loud as possible for help", type: "Tonkla" },
      ],
    },
    {
      story: "You look down and find one item for your journey…what is it?",
      answers: [
        { text: "Your phone", type: "Peach" },
        { text: "Your guitar", type: "Phonpa" },
        { text: "Your volleyball", type: "Atip" },
        { text: "Your favorite book", type: "Bowmook" },
      ],
    },
    {
      story: "After walking for a while, you are faced with 3 pathways. Which one do you choose?",
      answers: [
        { text: "The left one", type: "Peach" },
        { text: "The middle one", type: "Atip" },
        { text: "The right one", type: "Fuji" },
      ],
    },
    {
      story: "Turns out all the paths merge into one, and you end up in front of a small cottage. How do you enter?",
      answers: [
        { text: "Eagerly walk into the house, hopefully there will be some food here!", type: "Peach" },
        { text: "Cautiously walk around the outside first before entering.", type: "Smoothie" },
        { text: "Barge inside the house without any care.", type: "Tonkla" },
        { text: "Kindly knock before entering", type: "Bowmook" },
      ],
    },
    {
      story: "You find out that the house is empty. However, after a while of rest, you decide to continue your journey. What’s one item you take from the house?",
      answers: [
        { text: "A bag full of snacks", type: "Peach" },
        { text: "A pair of binoculars", type: "Atip" },
        { text: "A new set of clothes", type: "Tonluew" },
        { text: "A first aid kit", type: "Smoothie" },
      ],
    },
    {
      story: "Suddenly, you hear a rustling noise behind you, what’s your first thought?",
      answers: [
        { text: "Run away as fast as you can", type: "Tonluew" },
        { text: "Square up and prepare to fight", type: "Tonkla" },
        { text: "Look for the nearest hiding spot", type: "Smoothie" },
        { text: "Accept your fate", type: "Fuji" },
      ],
    },
    {
      story: "Too late! The mysterious creature jumps out of hiding, it's a leopard! What do you do?",
      answers: [
        { text: "Scream and cry", type: "Bowmook" },
        { text: "Taunt it", type: "Tonkla" },
        { text: "Try to pet it", type: "Peach" },
        { text: "Meow to communicate", type: "Phonpa" },
      ],
    },
    {
      story: "The leopard says you can ask one question. What do you ask?",
      answers: [
        { text: "Where am I?", type: "Fuji" },
        { text: "How did I get here?", type: "Smoothie" },
        { text: "Can I go home?", type: "Bowmook" },
        { text: "Who are you?", type: "Peach" },
      ],
    },
    {
      story: "The leopard then drops a small mysterious box. What do you do?",
      answers: [
        { text: "Shake it first", type: "Peach" },
        { text: "Open it without thinking", type: "Tonkla" },
        { text: "Refuse to open it, this has to be a trick", type: "Atip" },
        { text: "Open the box slightly, just wide enough to peek at what's inside", type: "Smoothie" },
      ],
    },
    {
      story: "Eventually, you end up opening the box. A pendant sits inside the box.The leopard explains that this pendant is your key to retrn home, all it requires is a single press. What do you do?",
      answers: [
        { text: "Explore the island before using it", type: "Tonkla" },
        { text: "Use it immediately", type: "Tonluew" },
        { text: "Thank the leopard before using", type: "Bowmook" },
        { text: "Use with caution", type: "Smoothie" },
      ],
    },
    {
      story: "You use the pendant and you feel yourself being teleported. In the blur of the moment, you are suddenly reminded of yor most precious memory. What do you recall?",
      answers: [
        { text: "Your first time performing in front of a crowd", type: "Phonpa" },
        { text: "The first time you clutched in your favorite game", type: "Atip" },
        { text: "Discovering your passion for something as a child", type: "Smoothie" },
        { text: "A cozy meal with your family", type: "Peach" },
      ],
    },
    {
      story: "You open your eyes and you’re home! What do you do now?",
      answers: [
        { text: "Tell your friends about your journey, telling them it was just a crazy dream", type: "Peach" },
        { text: "Sleep.", type: "Tonluew" },
        { text: "Hug your loved ones tightly", type: "Fuji" },
        { text: "Keep it to yourself and continue living normally", type: "Atip" },
      ],
    },
  ];
  
  const descriptions = {
    Tonluew: "You're practical, reserved, and independent. You think before you act and prefer comfort over chaos.",
    Fuji: "You're resourceful and thoughtful. You stay calm under pressure and find smart ways to get out of any situation.",
    Tonkla: "You're loud, confident, and bold. You tackle problems head-on and never back down from a challenge.",
    Peach: "You're thoughtful, yet impulsive. You trust your instincts and live in the moment. Even in tough situations, you try to find something familiar and comforting.",
    Phonpa: "You're creative, artistic, and passionate. You use your imagination and passion for music zto guide your path.",
    Atip: "You're competitive, brave, and sometimes stubborn. You like structure, goals, and facing challenges with confidence.",
    Bowmook: "You’re gentle, kind, and thoughtful. You consider others' feelings and value comfort and peace.",
    Smoothie: "You're quiet, clever, and strategic. You think deeply before acting and prioritize safety and understanding."
  };
  
 function showQuestion() {
  const current = quizData[currentQuestion];
  storyBox.textContent = current.story;
  choicesBox.innerHTML = "";
  nextBtn.disabled = true;

  // Progress bar update
  const progressPercent = Math.round((currentQuestion / quizData.length) * 100);
  document.getElementById("progress-bar").style.width = `${progressPercent}%`;

  current.answers.forEach(ans => {
    const btn = document.createElement("button");
    btn.textContent = ans.text;
    btn.classList.add("choice-btn");
    btn.addEventListener("click", () => selectAnswer(ans.type));
    choicesBox.appendChild(btn);
  });
}

function selectAnswer(type) {
  score[type] = (score[type] || 0) + 1;
  Array.from(choicesBox.children).forEach(btn => btn.disabled = true);
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");

  const topResult = Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];

  resultName.textContent = topResult;
  resultDesc.innerHTML = `
    ${descriptions[topResult]}<br/><br/>
    <strong>Vote for the Terra Party for a school journey full of passion and determination!</strong>
  `;

  const resultImg = document.getElementById("result-image");
  resultImg.src = `images/${topResult.toLowerCase()}.png`;
  resultImg.alt = `${topResult} image`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = {};
  resultBox.classList.add("hidden");
  quizBox.classList.remove("hidden");
  showQuestion();
}

function shareResults() {
  const topResult = Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
  const message = `I got ${topResult} on the Terra Character Quiz! Vote Terra Party!`;

  navigator.clipboard.writeText(message).then(() => {
    alert("Result text copied! Make sure to share and tag Terra to be featured on our page!");
    html2canvas(resultBox).then(canvas => {
      canvas.toBlob(function(blob) {
        const link = document.createElement('a');
        link.download = 'my_jungle_quiz_result.png';
        link.href = URL.createObjectURL(blob);
        link.click();
      });
    });
  });
}

retryBtn.addEventListener("click", retryQuiz);
shareBtn.addEventListener("click", shareResults);

// Initial state
startPage.classList.remove("hidden");
quizBox.classList.add("hidden");
resultBox.classList.add("hidden");