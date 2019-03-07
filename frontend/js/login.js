(function($) {
  "use strict";
  $(document).ready(function(){
    $('#continue').prop('disabled', true);
    $('#agree').change(function() {
      $('#continue').prop('disabled', function(i, val) {
        return !val;
      })
    });
  })

  function checkPasswordMatch() {
    var password = $("#pass").val();
    var confirmPassword = $("#passch").val();

    if (password != confirmPassword)
      $("#divCheckPasswordMatch").html("<p class='pass not_match'>Passwords do not match</p>");
    else
      $("#divCheckPasswordMatch").html("<p class='pass match'>Passwords match</p>");
  }

  $(document).ready(function () {
    $("#pass, #passch").keyup(checkPasswordMatch);
  });
})(jQuery);

