document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
      start: "title", // will normally be on the left. if RTL, will be on the right
      center: "", // will normally be on the right. if RTL, will be on the left
      end: "prev,next",
    },
    titleFormat: { year: "numeric", month: "numeric" },

    height: 500,
    showNonCurrentDates: true,
  });
  calendar.render();
});
