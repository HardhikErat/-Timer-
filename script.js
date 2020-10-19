var time_duration = prompt("Please enter the time duration");

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

const TIME_LIMIT = time_duration;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

startTimer();

function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}


function setClock() {
	const today = new Date();
	const hour = today.getHours();
	const minute = today.getMinutes();
	const second = today.getSeconds();

	document.querySelector(".clock-alt__hours").innerHTML =
		hour.toString().length === 1 ? "0" + hour : hour;
	document.querySelector(".clock-alt__minutes").innerHTML =
		minute.toString().length === 1 ? "0" + minute : minute;
	document.querySelector(".clock-alt__seconds").innerHTML =
		second.toString().length === 1 ? "0" + second : second;

	// Set rotation angles angles
	const hourRotation = (hour % 12) * (360 / 12) + minute * (360 / 12 / 60); // 360deg ÷ 12hours
	const minuteRotation = minute * (360 / 60); // 360deg ÷ 60minutes
	const secondRotation = second * (360 / 60); // 360deg ÷ 60seconds
	document.querySelector(
		".clock__hand.clock__hand--hours"
	).style.transform = `rotate(${hourRotation}deg)`;
	document.querySelector(
		".clock__hand.clock__hand--minutes"
	).style.transform = `rotate(${minuteRotation}deg)`;
	document.querySelector(
		".clock__hand.clock__hand--seconds"
	).style.transform = `rotate(${secondRotation}deg)`;

	setTimeout(setClock, 1000);
}

window.onload = setClock();