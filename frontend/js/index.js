$.ajax({
  url: `${urlBack}/meetups`,
  method: 'POST',
  dataType: "json",
  contentType: "application/json; charset=utf-8",
  data: JSON.stringify(),
  success: function (object) {
    allEvent(object.filteredMeetups);
  },
});

$.ajax({
  url: `${urlBack}/meetups`,
  method: 'POST',
  dataType: "json",
  contentType: "application/json; charset=utf-8",
  data: JSON.stringify(
    {
      isReсent: true
    }
  ),
  success: function (object) {
    allPastEvent(object.filteredMeetups);
  },
});

function parseData(data) {
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

function allEvent(events) {
  let eventList = ``;
  events.forEach(event => {
    let eventContent =
      `  <div class="col-lg-4 col-sm-6 col-12 mb-5">` +
      `      <div class="task-box" aria-expanded="false">` +
      `      <a href="${event.socialLink ? event.socialLink : ''}" target="_blank"` +
      `  class="task-box_poster" title="${event.title}">` +
      `      <img class="img mx-auto d-block" src="${event.coverSource ? event.coverSource : 'img/default-user-image.png'}" alt="reportage">` +
      `      </a>` +
      `      <div class="task-box-inner">` +
      `      <div class="timeplace">${parseData(event.startDate)}</div>` +
      `    <h4>${event.title}</h4>` +
      `    <hr>` +
      `    <p>${event.description || ''}</p>` +
      `    <a data-toggle="collapse" href="#collapseevent${event.id}" role="button" aria-expanded="false" aria-controls="collapseevent${event.id}">` +
      `      Read more&nbsp;&nbsp;&nbsp;<i class="fa fa-plus" aria-hidden="true"></i>` +
      `      </a>` +
      `      <div class="collapse" id="collapseevent${event.id}">` +
      `      <div class="card card-body">` +
      `      <p><i class="fa fa-users" aria-hidden="true"></i>${event.maxGuestsCount ? event.maxGuestsCount : '0'} people</p>` +
      `    <p><i class="fa fa-map-marker" aria-hidden="true"></i><span>${event.location ? event.location.address && event.location.city && event.location.place : '' }</span></p>` +
      `    <p><i class="fa fa-commenting" aria-hidden="true"></i>`;
    event.speakers.forEach(speaker => {
      eventContent += `${speaker.firstname} ${speaker.lastname}`
    });
    eventContent += `</p>` +
      `    <p class="empty-block_grow"></p>` +
      `    <a class="join" href="${event.socialLink ? event.socialLink : ''}">join</a>` +
      `      <a data-toggle="collapse" href="#collapseevent${event.id}" role="button" aria-expanded="true"` +
      `    aria-controls="collapseevent${event.id}">` +
      `      <i class="fa fa-times" aria-hidden="true"></i>` +
      `      </a>` +
      `      </div>` +
      `      </div>` +
      `      </div>` +
      `      </div>` +
      `      </div>`;
    eventList += eventContent;
  })
  $('#createYourEvent').after(eventList);
}

function allPastEvent(events) {
  let eventList = ``;
  events.forEach(event => {
    let eventContent =
      `  <div class="col-lg-4 col-sm-6 col-12 mb-5">` +
      `      <div class="task-box" aria-expanded="false">` +
      `      <a href="${event.socialLink ? event.socialLink : ''}" target="_blank"` +
      `  class="task-box_poster" title="${event.title}">` +
      `      <img class="img mx-auto d-block" src="${event.coverSource ? event.coverSource : 'img/default-user-image.png'}" alt="reportage">` +
      `      </a>` +
      `      <div class="task-box-inner">` +
      `      <div class="timeplace">${parseData(event.startDate)}</div>` +
      `    <h4>${event.title}</h4>` +
      `    <hr>` +
      `    <p>${event.description || ''}</p>` +
      `    <a data-toggle="collapse" href="#collapseevent${event.id}" role="button" aria-expanded="false" aria-controls="collapseevent${event.id}">` +
      `      Read more&nbsp;&nbsp;&nbsp;<i class="fa fa-plus" aria-hidden="true"></i>` +
      `      </a>` +
      `      <div class="collapse" id="collapseevent${event.id}">` +
      `      <div class="card card-body">` +
      `      <p><i class="fa fa-users" aria-hidden="true"></i>${event.maxGuestsCount ? event.maxGuestsCount : '0'} people</p>` +
      `    <p><i class="fa fa-map-marker" aria-hidden="true"></i><span>${event.location ? event.location.address && event.location.city && event.location.place : '' }</span></p>` +
      `    <p><i class="fa fa-commenting" aria-hidden="true"></i>`;
    event.speakers.forEach(speaker => {
      eventContent += `${speaker.firstname} ${speaker.lastname}`
    });
    eventContent += `</p>` +
      `    <a class="join" href="${event.socialLink ? event.socialLink : ''}">join</a>` +
      `      <a data-toggle="collapse" href="#collapseevent${event.id}" role="button" aria-expanded="true"` +
      `    aria-controls="collapseevent${event.id}">` +
      `      <i class="fa fa-times" aria-hidden="true"></i>` +
      `      </a>` +
      `      </div>` +
      `      </div>` +
      `      </div>` +
      `      </div>` +
      `      </div>`;
    eventList += eventContent;
  })
  $('#pastEvent').append(eventList);
}