$.ajax({
  url: 'http://ec2-35-158-84-70.eu-central-1.compute.amazonaws.com:3010/meetups',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type',
  },
  method: 'POST',
  type: 'json',
  data: {
    limit: 3,
    isResent: true,
  },

  /* etc */
  success: function (jsondata) {
    console.log(jsondata);
    showRecentMeetups(jsondata.filteredMeetups);
  }
});

$.ajax({
  url: 'http://ec2-35-158-84-70.eu-central-1.compute.amazonaws.com:3010/meetups',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type',
  },
  method: 'POST',
  type: 'json',
  limit: 12,
  isResent: false,
  /* etc */
  success: function (jsondata) {
    showAllMeetups(jsondata.filteredMeetups, {
    });
  }
});

function showRecentMeetups(recentMeetups) {
  let meetupListContent = ``;
  recentMeetups.forEach(meetup => {
    let meetupContent = `<div class="col-lg-4 col-sm-6 col-12 mb-5">` +
      `<div class="task-box" aria-expanded="false">` +
         `     <a` +
         `       href=""` +
         `       target="_blank"` +
         `       title="${meetup.title}"` +
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
         `         <div class="card card-body">`;
      meetup.speakers.forEach(speaker => {
        meetupContent += `<p><i class="fa fa-microphone"></i>${speaker.name} ${speaker.surname}</p>`
        });
      meetupContent +=
         `           <p>` +
         `             <span><i class="fa fa-user"></i>${meetup.maxGuest}</span>` +
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
  $('.meetup-recent').append(meetupListContent);
};

function showAllMeetups(allMeetups) {
  let meetupListAllMeetups = ``;



  allMeetups.forEach(meetup =>{
    let allMeetupContent =
      `<div class="col-lg-4 col-sm-6 col-12 mb-5">` +
      `<div class="task-box" aria-expanded="false">` +
      `<a href="https://www.facebook.com/kinguru.online/posts/2102861716705954"` +
        `target="_blank"` +
        `title="${meetup.title}">` +
      `<img class="img mx-auto d-block"` +
    `src="${meetup.coverSource}"` +
    `alt="reportage"` +
      `/></a>` +
      `<div class="task-box-inner">` +
      `<div class="task-box-inner_desc">` +
      `<h4>${meetup.title}</h4>` +
    `<hr />` +
    `<div class="card card-body">`;
      meetup.speakers.forEach(speaker => {
        allMeetupContent += `<p><i class="fa fa-microphone"></i>${speaker.name} ${speaker.surname}</p>`
      });
    allMeetupContent +=
    `<p>` +
    `<svg class="svg-time"` +
    `xmlns="http://www.w3.org/2000/svg"` +
    `viewBox="0 0 21 21"` +
    `width="1em"` +
    `height="1em">` +
      `<path d="M21.002 10.514c0-5.81-4.705-10.516-10.488-10.516A10.513 10.513 0 0 0-.002 10.514c0` +
    `5.783 4.705 10.488 10.516 10.488 5.783 0 10.488-4.705 10.488-10.488zm-1.615 0a8.868 8.868 0 0` +
    `1-8.873 8.873c-4.932 0-8.9-3.969-8.9-8.873a8.88 8.88 0 0 1 8.9-8.9c4.904 0 8.873 3.968 8.873 8.9zm-2.438` +
    `0c0-.453-.34-.822-.794-.822h-4.847V4.845c0-.454-.369-.794-.822-.794a.792.792 0 0 0-.794.794v5.67c0` +
    `.424.369.793.794.793h5.67a.792.792 0 0 0 .793-.794z"` +
    `fill="#e0e0e0"` +
      `/>` +
      `</svg>` +
      `<span>${meetup.date}</span>` +
    `</p>` +
    `<p>` +
    `<i class="fa fa-map-marker"></i>${meetup.location}` +
    `</p>` +
    `</div>` +
    `</div>` +
    `<hr class="gray-separator" />` +
      `<div class="row">` +
      `<div class="col-6 text-left">` +
      `<a href="#" class="btn-free btn">Free</a>` +
      `</div>` +
      `<div class="col-6 text-right">` +
      `<i class="fa fa-heart unlike" aria-hidden="true" onclick="like(this)"></i>` +
      `</div>` +
      `</div>` +
      `</div>` +
      `</div>` +
      `</div>`;

    meetupListAllMeetups += allMeetupContent;
  });
  $('.meetup-list').append(meetupListAllMeetups);
}