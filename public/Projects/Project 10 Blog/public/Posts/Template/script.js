document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
      start: "prev,next,title", // will normally be on the left. if RTL, will be on the right
      center: "", // will normally be on the right. if RTL, will be on the left
      end: "",
    },
    titleFormat: { year: "numeric", month: "numeric" },

    contentHeight: 450,
    showNonCurrentDates: false,
  });
  calendar.render();
});
