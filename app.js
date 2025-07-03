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
      // Reposition window if it's outside the screen
      fixPosition();
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
    fixPosition();
  });

  const resizers = app.querySelectorAll(".resizer");
  resizers.forEach((resizer) =>
    resizer.addEventListener("mousedown", (e) => {
      e.preventDefault();
      isResizing = true;
      let currentResizer = e.target;

      let prevX = e.pageX;
      let prevY = e.pageY;

      document.addEventListener("mousemove", mousemove);
      document.addEventListener("mouseup", mouseup);

      function mousemove(e) {
        let rect = app.getBoundingClientRect();

        if (currentResizer.classList.contains("se")) {
          // South-East Corner
          app.style.width = rect.width - (prevX - e.pageX) + "px";
          app.style.height = rect.height - (prevY - e.pageY) + "px";
        } else if (currentResizer.classList.contains("sw")) {
          // South-West Corner
          app.style.width = rect.width + (prevX - e.pageX) + "px";
          app.style.height = rect.height - (prevY - e.pageY) + "px";
          if (rect.width != 275) {
            app.style.left = app.offsetLeft - (prevX - e.pageX) + "px";
          }
        } else if (currentResizer.classList.contains("ne")) {
          // North-East Corner
          app.style.width = rect.width - (prevX - e.pageX) + "px";
          app.style.height = rect.height + (prevY - e.pageY) + "px";
          if (rect.height != 100) {
            app.style.top = app.offsetTop - (prevY - e.pageY) + "px";
          }
        } else {
          // North-West Corner
          app.style.width = rect.width + (prevX - e.pageX) + "px";
          app.style.height = rect.height + (prevY - e.pageY) + "px";
          if (rect.height != 100) {
            app.style.top = app.offsetTop - (prevY - e.pageY) + "px";
          }
          if (rect.width != 275) {
            app.style.left = app.offsetLeft - (prevX - e.pageX) + "px";
          }
        }
        prevX = e.pageX;
        prevY = e.pageY;
      }

      function mouseup() {
        // Check if window is outside of screen
        fixPosition();
        document.removeEventListener("mousemove", mousemove);
        document.removeEventListener("mouseup", mouseup);
      }
    })
  );

  function fixPosition() {
    // Reposition window if it's outside the screen
    let rect = app.getBoundingClientRect();
    if (rect.top < 0) {
      console.log(rect.top);
      app.style.top = 0;
    }
    if (rect.left < -(rect.width - 10)) {
      console.log(rect.left);
      app.style.left = 0;
    }
    if (rect.bottom > window.innerHeight) {
      app.style.top = window.innerHeight - rect.height + "px";
    }
    if (rect.right > window.innerWidth + rect.width - 10) {
      app.style.left = window.innerWidth - rect.width + "px";
    }
  }
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
