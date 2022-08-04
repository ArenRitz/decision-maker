// Client facing scripts here
var count = 1;
$(function () {
  //shorthand for $(document).ready(function() {

  $("#add-entry").click(function () {
    //Add a new entry to the form evert time button is pressed

    $("#choices").append(
      `
      <div class="test-flex">
      <div class="choice-div">
        <div class="form-floating">
          <input type="text" class="form-control shadow-none choice-container choice-title" id="choice-item" required="true" name="choices[${count}][title]">
          <label for="floatingInput">choice title</label>
        </div>
      </div>
      <div class="choice-div">
        <div class="form-floating ">
          <input type="text" class="form-control shadow-none choice-container choice-desc" id="choice-description" name="choices[${count}][description]">
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
