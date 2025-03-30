const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");
const questionText = document.getElementById("question-text");
const choicesContainer = document.getElementById("choices");
const progress = document.getElementById("progress");
const resultTitle = document.getElementById("result-title");
const resultDesc = document.getElementById("result-description");
const resultQuote = document.getElementById("result-quote");
const scentButton = document.getElementById("scent-button");
const copyButton = document.getElementById("copy-url-button");
const music = new Audio("Eternal Garden - Dan Henig.mp3");

let currentQuestion = 0;
let answers = {
  sandalwood: 0,
  basil: 0,
  blacktea: 0,
};

const questions = [
  { icon: "🌤️", text: "당신이 원하는 완벽한 휴일 아침 풍경은?", options: [
    { text: "따뜻한 햇살 아래 산책", type: "sandalwood" },
    { text: "맑은 숲속 명상", type: "basil" },
    { text: "창가에서 책 읽기", type: "blacktea" }
  ]},
  { icon: "📚", text: "가장 편안한 휴식 방법은?", options: [
    { text: "조용한 자연 속에서", type: "sandalwood" },
    { text: "활기찬 음악과 함께", type: "basil" },
    { text: "차 한 잔과 함께", type: "blacktea" }
  ]},
  { icon: "🍃", text: "좋아하는 공간의 분위기는?", options: [
    { text: "우디하고 따뜻한", type: "sandalwood" },
    { text: "맑고 생기있는", type: "basil" },
    { text: "차분하고 지적인", type: "blacktea" }
  ]},
  { icon: "🎧", text: "어떤 음악이 힐링이 되나요?", options: [
    { text: "잔잔한 피아노", type: "sandalwood" },
    { text: "자연의 새소리", type: "basil" },
    { text: "재즈와 클래식", type: "blacktea" }
  ]},
  { icon: "☕", text: "휴식 중 마시고 싶은 음료는?", options: [
    { text: "따뜻한 허브티", type: "sandalwood" },
    { text: "레몬워터", type: "basil" },
    { text: "홍차 또는 아메리카노", type: "blacktea" }
  ]},
  { icon: "🌲", text: "좋아하는 자연 풍경은?", options: [
    { text: "짙은 나무와 흙길", type: "sandalwood" },
    { text: "초록빛 풀밭", type: "basil" },
    { text: "이른 아침 안개 숲", type: "blacktea" }
  ]},
  { icon: "🕯️", text: "선호하는 향은?", options: [
    { text: "샌달우드", type: "sandalwood" },
    { text: "바질 앤 베티버", type: "basil" },
    { text: "블랙티 앤 피그", type: "blacktea" }
  ]},
  { icon: "🛋️", text: "집에서 가장 편한 공간은?", options: [
    { text: "따뜻한 거실 소파", type: "sandalwood" },
    { text: "창문 앞 햇살 공간", type: "basil" },
    { text: "서재나 책상", type: "blacktea" }
  ]},
  { icon: "📝", text: "당신을 가장 잘 표현하는 말은?", options: [
    { text: "조용하고 따뜻한 사람", type: "sandalwood" },
    { text: "생기있고 밝은 사람", type: "basil" },
    { text: "지적이고 차분한 사람", type: "blacktea" }
  ]},
  { icon: "🪵", text: "가장 어울리는 분위기는?", options: [
    { text: "따뜻한 우디 감성", type: "sandalwood" },
    { text: "맑고 생기있는 초록빛", type: "basil" },
    { text: "은은한 무게감", type: "blacktea" }
  ]}
];

const results = {
  sandalwood: {
    title: "샌달우드",
    desc: "당신은 고요하고 따뜻한 휴식을 선호하는 사람입니다.",
    quote: "자연 속에 머물 듯한 고요함, 나무 향이 마음을 감싸줍니다.",
    link: "https://yourbrand.com/sandalwood"
  },
  basil: {
    title: "바질앤베티버",
    desc: "당신은 상쾌하고 활력 있는 휴식을 추구하는 사람입니다.",
    quote: "허브의 생기와 그린한 노트가 당신의 에너지를 밝혀줍니다.",
    link: "https://yourbrand.com/basil"
  },
  blacktea: {
    title: "블랙티앤피그",
    desc: "당신은 차분하고 지적인 분위기를 사랑하는 사람입니다.",
    quote: "깊고 고요한 공간에서 향으로 집중을 더해줍니다.",
    link: "https://yourbrand.com/blacktea"
  }
};

function startTest() {
  music.loop = true;
  music.volume = 0.5;
  music.play().catch(() => {
    console.log("User interaction needed to autoplay");
  });

  document.body.style.backgroundImage = "url('2.png')";
  startScreen.classList.add("hidden");
  questionScreen.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  questionText.innerHTML = `
    <div id="question-icon">${q.icon}</div>
    <div class="question-anim">${q.text}</div>
  `;
  progress.textContent = `${currentQuestion + 1} / ${questions.length}`;
  choicesContainer.innerHTML = "";

  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.classList.add("choice-button");
    btn.onclick = () => {
      answers[opt.type]++;
      nextQuestion();
    };
    choicesContainer.appendChild(btn);
  });
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.body.style.backgroundImage = "url('3.png')";
  questionScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  let final = Object.keys(answers).reduce((a, b) => answers[a] > answers[b] ? a : b);
  const res = results[final];

  resultTitle.textContent = res.title;
  resultDesc.textContent = res.desc;
  resultQuote.textContent = `"${res.quote}"`;
  scentButton.href = res.link;
}

startBtn.addEventListener("click", startTest);
copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(window.location.href);
  alert("링크가 복사되었습니다!");
});
