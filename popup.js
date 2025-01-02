const timerText = document.getElementById("timer");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");

startBtn.addEventListener("click", () => {
   chrome.runtime.sendMessage({ command: 'start' });
});

resetBtn.addEventListener("click", () => {
  chrome.runtime.sendMessage({ command: 'reset' });
  timerText.textContent = "25:00";
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.command === "update") {
    timerText.textContent = message.time;
  }
});
