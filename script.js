document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const startScreen = document.getElementById("start-screen");
  const questionScreen = document.getElementById("question-screen");
  const resultScreen = document.getElementById("result-screen");
  const questionText = document.getElementById("question-text");
  const choicesContainer = document.getElementById("choices");
  const progress = document.getElementById("progress");
  const musicNotice = document.getElementById("music-notice");
  const questionIcon = document.getElementById("question-icon");

  const questions = [
    {
      text: "당신이 원하는 완벽한 휴일 아침 풍경은?",
      icon: "☀️",
      options: ["따뜻한 햇살 아래 산책", "맑은 숲속 명상", "창가에서 책 읽기"],
      score: ["sandalwood", "basil", "blacktea"]
    },
    {
      text: "휴식할 때 자주 찾게 되는 공간은?",
      icon: "🏡",
      options: ["따뜻한 나무 느낌의 공간", "생기 넘치는 정원", "고요한 도서관"],
      score: ["sandalwood", "basil", "blacktea"]
    },
    {
      text: "즐겨 듣는 음악 분위기는?",
      icon: "🎵",
      options: ["깊은 우디 재즈", "상쾌한 피아노", "로파이 비트"],
      score: ["sandalwood", "basil", "blacktea"]
    },
    {
      text: "좋아하는 음료 느낌은?",
      icon: "☕",
      options: ["우디향 커피", "민트차", "홍차"],
      score: ["sandalwood", "basil", "blacktea"]
    },
    {
      text: "하루를 마무리하는 나만의 방법은?",
      icon: "🌙",
      options: ["조명 아래 명상", "상쾌한 샤워", "클래식 음악 듣기"],
      score: ["sandalwood", "basil", "blacktea"]
    },
    {
      text: "힐링이 필요할 때 찾는 자연은?",
      icon: "🌿",
      options: ["숲길", "허브 정원", "바다 풍경"],
      score: ["sandalwood", "basil", "blacktea"]
    },
    {
      text: "좋아하는 공간의 컬러는?",
      icon: "🎨",
      options: ["우드 브라운", "그린 톤", "블랙 앤 화이트"],
      score: ["sandalwood", "basil", "blacktea"]
    },
    {
      text: "자주 듣는 칭찬은?",
      icon: "💬",
      options: ["편안하고 따뜻해", "밝고 생기있어", "차분하고 우아해"],
      score: ["sandalwood", "basil", "blacktea"]
    },
    {
      text: "어울리는 스타일은?",
      icon: "👕",
      options: ["니트와 블랭킷", "밝은 컬러 라운지웨어", "세련된 실크 옷"],
      score: ["sandalwood", "basil", "blacktea"]
    },
    {
      text: "내 방에서 좋아하는 아이템은?",
      icon: "🕯️",
      options: ["우디향 캔들", "싱그러운 화분", "차분한 디퓨저"],
      score: ["sandalwood", "basil", "blacktea"]
    }
  ];

  const scentResult = {
    sandalwood: {
      title: "샌달우드",
      desc1: "당신은 따뜻하고 깊이 있는 휴식을 사랑하는 사람입니다.",
      desc2: "우디한 베이스에 잔잔한 무드를 더한 향을 좋아하는 당신.",
      desc3: "당신은 주변 사람들에게 포근하고 안정감을 주는 사람이에요.",
      desc4: "오늘도 따뜻한 향과 함께 스스로를 감싸주세요.",
      link: "https://yourbrand.com/sandalwood"
    },
    basil: {
      title: "바질앤베티버",
      desc1: "당신은 상쾌하고 활력 있는 휴식을 추구하는 사람입니다.",
      desc2: "허브의 생기와 그린한 노트의 향기를 좋아하는 당신.",
      desc3: "당신은 사람들에게 밝고 생기 있는 에너지를 주는 사람이에요.",
      desc4: "지금, 그린한 숨결로 일상에 리프레시를!",
      link: "https://yourbrand.com/basil-vetiver"
    },
    blacktea: {
      title: "블랙티앤피그",
      desc1: "당신은 차분하고 세련된 휴식을 즐기는 사람입니다.",
      desc2: "부드럽고 고급스러운 블렌딩 향을 선호하는 당신.",
      desc3: "당신은 묵직하면서도 우아한 매력을 지닌 사람이에요.",
      desc4: "고요한 저녁, 블랙티처럼 깊이 있는 순간을 선물하세요.",
      link: "https://yourbrand.com/blacktea-fig"
    }
  };

  let current = 0;
  const scoreMap = { sandalwood: 0, basil: 0, blacktea: 0 };

  startBtn.addEventListener("click", () => {
    startScreen.classList.remove("active");
    questionScreen.classList.remove("hidden");
    questionScreen.classList.add("active");
    document.body.style.backgroundImage = "url('2.png')";
    showQuestion();
  });

  function showQuestion() {
    const q = questions[current];
    questionText.textContent = q.text;
    questionIcon.textContent = q.icon;
    progress.textContent = `${current + 1} / ${questions.length}`;
    choicesContainer.innerHTML = "";
    q.options.forEach((option, i) => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.onclick = () => handleAnswer(q.score[i]);
      choicesContainer.appendChild(btn);
    });
  }

  function handleAnswer(type) {
    scoreMap[type] += 1;
    current++;
    if (current < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    const result = Object.entries(scoreMap).sort((a, b) => b[1] - a[1])[0][0];
    const data = scentResult[result];

    questionScreen.classList.remove("active");
    questionScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    resultScreen.classList.add("active");
    document.body.style.backgroundImage = "url('3.png')";

    document.getElementById("result-title").textContent = data.title;
    document.getElementById("result-desc-1").textContent = data.desc1;
    document.getElementById("result-desc-2").textContent = data.desc2;
    document.getElementById("result-desc-3").textContent = data.desc3;
    document.getElementById("result-desc-4").textContent = data.desc4;
    document.getElementById("result-link").href = data.link;
    document.getElementById("result-quote").textContent = `"${data.desc1}"`;
  }

  document.getElementById("retry-btn").onclick = () => location.reload();
  document.getElementById("copy-url").onclick = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("링크가 복사되었어요!");
  };

  const bgm = new Audio("Eternal Garden - Dan Henig.mp3");
  bgm.loop = true;
  document.body.addEventListener("click", () => {
    if (bgm.paused) {
      bgm.play().catch(e => console.log("자동 재생 차단됨", e));
    }
  }, { once: true });

  musicNotice.classList.remove("hidden");
});
