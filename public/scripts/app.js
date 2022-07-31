// Client facing scripts here



$(function() {           //shorthand for $(document).ready(function() {

  $("#add-entry").click(function() {  //Add a new entry to the form evert time button is pressed
    $("#entry-list").append(
      `<div class="entry-container">
        <li><input class="entry-input" type='text' name='entry'><input type='text' name='description'></li>
      </div>`
    );
  });


  let options = Sortable.create(sort, { animation: 150 }); // makes options container sortable

  let initialOrder = options.toArray(); // saves the initial order of the options

  $('#reset-order').click(function() {  // resets the order of the options
    options.sort(initialOrder);
  });











});
