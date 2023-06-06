document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
      //start: "title", // will normally be on the left. if RTL, will be on the right
      center: "",
      end: "prev,next", // will normally be on the right. if RTL, will be on the left
    },
    titleFormat: { year: "numeric", month: "numeric" },
    contentHeight: 450,
    editable: true,
    selectable: true,
    businessHours: true,
  });
  calendar.render();
});
