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
const extraInfo = document.getElementById('extra-info');
const copyUrlButton = document.getElementById('copy-url-button');
const bgMusic = document.getElementById('bg-music');

bgMusic.volume = 0.5;

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
  }
  // 질문 10개로 확장 가능
];

let currentQuestion = 0;

startBtn.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  questionScreen.classList.remove('hidden');
  document.body.style.backgroundImage = "url('2.png')";
  bgMusic.play();
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
    extraInfo.innerHTML = "🎵 어울리는 음악: 재즈 피아노<br>🧳 어울리는 여행지: 강릉, 나무숲길";
    scentButton.href = 'https://longtake.co.kr/sandalwood';
  } else if (result === 'basil') {
    resultTitle.textContent = '바질앤베티버';
    resultQuote.textContent = '"당신은 상쾌하고 활력 있는 휴식을 추구하는 사람입니다."';
    resultDescription.innerHTML =
      '허브의 생기와 그린한 노트의 향기를 좋아하는 당신.<br>' +
      '당신은 사람들에게 밝고 생기 있는 에너지를 주는 사람이에요.<br>' +
      '지금, 그린한 숨결로 일상에 리프레시를!';
    extraInfo.innerHTML = "🎵 어울리는 음악: 어쿠스틱 팝<br>🧳 어울리는 여행지: 제주 숲길, 남이섬";
    scentButton.href = 'https://longtake.co.kr/basil';
  } else {
    resultTitle.textContent = '블랙티앤피그';
    resultQuote.textContent = '"당신은 차분하고 지적인 분위기를 사랑하는 사람입니다."';
    resultDescription.innerHTML =
      '부드럽고 고급스러운 블렌딩 향을 선호하는 당신.<br>' +
      '묵직하면서도 우아한 매력을 지닌 당신에게 어울려요.<br>' +
      '고요한 저녁, 블랙티처럼 깊이 있는 순간을 선물하세요.';
    extraInfo.innerHTML = "🎵 어울리는 음악: 클래식 연주곡<br>🧳 어울리는 여행지: 북촌 한옥길, 파리 골목";
    scentButton.href = 'https://longtake.co.kr/blacktea';
  }
}

copyUrlButton.addEventListener('click', () => {
  navigator.clipboard.writeText(window.location.href);
  alert('🔗 링크가 복사되었어요!');
});
