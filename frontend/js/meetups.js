$.ajax({
  url: 'http://ec2-52-212-199-150.eu-west-1.compute.amazonaws.com:3010/meetups',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type'
  },
  method: 'GET',
  type: 'json',
  /* etc */
  success: function (jsondata) {
    console.log(jsondata);
    showMeetups(jsondata.allMeetups);
  }
});

function showMeetups(meetups) {
  let meetupListContent = ``;
  meetups.forEach(meetup => {
    const meetupContent = `<div class="col-lg-4 col-sm-6 col-12 mb-5">` +
      `<div class="task-box" aria-expanded="false">` +
         `     <a` +
         `       href=""` +
         `       target="_blank"` +
         `       title="Диалог с Алисой"` +
         `       ><img` +
         `         class="img mx-auto d-block"` +
         `         src="${meetup.coverSource}"` +
         `         alt="reportage"` +
         `     /></a>` +
         `     <div class="task-box-inner">` +
         `       <div class="task-box-inner_desc">` +
         `         <p>` +
         `           <i class="fa fa-star yellow" aria-hidden="true"></i` +
         `           ><i class="fa fa-star yellow" aria-hidden="true"></i` +
         `           ><i class="fa fa-star yellow" aria-hidden="true"></i` +
         `           ><i class="fa fa-star gray" aria-hidden="true"></i` +
         `           ><i class="fa fa-star gray" aria-hidden="true"></i>` +
         `         </p>` +
         `         <h4 class="title-meetup">${meetup.title}</h4>` +
         `         <hr />` +
         `         <div class="card card-body">` +
         `           <p><i class="fa fa-microphone"></i>John Balen</p>` +
         `           <p>` +
         `             <span><i class="fa fa-user"></i>11 guests</span>` +
         `           </p>` +
         `           <p>` +
         `             <span><i class="fa fa-commenting"></i>3 reviews</span>` +
         `           </p>` +
         `           <p>` +
         `             <i class="fa fa-map-marker"></i> ${meetup.location}` +
         `           </p>` +
         `         </div>` +
         `       </div>` +
         `     </div>` +
         `   </div>` +
         ` </div>`
    meetupListContent += meetupContent;
  });
  $('.meetup-list').append(meetupListContent);
}