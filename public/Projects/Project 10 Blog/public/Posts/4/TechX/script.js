document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
      start: "title",
      center: "",
      end: "prev,next",
    },
    titleFormat: { year: "numeric", month: "numeric" },

    height: 500,
    showNonCurrentDates: true,
  });
  calendar.render();
});
