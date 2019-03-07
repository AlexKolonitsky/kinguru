$('input#continue').click( function() {
  $.ajax({
    url: 'http://ec2-35-158-84-70.eu-central-1.compute.amazonaws.com:3010/user/register',
    type: 'post',
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(fillFormSingUp()),
    success: function(data) {
      console.log(data);
    }
  });
});

function fillFormSingUp(postData) {
  postData ={
    username: document.getElementById('name').value,
    email: document.getElementById('email').value,
    country: document.getElementById('country').value,
    city: document.getElementById('city').value,
    phone: document.getElementById('phone').value,
    password: document.getElementById('pass').value,
  };
  console.log(postData);
  return postData;
}