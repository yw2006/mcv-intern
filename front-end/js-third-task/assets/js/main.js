const start = document.getElementById("start");
const close_pop = document.getElementById("close_pop");
let countdownInterval;
start.addEventListener('click',startTimer);
close_pop.addEventListener('click',closePopup);
function startTimer() {
      clearInterval(countdownInterval);
      let seconds = parseInt(document.getElementById("secondsInput").value);
      const display = document.getElementById("countdown");
      const sound = document.getElementById("alarmSound");

      if (isNaN(seconds) || seconds <= 0) {
        showPopup("⚠️ Please enter a valid number of seconds!");
        return;
      }

      display.textContent = seconds;

      countdownInterval = setInterval(() => {
        seconds--;
        display.textContent = seconds;

        if (seconds <= 0) {
          clearInterval(countdownInterval);
          sound.play();
          document.getElementById("popup").style.display = "flex";
        }
      }, 1000);
}

function closePopup() {
      document.getElementById("popup").style.display = "none";
}
  