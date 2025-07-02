let apps = document.querySelectorAll(".window");
let z = 1;
apps.forEach((app) => {
  const titleBar = app.querySelector(".title-bar");

  titleBar.addEventListener("mousedown", (e) => {
    // Prevent text from being selected
    e.preventDefault();
    // Initial mouse position
    let prevX = e.pageX;
    let prevY = e.pageY;
    // Window left and top coordinates
    let leftOffset = app.offsetLeft;
    let topOffset = app.offsetTop;
    function mousemove(e) {
      // Change the left and top position in CSS by adding the difference
      // between the current mouse position and intial position
      app.style.left = leftOffset + (e.pageX - prevX) + "px";
      app.style.top = topOffset + (e.pageY - prevY) + "px";
    }
    function mouseup() {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    }
    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
  });

  app.addEventListener("mousedown", () => {
    // Move app above each other when clicked
    z = z + 1;
    app.style.zIndex = z;
  });
});

// Date function
function updateTime() {
  let d = new Date();

  // Set time
  let hours = (d.getHours() < 10 ? "0" : "") + d.getHours();
  let minutes = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
  const timeEm = document.querySelector(".time");
  timeEm.textContent = hours + ":" + minutes;

  // Set date
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
  let day = d.getDay();
  let date = d.getDate();
  let month = d.getMonth() - 1;
  let year = d.getFullYear();
  dateEm.textContent = `${weekdays[day]}, ${date} ${months[month]} ${year}`;

  // Update every 1000ms/1s
  setTimeout(updateTime, 1000);
}

updateTime();
