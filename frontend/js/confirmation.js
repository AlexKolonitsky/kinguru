const email = location.href.split('email=')[1];

if(email) {
  $.ajax({
    url: `http://ec2-35-158-84-70.eu-central-1.compute.amazonaws.com:3010/user/confirmation/${email}`,
    type: 'get',
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    success: function () {
      console.log('hello');
      window.location.href = "index.html";
    }
  });
};

