$(function () {
  $.ajax({
    url: "http://numbersapi.com/1/30/date?json",
    dataType: "json",
    success: function (data) {
      const jsonText = JSON.stringify(data, null, 2);
      $("#responseBox").val(jsonText);
      const display = $("#displayArea");
      display.empty();

      $.each(data, function (key, value) {
        display.append(
          `<div><strong>${key}:</strong> ${JSON.stringify(value)}</div>`
        );
      });
    },
    error: function () {
      $("#responseBox").val("Error fetching data.");
      $("#displayArea").text("Error fetching data.");
    },
  });
});
