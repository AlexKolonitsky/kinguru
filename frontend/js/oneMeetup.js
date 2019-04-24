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
  let hourEvent = new Date(`${metap.startDate}`);
  let meetupContent =
    `<div class="row">` +
    `<div class="col-lg-5 col-md-6 col-12"></div>` +
    `    <div class="col-lg-7 col-md-12 d-none d-md-none d-lg-inline-block">` +
    `    <h2 class="task-title text-left ml-3">${metap.title ? metap.title : ''}</h2>` +
    `  </div>` +
    `  <div class="event row">` +
    `    <div class="event-img col-lg-5 col-sm-5 col-12">` +
    `    <div class="col-lg-11 col-sm-11 col-12">` +
    `    <img class="img mx-auto d-block img-fluid rounded-circle mt-lg-5 normal-img"` +
    `  src="${metap.coverSource ? metap.coverSource : 'img/default-user-image.png'}"` +
    `  alt=""/>` +
    `    </div>` +
    `    <div class="col-lg-1 col-sm-1 col-12"></div>` +
    `    </div>` +
    `    <div class="event-desc col-lg-7 col-sm-7 col-12">` +
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
    `    <div class="event-item">` +
    `    <div class="row mx-1 my-3">` +
    `    <div class="event-date col-lg-6 col-sm-6 col-12">` +
    `    <p class="event-icon">` +
    `    <img class="event-icon-svg"` +
    `    src="img/calendar.svg"` +
    `    alt="calendar">` +
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
    `  <p class="event-icon">` +
    `    <img class="event-icon-svg"` +
    `    src="img/time.svg"` +
    `    alt="time">${hourEvent.getUTCHours()}:${hourEvent.getUTCMinutes() === 0 ? '00' : hourEvent.getUTCMinutes()}</p>` +
    `  </div>` +
    `  <div class="empty col-lg-6 col-sm-6 col-12"></div>` +
    `    </div>` +
    `    <div class="row mx-1 my-3">` +
    `    <div class="event-place col-lg-6 col-sm-6 col-12">` +
    `    <p class="event-icon">` +
    `    <img class="event-icon-svg"` +
    `    src="img/location.svg"` +
    `    alt="location">` +
    `    ${metap.location !== null ? metap.location.place : ''} ${metap.location !== null ? metap.location.address : ''} ${metap.location !== null ? metap.location.city : ''}` +
    `    </p>` +
    `    </div>` +
    `    <div class="event-guests col-lg-6 col-sm-6 col-12">` +
    `    <div class="row">` +
    `    <div class="col-lg-3 col-3 col-sm-3">` +
    `    <a class="event-guests_facebook-link" target="_blank"` +
    `  title="facebook"` +
    `  href="#">` +
    `    <img class="event-guests_profile-photo img mx-auto d-block img-fluid rounded-circle"` +
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
    `    <a href="${metap.socialLink ? metap.socialLink : '#'}" class="btn-join btn">Join</a>` +
    `    </div>` +
    `    <div class="event-cost col-lg-6 col-sm-6 col-4">` +
    `    <p class="event-icon">` +
    `    <img class="event-icon-svg"` +
    `    src="img/price.svg"` +
    `    alt="price">` +
    `  <p class="event-price">` +
    `  </p>` +
    `  </p>` +
    `  </div>` +
    `  </div>` +
    `  </div>` +
    `  </div>` +
    `  <div class="row my-5 about-event">` +
    `    <div class="col-11 mx-auto">` +
    `      <div class="row about-event-title">` +
    `       <div class="col-md-9 col-7">` +
    `         <h4>About event` +
    `          <hr class="yellow-separator">` +
    `         </h4>` +
    `       </div>` +
    `       <div class="col-md-3 col-5 row">` +
    `         <i class="fa fa-microphone color-gray"></i>` +
    `          <a class="speaker-name-link_task"` +
    `                     target="_blank"` +
    `                     title="facebook"` +
    `                      href="https://www.facebook.com/egor.tsyganok/posts/1738825119569755"` +
    `             ><p class="speaker-name-link_task_microphone"></p>` +
    `          </a>` +
    `      </div>` +
    `    </div>` +
    `     <span class="about-meetups more">${metap.description || ''}` +
    `      </span>` +
    `  </div>` +
    `    </div>` +
    `    </div>` +
    `    </div>`;

  // let meetingPlace =
  //   `<h2 class="section-title section-title-left">${metap.location.place ? metap.location.place : ''}</h2>` +
  //   `  <p class="place-description"><i class="fa fa-map-marker"></i>${metap.location.address ? metap.location.address : ''}, ${metap.location.city ? metap.location.city : ''}</p>` +
  //   `    <p class="place-description">` +
  //   `    <a href="tel:+13472234410"><i class="fa fa-mobile"></i>${metap.location.phone ? metap.location.phone : ''}</a>` +
  //   `  </p>`;

  $('.meetup').append(meetupContent);

  // $.ajax({
  //   url: `${urlBack}/images/location/${metap.locationId}`,
  //   method: 'GET',
  //   dataType: "json",
  //   contentType: "application/json; charset=utf-8",
  //   success: function (jsondata) {
  //     $('.place-info').append(meetingPlace);
  //     placeImage(jsondata);
  //   }
  //
  // });

  // function placeImage(content) {
  //   let imgList = ``;
  //
  //   content.forEach(img => {
  //     const imgContent =
  //       ` <div><img class="place-img" src="${img.coverSource}" alt="${img.coverKey}"/></div>`;
  //
  //     imgList += imgContent;
  //   });
  //   $('#imgContent').append(imgList);


  // }

}