function main() {
  updateTime();
}

function updateTime() {
  const timeEm = document.querySelector(".time");
  let date = new Date();
  let hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
  let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  let time = hours + ":" + minutes;
  timeEm.textContent = time;
  setTimeout(updateTime, 1000);
}

main();
