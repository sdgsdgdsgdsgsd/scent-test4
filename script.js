const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const questionText = document.getElementById('question-text');
const choicesContainer = document.getElementById('choices');
const progress = document.getElementById('progress');
const scentButton = document.getElementById('scent-button');
const resultTitle = document.getElementById('result-title');
const resultQuote = document.getElementById('result-quote');
const resultDescription = document.getElementById('result-description');
const copyUrlButton = document.getElementById('copy-url-button');
const bgMusic = document.getElementById('bg-music');
bgMusic.volume = 0.4;
bgMusic.play().catch(e => console.log("Autoplay failed: ", e));

const scentScores = {
  sandalwood: 0,
  basil: 0,
  blacktea: 0,
};

const questions = [
  {
    text: "당신이 원하는 완벽한 휴일 아침 풍경은?",
    options: [
      { text: "☀️ 따뜻한 햇살 아래 산책", scent: "sandalwood" },
      { text: "🌲 맑은 숲속 명상", scent: "basil" },
      { text: "📖 창가에서 책 읽기", scent: "blacktea" }
    ]
  },
  {
    text: "가장 끌리는 향의 계열은?",
    options: [
      { text: "🌿 우디", scent: "sandalwood" },
      { text: "🌼 플로럴", scent: "basil" },
      { text: "🍋 프루티", scent: "blacktea" }
    ]
  },
  {
    text: "휴일 오후, 당신의 선택은?",
    options: [
      { text: "🎨 취미 시간", scent: "sandalwood" },
      { text: "🛋️ 소파 낮잠", scent: "basil" },
      { text: "📚 독서", scent: "blacktea" }
    ]
  },
  {
    text: "친구들과의 휴식 스타일은?",
    options: [
      { text: "🏞️ 자연 속 소풍", scent: "sandalwood" },
      { text: "☕ 감성 카페", scent: "basil" },
      { text: "🎬 영화 보기", scent: "blacktea" }
    ]
  },
  {
    text: "편안함을 느끼는 장소는?",
    options: [
      { text: "🌊 바닷가", scent: "sandalwood" },
      { text: "🌳 숲속", scent: "basil" },
      { text: "🏠 내 방", scent: "blacktea" }
    ]
  },
  {
    text: "피로할 때 가장 위로가 되는 것은?",
    options: [
      { text: "🕯️ 향기", scent: "sandalwood" },
      { text: "🍲 따뜻한 음식", scent: "basil" },
      { text: "💬 진심 어린 대화", scent: "blacktea" }
    ]
  },
  {
    text: "이상적인 하루의 마무리는?",
    options: [
      { text: "🌌 밤 산책", scent: "sandalwood" },
      { text: "🛁 반신욕", scent: "basil" },
      { text: "🛏️ 일찍 자기", scent: "blacktea" }
    ]
  },
  {
    text: "좋아하는 색감은?",
    options: [
      { text: "🟤 브라운", scent: "sandalwood" },
      { text: "🌿 그린", scent: "basil" },
      { text: "🌫️ 베이지", scent: "blacktea" }
    ]
  },
  {
    text: "당신이 좋아하는 계절은?",
    options: [
      { text: "🍁 가을", scent: "sandalwood" },
      { text: "🌸 봄", scent: "basil" },
      { text: "❄️ 겨울", scent: "blacktea" }
    ]
  },
  {
    text: "가장 듣고 싶은 말은?",
    options: [
      { text: "🌟 넌 참 따뜻한 사람이야", scent: "sandalwood" },
      { text: "🎈 넌 평온한 에너지를 줘", scent: "basil" },
      { text: "🔥 넌 정말 매력 있어", scent: "blacktea" }
    ]
  }
];

let currentQuestion = 0;

startBtn.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  questionScreen.classList.remove('hidden');
  document.body.style.backgroundImage = "url('2.png')";
  showQuestion();
});

function showQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = q.text;
  choicesContainer.innerHTML = '';
  progress.textContent = `${currentQuestion + 1} / ${questions.length}`;

  q.options.forEach(option => {
    const btn = document.createElement('button');
    btn.className = 'choice-button';
    btn.textContent = option.text;
    btn.addEventListener('click', () => handleAnswer(option.scent));
    choicesContainer.appendChild(btn);
  });
}

function handleAnswer(scent) {
  scentScores[scent]++;
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  document.body.style.backgroundImage = "url('3.png')";

  const result = Object.entries(scentScores).sort((a, b) => b[1] - a[1])[0][0];

  if (result === 'sandalwood') {
    resultTitle.textContent = '샌달우드';
    resultQuote.textContent = '"당신은 따뜻하고 깊이 있는 휴식을 사랑하는 사람입니다."';
    resultDescription.innerHTML =
      '우디한 베이스에 잔잔한 무드를 더한 향을 좋아하는 당신.<br>' +
      '당신은 주변 사람들에게 포근하고 안정감을 주는 사람이에요.<br>' +
      '오늘도 따뜻한 향과 함께 스스로를 감싸주세요.';
    scentButton.href = 'https://longtake.co.kr/sandalwood';
  } else if (result === 'basil') {
    resultTitle.textContent = '바질앤베티버';
    resultQuote.textContent = '"당신은 상쾌하고 활력 있는 휴식을 추구하는 사람입니다."';
    resultDescription.innerHTML =
      '허브의 생기와 그린한 노트의 향기를 좋아하는 당신.<br>' +
      '당신은 사람들에게 밝고 생기 있는 에너지를 주는 사람이에요.<br>' +
      '지금, 그린한 숨결로 일상에 리프레시를!';
    scentButton.href = 'https://longtake.co.kr/basil';
  } else {
    resultTitle.textContent = '블랙티앤피그';
    resultQuote.textContent = '"당신은 차분하고 지적인 분위기를 사랑하는 사람입니다."';
    resultDescription.innerHTML =
      '부드럽고 고급스러운 블렌딩 향을 선호하는 당신.<br>' +
      '묵직하면서도 우아한 매력을 지닌 당신에게 어울려요.<br>' +
      '고요한 저녁, 블랙티처럼 깊이 있는 순간을 선물하세요.';
    scentButton.href = 'https://longtake.co.kr/blacktea';
  }
}

copyUrlButton.addEventListener('click', () => {
  navigator.clipboard.writeText(window.location.href);
  alert('🔗 링크가 복사되었어요!');
});

