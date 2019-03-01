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
function postAllMeetup (object, state){
  $.ajax({
    url: 'http://ec2-35-158-84-70.eu-central-1.compute.amazonaws.com:3010/meetups',
    method: 'POST',
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(object),
    success: state,
  });
};

window.addEventListener("load",function(){
   let enitionState = isEnitionState(true);
   let object = {limit: 12, offset: 0};
  postAllMeetup(object, enitionState);

});

function isEnitionState(isState) {
  if(isState == true){
    let a = function (jsondata) {
      showAllMeetups(jsondata.filteredMeetups);
      paginationPage(jsondata.meetupsCount);
    };
    return a;
  } else {
    let removeChild = $('.meetup-list').empty();
    let b = function (jsondata) {
      removeChild;
      showAllMeetups(jsondata.filteredMeetups);
    };
    return b;
  }
};

$.ajax({
  url: 'http://ec2-35-158-84-70.eu-central-1.compute.amazonaws.com:3010/filter/meetup',
  method: 'GET',
  dataType: "json",
  contentType: "application/json; charset=utf-8",
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
  let search = {};
  let enitionState = isEnitionState(false);
  if (location) {search.city = location;};
  if (tagId) {search.tags = [tagId];};
  postAllMeetup(search, enitionState);
});


$(".reset").on('click', function () {
  $('.filter-tags').val('');
  $('.filter-location').val('');

});

function paginationPage(allList) {
  allList = Math.ceil(allList / 12);
  let currentIndex = 0;
  let li = null;
  const pagination = $(`.pagination`);
  const prevButton =
    $(`<li class="page-item pagination-list">` +
      `<a class="page-link" tabindex="-1"><i class="fa fa-angle-left" aria-hidden="true"></i></a>` +
    `</li>`);
  const nextButton =
    $(`<li class="page-item pagination-list">` +
      `<a class="page-link" tabindex="-1"><i class="fa fa-angle-right" aria-hidden="true"></i></a>` +
    `</li>`);
  prevButton.click(toPrevPage);
  pagination.append(prevButton);
  for (let i = 0; i < allList; i++) {
    li = $(`<li class="page-item item-number"><a class="page-link">${i + 1}</a></li>`);
    li.click(() => {
      currentIndex = i;
      console.log(currentIndex);
    });
    pagination.append(li);
  }
  $('.page-item').on('click', function () {
    let enitionState = isEnitionState(false);
    currentIndex = (currentIndex * 12);
    let object = {limit: 12, offset: currentIndex};
    postAllMeetup(object, enitionState);
  });
  nextButton.click(toNextPage);
  pagination.append(nextButton);

  function toNextPage() {
    currentIndex += 1;
    console.log(`INDEEX`, currentIndex);
  }

  function toPrevPage() {
    currentIndex -= 1;
    console.log(`INDEEX`, currentIndex);
  }
};