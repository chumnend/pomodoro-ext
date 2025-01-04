let timer;
let timeLeft = 25 * 60;

chrome.runtime.onMessage.addListener((message) => {
  switch(message.command) {
    case 'start':
      if(!timer) {
        timer = setInterval(() => {
          timeLeft--;

          const minutes = Math.floor(timeLeft / 60);
          const seconds = timeLeft % 60;

          chrome.runtime.sendMessage({
            command: 'update',
            time: `${minutes}:${seconds.toString().padStart(2, "0")}`,
          });

          if (timeLeft <= 0) {
            clearInterval(timer);
            chrome.notifications.create({
              type: 'basic',
              title: 'Times Up!',
              message: 'Time for a break!',
            });
          }
        }, 1000);
      }
      break;
    case 'reset':
      clearInterval(timer);
      timer = null;
      timeLeft = 25 * 60;
      break;
    default:
      console.log(`unknown message: ${message}`);
      return;
  }
});
