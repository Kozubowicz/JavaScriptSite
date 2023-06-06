document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    contentHeight: 450,
    editable: true,
    selectable: true,
    businessHours: true,
  });
  calendar.render();
});
