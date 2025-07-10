let apps = document.querySelectorAll(".window");
let z = 1;
apps.forEach((app) => {
  const titleBar = app.querySelector(".title-bar");
  let maximized = false;

  titleBar.addEventListener("mousedown", (e) => {
    if (!maximized) {
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
    }
  });

  app.addEventListener("mousedown", () => {
    // Move app above each other when clicked
    z = z + 1;
    app.style.zIndex = z;
  });

  const resizers = app.querySelectorAll(".resizer");
  resizers.forEach((resizer) =>
    resizer.addEventListener("mousedown", (e) => {
      if (!maximized) {
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
            if (rect.width != 275 && rect.width != window.innerWidth) {
              app.style.left = app.offsetLeft - (prevX - e.pageX) + "px";
            }
          } else if (currentResizer.classList.contains("ne")) {
            // North-East Corner
            app.style.width = rect.width - (prevX - e.pageX) + "px";
            app.style.height = rect.height + (prevY - e.pageY) + "px";
            if (rect.height != 100 && rect.height != window.innerHeight) {
              app.style.top = app.offsetTop - (prevY - e.pageY) + "px";
            }
          } else {
            // North-West Corner
            app.style.width = rect.width + (prevX - e.pageX) + "px";
            app.style.height = rect.height + (prevY - e.pageY) + "px";
            if (rect.height != 100 && rect.height != window.innerHeight) {
              app.style.top = app.offsetTop - (prevY - e.pageY) + "px";
            }
            if (rect.width != 275 && rect.width != window.innerWidth) {
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
      }
    })
  );

  function fixPosition() {
    // Reposition window if it's outside the screen
    let rect = app.getBoundingClientRect();
    if (rect.top < 0) {
      app.style.top = 0;
    }
    if (rect.left < -rect.width) {
      app.style.left = 0;
    }
    if (rect.bottom > window.innerHeight) {
      app.style.top = window.innerHeight - rect.height + "px";
    }
    if (rect.right > window.innerWidth + rect.width) {
      app.style.left = window.innerWidth - rect.width + "px";
    }
  }

  // Close button
  const closeBtn = app.querySelector(".close");
  closeBtn.addEventListener("click", () => (app.style.display = "none"));
  closeBtn.addEventListener("mousedown", (e) => e.stopPropagation());

  // Minimize button
  const minBtn = app.querySelector(".minimize");
  minBtn.addEventListener("click", () => (app.style.display = "none"));
  minBtn.addEventListener("mousedown", (e) => e.stopPropagation());

  // Maximize button
  const maxBtn = app.querySelector(".maximize");
  maxBtn.addEventListener("click", () => {
    app.classList.toggle("maximized");
    maximized = !maximized;
    z += 1;
    app.style.zIndex = z;
  });
  maxBtn.addEventListener("mousedown", (e) => e.stopPropagation());
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

// Assign apps to their corresponding icons
const dockBtns = document.querySelectorAll(".dock a");
dockBtns.forEach((btn) => {
  btn.addEventListener("click", onclick);

  function onclick(e) {
    let app = document.querySelector("." + btn.getAttribute("data-window"));
    app.style.display = app.style.display === "none" ? "initial" : "none";
    z += 1;
    app.style.zIndex = z;
  }
});

// Hide apps when nav bar is clicked
const navBtns = document.querySelectorAll(".nav-bar a");
navBtns.forEach((btn) => {
  btn.addEventListener("click", onclick);

  function onclick() {
    const apps = document.querySelectorAll(".window");
    apps.forEach((app) => (app.style.display = "none"));
  }
});
