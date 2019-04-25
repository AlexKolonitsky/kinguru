const pageSize = 12;

function postAllMeetup(object, state) {
  $.ajax({
    url: `${urlBack}/meetups`,
    method: 'POST',
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(object),
    success: state,
  })
};

window.addEventListener("load", function () {
  let enitionState = isEnitionState(true);
  let enitionRecent = isEnitionState(false);
  let allMeetup = {limit: 12, offset: 0};
  let allRecentMeetup = {limit: 12, isRecent: true};
  postAllMeetup(allMeetup, enitionState);
  postAllMeetup(allRecentMeetup, enitionRecent);
});

function isEnitionState(isState) {
  if (isState == true) {
    let removeMeetup = $('.meetup-list').empty();
    let removePagination = $('.pagination').empty();
    let a = function (jsondata) {
      removeMeetup;
      removePagination;
      showAllMeetups(jsondata.filteredMeetups);
      paginationPage(jsondata.meetupsCount);
    };
    return a;
  } else {
    let b = function (jsondata) {
      showRecentMeetups(jsondata.filteredMeetups);
    };
    return b;
  }
};

$.ajax({
  url: `${urlBack}/filter/meetup`,
  method: 'GET',
  dataType: "json",
  contentType: "application/json; charset=utf-8",
  success: function (jsondata) {
    filterLocationMeetup(jsondata.locations);
    filterTagsMeetup(jsondata.tags);
  }
});

function showRecentMeetups(recentMeetups) {
  let meetupListContent = ``;
  recentMeetups.forEach(meetup => {
    let meetupContent = `<div class="col-lg-4 col-sm-6 col-12 mb-5 child-recent">` +
      `<div class="task-box" aria-expanded="false">` +
      `     <a` +
      `       href="2_meetup.html?meetupId=${meetup.id}" ` +
      `       class="task-box_poster" ` +
      `       title="${meetup.title}"` +
      `       ><img` +
      `         class="img mx-auto d-block"` +
      `         src="${meetup.coverSource ? meetup.coverSource : 'img/default-user-image.png'}"` +
      `         alt="reportage"` +
      `     /></a>` +
      `     <div class="task-box-inner">` +
             `<div class="task-box-inner_desc">` +
              `<div class="progress">` +
                `<div class="progress-bar bg-warning" role="progressbar" style="width: 50%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>` +
                `<div class="progress-star">` +
                 `<img class="progress-star-item" src="img/obvod.png" alt="">` +
                `</div>` +
              `</div>` +
      `         <h4 class="title-meetup">${meetup.title}</h4>` +
      `         <hr class="yellow-separator"/>` +
      `         <div class="card card-body">`;
    meetup.speakers.forEach(speaker => {
      meetupContent += `<p><i class="fa fa-microphone"></i>${speaker.name || ''} ${speaker.surname || ''}</p>`
    });
    meetupContent +=
      `           <p>` +
      `             <span><i class="fa fa-user"></i>${meetup.guestsCount || ''}</span>` +
      `           </p>` +
      `           <p>` +
      `             <span><i class="fa fa-commenting"></i>3 reviews</span>` +
      `           </p>` +
      `           <p>` +
      `             <i class="fa fa-map-marker"></i>${event.location.city || ''}` +
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


function fromModelToView(data) {
  var date = new Date(data);

  var res = [
    addLeadZero(date.getDate()),
    addLeadZero(date.getMonth() + 1),
    date.getFullYear()
  ].join('.');

  function addLeadZero(val) {
    if (+val < 10) return '0' + val;
    return val;
  };

  return res;
};

function showAllMeetups(allMeetups) {
  let meetupListAllMeetups = ``;
  allMeetups.forEach(meetup => {
    let allMeetupContent =
      `<div class="col-lg-4 col-sm-6 col-12 mb-5 child-meetup">` +
      `<div class="task-box" aria-expanded="false">` +
      `<a href="1_meetup.html?meetupId=${meetup.id}"` +
      `target="_blank"` +
      `class="task-box_poster"` +
      `title="${meetup.title}">` +
      `<img class="img mx-auto d-block"` +
      `src="${meetup.coverSource ? meetup.coverSource : 'img/default-user-image.png'}"` +
      `alt="reportage"` +
      `/></a>` +
      `<div class="task-box-inner">` +
      `<div class="task-box-inner_desc">` +
      `<h4>${meetup.title}</h4>` +
      `<hr class="yellow-separator"/>` +
      `<div class="card card-body">`;
    meetup.speakers.forEach(speaker => {
      allMeetupContent += `<p><i class="fa fa-microphone"></i>${speaker.name || ''} ${speaker.surname || ''}</p>`
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
      `<span>${fromModelToView(meetup.startDate)}</span>` +
      `</p>` +
      `<p>` +
      `<i class="fa fa-map-marker"></i>${event.location.city || ''}` +
      `</p>` +
      `</div>` +
      `</div>` +
      `<hr class="gray-separator" />` +
      `<div class="row">` +
      `<div class="col-6 text-left">` +
      `<div class="btn-free">Free</div>` +
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

function filterInputValue() {
  let search = {
    city: $(".filter-location option:selected").val(),
    tags: $(".filter-tags option:selected").val()
  };
  return search;
};

$('.btn-search').on('click', function () {
  let enitionState = isEnitionState(true);
  postAllMeetup(filterInputValue(), enitionState);

});

$(".reset").on('click', function () {
  $('.filter-tags').val('');
  $('.filter-location').val('');
  let enitionState = isEnitionState(true);
  let allMeetup = {limit: 12, offset: 0};
  postAllMeetup(allMeetup, enitionState);

});

function paginationPage(allList) {
  allList = Math.ceil(allList / 12);
  let currentIndex = 0;
  let li = null;
  const pagination = $(`.pagination`);
  const prevButton =
    $(`<li class="page-item pagination-list">` +
      `<a href="#task" class="page-link" tabindex="-1"><i class="fa fa-angle-left" aria-hidden="true"></i></a>` +
      `</li>`);
  const nextButton =
    $(`<li class="page-item pagination-list">` +
      `<a href="#task" class="page-link" tabindex="-1"><i class="fa fa-angle-right" aria-hidden="true"></i></a>` +
      `</li>`);
  prevButton.click(toPrevPage);
  pagination.append(prevButton);
  for (let i = 0; i < allList; i++) {
    li = $(`<li class="page-item item-number"><a href="#task" class="page-link">${i + 1}</a></li>`);
    li.click(() => {
      currentIndex = i;
    });
    pagination.append(li);
  }

  function filter(currentIndex) {
    let enitionState = isEnitionState(true);
    let object =
      {
        limit: pageSize,
        offset: currentIndex * pageSize,
      };
    let obj = Object.assign({}, object, filterInputValue());
    postAllMeetup(obj, enitionState);
  };

  $('.page-item').on('click', function () {
    filter(currentIndex);
  });
  nextButton.click(toNextPage);
  pagination.append(nextButton);

  function toNextPage() {
    if (allList - 1 !== currentIndex) {
      currentIndex += 1;
      filter(currentIndex);
    }
  }

  function toPrevPage() {
    if (currentIndex !== 0) {
      currentIndex -= 1;
      filter(currentIndex);
    }
  }
};
