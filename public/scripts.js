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

$(function () {
  const uploadArea = $("#uploadArea");

  uploadArea.on("click", () => {
    $('<input type="file" accept="image/*">')
      .on("change", function () {
        uploadFile(this.files[0]);
      })
      .click();
  });

  uploadArea.on("dragover", (e) => {
    e.preventDefault();
    uploadArea.addClass("dragover");
  });

  uploadArea.on("dragleave", () => uploadArea.removeClass("dragover"));

  uploadArea.on("drop", (e) => {
    e.preventDefault();
    uploadArea.removeClass("dragover");
    const file = e.originalEvent.dataTransfer.files[0];
    uploadFile(file);
  });

  function uploadFile(file) {
    if (!file || !file.type.startsWith("image/")) {
      $("#uploadStatus").text("Please upload a valid image.");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);

    $.ajax({
      url: "/upload",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: (res) => {
        $("#uploadStatus").text("Upload successful: " + res.filename);
      },
      error: (err) => {
        $("#uploadStatus").text("Upload failed.");
      },
    });
  }
});
