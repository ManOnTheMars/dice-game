// Тоглоомын бүх газар ашиглагдах хувьсагчдыг зарлана.

// Аль тошглогч дууссан эсэхийг хадгалах төлвийн хувьсагч
var isNewGame;

var activePlayer;

var scores;
// Идэвхтэй тоглогчийн цуглуулж байгаа ээлжийн онноо.
var roundScore;
// Шооны зургийг үзүүлэх элементийг DOM-оос храйж олоод энд хадгалъя.
var diceDom = document.querySelector(".dice");

// Тоглоомыг эхлүүлнэ
initGame();

// Тоглоомыг шинээр эхлэхэд бэлтгэнэ.
function initGame() {
  // шинээр тоглоом эхэллээ гэдэг төлөвт оруулна
  isNewGame = true;

  activePlayer = 0;

  scores = [0, 0];

  roundScore = 0;

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // Тоглогчдын нэрийг буцааж гаргах
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  diceDom.style.display = "none";
}

// Шоог шидэх эвент листенер
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (isNewGame) {
    // 1 - 6 доторх санамсаргүй нэг тоо гаргаж авна.
    var diceNumber = Math.floor(Math.random() * 6) + 1;

    // Шооны зургыг веб дээр гаргаж ирнэ.
    diceDom.style.display = "block";

    // буусан санамсаргүй тоонд харгалзах шооны зургийг веб дээр гаргаж ирнэ.
    diceDom.src = "dice-" + diceNumber + ".png";

    // Буусан тоо нь 1 ээс ялгаатай бол идэвхтэй тоглогчийн оноог нэмэгдүүлнэ.
    if (diceNumber !== 1) {
      // 1 ээс ялгаатай тоо буулаа. Буусан тоог тоглогчид нэмж өгнө.
      roundScore = roundScore + diceNumber;
      document.getElementById("current-" + activePlayer).textContent =
        roundScore;
    } else {
      // 1 буусан тул тоглогчийн ээлжийгн энэ хэсэгт сольж өгнө.
      switchToNextPlayer();
    }
  } else {
    alert("Тогоом дууссан.");
  }
});

// HOLD товчны эвент листенер

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (isNewGame) {
    // Уг тоглогчийн цуглуулсан ээлжийн оноог глобал оноон дээр гэмж өгнө
    //   if (activePlayer === 0) {
    //     scores[0] = scores[0] + roundScore;
    //   } else {
    //     scores[1] = scores[1] + roundScore;
    //   }
    scores[activePlayer] = scores[activePlayer] + roundScore;

    //  Дэлгэц дээр оноог өөрчилнө.
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];

    // Уг тоглогч хожсон эсэхийг шалгах
    if (scores[activePlayer] >= 10) {
      //ТОглоомыг дууссан төлөвт оруулна
      isNewGame = false;
      // Ялагч гэсэн тексийг нэрнийх нь оронд гаргана.
      document.getElementById("name-" + activePlayer).textContent = "WINNER!!!";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
    } else {
      // Тоглогчийн ээлжийг солино.
      switchToNextPlayer();
    }
  } else {
    alert("Тогоом дууссан.");
  }
});

// Энэ фунцк нь тоглог ээлжийг дараагийн тоглогч руу шилжүүлнэ.
function switchToNextPlayer() {
  // Ээлжийн оноог 0 лэнэ
  roundScore = 0;
  document.getElementById("current-" + activePlayer).textContent = 0;

  // тоглогчийн ээлжийг нөгөө тоглогч руу шилжүүлэнэ.

  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  // Улаан цэгийг шилжүүлэх
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // Шоог түр алга болгох
  diceDom.style.display = "none";
}

// Шинэ тоглоом эхлүүлэх товчны эвентлистнер

document.querySelector(".btn-new").addEventListener("click", initGame);
