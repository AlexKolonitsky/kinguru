const email = location.href.split('email=')[1];

if(email) {
  $.ajax({
    url: `${urlBack}/${email}`,
    type: 'get',
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    success: function () {
      window.location.href = "index.html";
    }
  });
}


