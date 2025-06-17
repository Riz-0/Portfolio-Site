function main() {
  updateTime();
}

function updateTime() {
  let d = new Date();

  // Set time
  let hours = (d.getHours() < 10 ? "0" : "") + d.getHours();
  let minutes = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
  const timeEm = document.querySelector(".time");
  timeEm.textContent = hours + ":" + minutes;

  // Set date
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dateEm = document.querySelector(".date");
  let day = d.getDay() - 1;
  let date = d.getDate();
  let month = d.getMonth() - 1;
  let year = d.getFullYear();
  dateEm.textContent = `${weekdays[day]}, ${date} ${months[month]} ${year}`;

  // Update every 1000ms/1s
  setTimeout(updateTime, 1000);
}

main();
