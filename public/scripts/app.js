// Client facing scripts here
var count = 1;
$(function () {
  //shorthand for $(document).ready(function() {

  $("#add-entry").click(function () {
    //Add a new entry to the form evert time button is pressed

    $("#choices").append(
      `
        <div class="row">
          <div class="col-6">
            <div class="form-floating mb-3">
              <input type="text" class="form-control shadow-none choice-container" id="choice-item" name="choices[${count}][title]">
              <label for="floatingInput">choice title</label>
            </div>
          </div>
          <div class="col-6">
            <div class="form-floating mb-3">
              <input type="text" class="form-control shadow-none choice-container" id="choice-description" name="choices[${count}][description]">
              <label for="floatingInput">choice description</label>
            </div>
          </div>
        </div>
      `
    );
    count++;
  });

  let options = Sortable.create(sort, { animation: 150 }); // makes options container sortable

  let initialOrder = options.toArray(); // saves the initial order of the options

  $("#reset-order").click(function () {
    // resets the order of the options
    options.sort(initialOrder);
  });
});
