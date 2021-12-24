//find the input from the html with the id of search and on keyup run IDFE
        $("#search").on("keyup", function() {
//create varuble called value and filter case by getting the value and setting it to lowercase
          var value = $(this).val().toLowerCase();
          $("#stock td").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
