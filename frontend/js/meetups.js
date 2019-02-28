const filter = {limit: 3};
$.ajax({
  url: 'http://ec2-35-158-84-70.eu-central-1.compute.amazonaws.com:3010/meetups',
  method: 'POST',
  dataType: "json",
  contentType: "application/json; charset=utf-8",
  data: JSON.stringify(
    {limit: 3}
  ),
  success: function (jsondata) {
    showRecentMeetups(jsondata.filteredMeetups);
  }
});

$.ajax({
  url: 'http://ec2-35-158-84-70.eu-central-1.compute.amazonaws.com:3010/meetups',
  method: 'POST',
  dataType: "json",
  contentType: "application/json; charset=utf-8",
  data: JSON.stringify(
    {
      limit: 12,
      offset: 13
    },

  ),
  /* etc */
  success: function (jsondata) {
    showAllMeetups(jsondata.filteredMeetups);
    paginationPage(jsondata.meetupsCount);
  }
});

$.ajax({
  url: 'http://ec2-35-158-84-70.eu-central-1.compute.amazonaws.com:3010/filter/meetup',
  method: 'GET',
  dataType: "json",
  contentType: "application/json; charset=utf-8",
  /* etc */
  success: function (jsondata) {
    filterLocationMeetup(jsondata.Locations);
    filterTagsMeetup(jsondata.Tags);
  }
});

function showRecentMeetups(recentMeetups) {
  let meetupListContent = ``;
  recentMeetups.forEach(meetup => {
    let meetupContent = `<div class="col-lg-4 col-sm-6 col-12 mb-5 child-recent">` +
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
      `             <span><i class="fa fa-user"></i>${meetup.guestsCount}</span>` +
      `           </p>` +
      `           <p>` +
      `             <span><i class="fa fa-commenting"></i>3 reviews</span>` +
      `           </p>` +
      `           <p>` +
      `             <i class="fa fa-map-marker"></i> ${meetup.city}` +
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

  allMeetups.forEach(meetup => {
    let allMeetupContent =
      `<div class="col-lg-4 col-sm-6 col-12 mb-5 child-meetup">` +
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
      `<span>${meetup.startDate}</span>` +
      `</p>` +
      `<p>` +
      `<i class="fa fa-map-marker"></i>${meetup.city}` +
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
};

function filterLocationMeetup(allLocationFilter) {
  let filterList = ``;

  allLocationFilter.forEach(city => {
    let countFilter =
      `<option>${city}</option>`;

    filterList += countFilter;
  });
  $('.filter-location').append(filterList);
};

function filterTagsMeetup(allTagsFilter) {
  let filterList = ``;

  allTagsFilter.forEach(tag => {
    let countFilter =
      `<option value="${tag.id}">${tag.name}</option>`;

    filterList += countFilter;
  });
  $('.filter-tags').append(filterList);
};

$('.btn-search').on('click', function () {
  let location = $(".filter-location option:selected").val();
  let tagId = $(".filter-tags option:selected").val();
  let removeChild = $('.meetup-list').empty();
  let search = {};
  if(location){
    search.city = location;
  };
  if(tagId) {
    search.tags = [tagId];
  };

  console.log(search);

  $.ajax({
    url: 'http://ec2-35-158-84-70.eu-central-1.compute.amazonaws.com:3010/meetups',
    method: 'POST',
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(search),
    success: function (jsondata) {
      console.log(jsondata);
      removeChild;
      showAllMeetups(jsondata.filteredMeetups);
    }
  });
});


$(".reset").on('click', function () {
  $('.filter-tags').val('');
  $('.filter-location').val('');

});

function paginationPage(allList) {
  let etimList = '';

  allList = Math.ceil(allList / 12);
    for (var i = 0; i < allList; i++) {
      etimList += `<li class="page-item"><a class="page-link" href="" onclick="findWithAttr">${i + 1}</a></li>`;
    }
  $('.pagination-list').after(etimList);
    console.log(findWithAttr);
};

(function () {
  var divs = document.querySelectorAll(".page-item"),
    len = divs.length,
    i = 0;
  for (; divs[i].setAttribute("onclick", "clval(" + i + ")"), ++i < len;);
  clval = function (e) {
    alert(e);
  };
}());