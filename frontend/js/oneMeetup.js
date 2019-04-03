const meetupId = location.search.split('meetupId=')[1];

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

$.ajax({
  url: `${urlBack}/meetup/${meetupId}`,
  method: 'GET',
  dataType: "json",
  contentType: "application/json; charset=utf-8",
  success: function (jsondata) {
    meetup(jsondata);
  }
});

function meetup(metap) {
  let meetupContent =
    `<div class="row">` +
    `<div class="col-lg-5 col-md-6 col-12"></div>` +
    `    <div class="col-lg-7 col-md-12 d-none d-md-none d-lg-inline-block">` +
    `    <h2 class="task-title text-left ml-3">${metap.title ? metap.title : ''}</h2>` +
    `  </div>` +
    `  <div class="event row">` +
    `    <div class="event-img col-lg-5 col-sm-6 col-12">` +
    `    <div class="col-lg-11 col-sm-11 col-12">` +
    `    <img class="img mx-auto d-block img-fluid rounded-circle mt-lg-5"` +
    `  src="${metap.coverSource ? metap.coverSource : 'img/default-user-image.png'}"` +
    `  alt=""/>` +
    `    </div>` +
    `    <div class="col-lg-1 col-sm-1 col-12"></div>` +
    `    </div>` +
    `    <div class="event-desc col-lg-7 col-sm-6 col-12">` +
    `    <div class="row event-categories my-3"></div>` +
    `    <div class="d-lg-none d-md-inline-block d-inline-block col-12">` +
    `    <h2 class="text-left ml-3 text-left">${metap.title ? metap.title : ''}</h2>` +
    `  </div>` +
    `  <div class="row event-categories mx-auto">`;
  metap.tags.forEach(tag => {
    meetupContent +=
      `<div class="my-2">` +
      `    <a href="#" class="event-category">#${tag.name || ''}</a>` +
      `    </div>`
  });
  meetupContent +=
    `    </div>` +
    `    </div>` +
    `    <div class="col-lg-5 col-md-1"></div>` +
    `    <div class="col-lg-7 col-md-11 event-item">` +
    `    <div class="row mx-1 my-3">` +
    `    <div class="event-date col-lg-6 col-sm-6 col-12">` +
    `    <p>` +
    `    <svg class="svg-calendar"` +
    `  viewBox="0 0 22 22"` +
    `  width="1em"` +
    `  height="1em">` +
    `    <g id="calendar_1_">` +
    `    <path class="st0"` +
    `  d="M20.167 2.063h-2.98V.687a.687.687 0 1 0-1.375` +
    `  0v1.375h-4.124V.688a.687.687 0 1 0-1.376 0v1.375H6.189V.687a.687.687 0 1 0-1.375 0v1.375h-2.98C.822` +
    `  2.063 0 2.882 0 3.896v16.271C0 21.18.82 22 1.834 22h18.333C21.18 22 22 21.18 22 20.166V3.896c0-1.013-.82-1.833-1.833-1.833zm.458` +
    `  18.103a.459.459 0 0 1-.458.459H1.834a.459.459 0 0 1-.459-.459V3.896c0-.253.206-.458.459-.458h2.978v1.375a.687.687 0 1 0` +
    `  1.375 0V3.438h4.125v1.374a.687.687 0 1 0 1.376 0V3.438h4.124v1.376a.687.687 0 1 0 1.376 0V3.438h2.98c.251 0 .457.205.457.457v16.271z"` +
    `  fill="#ffd800"/>` +
    `    <path` +
    `class="st0" d="M4.813 8.25h2.75v2.063h-2.75zM4.813 11.688h2.75v2.063h-2.75zM4.813 15.125h2.75v2.063h-2.75zM9.625 15.125h2.75v2.063h-2.75zM9.625` +
    `  11.688h2.75v2.063h-2.75zM9.625 8.25h2.75v2.063h-2.75zM14.438 15.125h2.75v2.063h-2.75zM14.438 11.688h2.75v2.063h-2.75zM14.438 8.25h2.75v2.063h-2.75z"` +
    `  fill="#ffd800"/>` +
    `    </g>` +
    `    </svg>` +
    `  ${fromModelToView(metap.startDate || '')}` +
    `  </p>` +
    `  </div>` +
    `  <div class="event-speaker col-lg-6 col-sm-6 col-12">` +
    `    <p class="mb-0">`+
    `<i class="fa fa-microphone"></i>`;
  metap.speakers.forEach(speker => {
    meetupContent += `<a class="speaker-name-link_task"` +
      `  target="_blank"` +
      `  title="facebook"` +
      `  href="">${speker.name || ''} ${speker.surname || ''}</a>`+
      ` <br>`
  });
  meetupContent +=
    `    </p>` +
    `  </div>` +
    `  </div>` +
    `  <div class="row mx-1 my-3">` +
    `    <div class="event-time col-lg-6 col-sm-6 col-12">` +
    `    <p>` +
    `    <svg class="svg-time" xmlns="http://www.w3.org/2000/svg"` +
    `  viewBox="0 0 21 21"` +
    `  width="1em"` +
    `  height="1em">` +
    `    <path d="M21.002 10.514c0-5.81-4.705-10.516-10.488-10.516A10.513 10.513 0 0 0-.002 10.514c0` +
    `  5.783 4.705 10.488 10.516 10.488 5.783 0 10.488-4.705 10.488-10.488zm-1.615 0a8.868 8.868 0 0` +
    `  1-8.873 8.873c-4.932 0-8.9-3.969-8.9-8.873a8.88 8.88 0 0 1 8.9-8.9c4.904 0 8.873 3.968 8.873 8.9zm-2.438` +
    `  0c0-.453-.34-.822-.794-.822h-4.847V4.845c0-.454-.369-.794-.822-.794a.792.792 0 0 0-.794.794v5.67c0` +
    `  .424.369.793.794.793h5.67a.792.792 0 0 0 .793-.794z"` +
    `  fill="#ffd800"` +
    `    />` +
    `    </svg>` +
    `  14:00` +
    `  </p>` +
    `  </div>` +
    `  <div class="empty col-lg-6 col-sm-6 col-12"></div>` +
    `    </div>` +
    `    <div class="row mx-1 my-3">` +
    `    <div class="event-place col-lg-6 col-sm-6 col-12">` +
    `    <p class="mt-3">` +
    `    <i class="fa fa-map-marker"></i>${metap.location ? metap.location.place : ''}, ${metap.location ? metap.location.address : ''}, ${metap.location ? metap.location.city : ''}` +
    `    </p>` +
    `    </div>` +
    `    <div class="event-guests col-lg-6 col-sm-6 col-12">` +
    `    <div class="row">` +
    `    <div class="col-lg-3 col-3 col-sm-3">` +
    `    <a target="_blank"` +
    `  title="facebook"` +
    `  href="https://www.facebook.com/egor.tsyganok/posts/1738825119569755">` +
    `    <img class="img mx-auto d-block img-fluid rounded-circle"` +
    `  src="img/event-7.jpg"` +
    `  alt=""/>` +
    `    </a>` +
    `    </div>` +
    `    <div class="col-lg-3 col-3 col-sm-3">` +
    `    <a target="_blank"` +
    `  title="facebook"` +
    `  href="https://www.facebook.com/egor.tsyganok/posts/1738825119569755">` +
    `    <img class="img mx-auto d-block img-fluid rounded-circle"` +
    ` src="img/event-7.jpg"` +
    `  alt=""` +
    `    />` +
    `    </a>` +
    `    </div>` +
    `    <div class="col-lg-3 col-3 col-sm-3">` +
    `    <a target="_blank"` +
    `  title="facebook"` +
    `  href="https://www.facebook.com/egor.tsyganok/posts/1738825119569755">` +
    `    <img class="img mx-auto d-block img-fluid rounded-circle"` +
    `  src="img/event-7.jpg"` +
    `  alt=""/>` +
    `    </a>` +
    `    </div>` +
    `    <div class="col-lg-3 col-3 col-sm-3">` +
    `    <a class="btn dots-button"` +
    `  title="More">...</a>` +
    `  </div>` +
    `  </div>` +
    `  </div>` +
    `  </div>` +
    `  <div class="row mx-1 my-4">` +
    `    <div class="event-join col-lg-6 col-sm-6 col-8">` +
    `    <a href="#" class="btn-join btn">Join</a>` +
    `    </div>` +
    `    <div class="event-cost col-lg-6 col-sm-6 col-4">` +
    `    <p class="mt-2">` +
    `    <svg class="svg-price"` +
    `xmlns="http://www.w3.org/2000/svg"` +
    `  viewBox="0 0 22 22"` +
    `  width="1.1em"` +
    `  height="1.1em">` +
    `    <path d="M11 0c6.065 0 11 4.935 11 11s-4.935 11-11 11S0 17.065 0 11 4.935 0 11 0zm0` +
    `  20.645c5.318 0 9.645-4.327 9.645-9.645S16.318 1.355 11 1.355 1.355 5.682 1.355 11 5.682` +
    `  20.645 11 20.645zm.678-3.133v1.346h-1.356v-1.346h-.22a3.375 3.375 0 0 1-3.37-3.37v-.23h1.355v.23c0` +
    `  1.11.904 2.015 2.015 2.015h1.796a2.017 2.017 0 0 0 2.015-2.015v-.45a2.017 2.017 0 0` +
    `  0-2.015-2.014h-1.796a3.375 3.375 0 0 1-3.37-3.37v-.45a3.375 3.375 0 0 1` +
    `  3.37-3.37h.22V3.142h1.356v1.346h.22a3.375 3.375 0 0 1 3.37 3.37v.23h-1.355v-.23a2.017 2.017 0 0` +
    `  0-2.015-2.015h-1.796a2.017 2.017 0 0 0-2.015 2.015v.45c0 1.11.904 2.014 2.015 2.014h1.796a3.375 3.375 0` +
    `  0 1 3.37 3.37v.45a3.375 3.375 0 0 1-3.37 3.37h-.22z"` +
    `  fill-rule="evenodd"` +
    `  clip-rule="evenodd"` +
    `  fill="#6e6e6e"/>` +
    `    </svg>` +
    `  FREE` +
    `  </p>` +
    `  </div>` +
    `  </div>` +
    `  </div>` +
    `  <div class="row my-5">` +
    `    <div class="col-lg-9 ml-md-4 col-md-11 col-sm-10 col-11 mx-auto">` +
    `    <div class="row">` +
    `    <div class="col-md-9 col-7">` +
    `    <h4>About meetups` +
    `  <hr class="yellow-separator">` +
    `    </h4>` +
    `    </div>` +
    `    <div class="col-md-3 col-5 d-lg-none d-md-inline-block">` +
    `    <p>` +
    `    <a class="speaker-name-link_task"` +
    `  target="_blank"` +
    `  title="facebook"` +
    `  href="https://www.facebook.com/egor.tsyganok/posts/1738825119569755"` +
    `    ><i class="fa fa-microphone color-gray"></i>John Alien` +
    `    </a>` +
    `    </p>` +
    `    </div>` +
    `    </div>` +
    `    <p class="about-meetups text-justify">${metap.description || ''}` +
    `  <span class="hide">` +
    `  </span>` +
    `  </p>` +
    `  </div>` +
    `  <div class="col-lg-2 d-lg-inline-block d-md-none d-none col-sm-2 col-11 mx-auto">` +
    `    <p>` +
    `    <a class="speaker-name-link_task"` +
    `target="_blank"` +
    `  title="facebook"` +
    `  href="https://www.facebook.com/egor.tsyganok/posts/1738825119569755"` +
    `    ><i class="fa fa-microphone color-gray"></i>John Alien` +
    `    </a>` +
    `    </p>` +
    `    </div>` +
    `    <div class="col-11 text-right">` +
    `    <a class="show" role="button" aria-expanded="true">` +
    `    More` +
    `    <i class="fa fa-plus more-button-icon" aria-hidden="true"></i>` +
    `    </a>` +
    `    <a class="hide" role="button" aria-expanded="true">` +
    `    Less` +
    `    <i class="fa fa-minus more-button-icon" aria-hidden="true"></i>` +
    `    </a>` +
    `    </div>` +
    `    </div>` +
    `    </div>` +
    `    </div>`;

  let meetingPlace =
    `<h2 class="section-title section-title-left">${metap.location ? metap.location.place : ''}</h2>` +
    `  <p class="place-description"><i class="fa fa-map-marker"></i>${metap.location ? metap.location.address : ''}, ${metap.location ? metap.location.city : ''}</p>` +
    `    <p class="place-description">` +
    `    <a href="tel:+13472234410"><i class="fa fa-mobile"></i>${metap.location ? metap.location.phone : ''}</a>` +
    `  </p>`;

  $('.meetup').append(meetupContent);

  $.ajax({
    url: `${urlBack}/images/location/${metap.locationId}`,
    method: 'GET',
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function (jsondata) {
      $('.place-info').append(meetingPlace);
      placeImage(jsondata);
    }

  });

  function placeImage(content) {
    let imgList = ``;

    content.forEach(img => {
      const imgContent =
        ` <div><img class="place-img" src="${img.coverSource}" alt="${img.coverKey}"/></div>`;

      imgList += imgContent;
    })
    $('#imgContent').append(imgList);


  }

}