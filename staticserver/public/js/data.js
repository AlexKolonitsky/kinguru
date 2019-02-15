var yearSelect = document.querySelector('#year');
var monthSelect = document.querySelector('#month');
var daySelect = document.querySelector('#day');

populateDays(monthSelect.value);
populateYears();

function populateDays(month) {

  while(daySelect.firstChild){
    daySelect.removeChild(daySelect.firstChild);
  }

  var dayNum;

  if(month === 'January' || month === 'March' || month === 'May' || month === 'July' || month === 'August' || month === 'October' || month === 'December') {
    dayNum = 31;
  } else if(month === 'April' || month === 'June' || month === 'September' || month === 'November') {
    dayNum = 30;
  } else {

    var year = yearSelect.value;
    var leap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    dayNum = leap ? 29 : 28;
  }

  for(i = 1; i <= dayNum; i++) {
    var option = document.createElement('option');
    option.textContent = i;
    daySelect.appendChild(option);
  }
}

function populateYears() {
  var date = new Date();
  var year = date.getFullYear();

  for(var i = 0; i <= 100; i++) {
    var option = document.createElement('option');
    option.textContent = year-i;
    yearSelect.appendChild(option);
  }
}

yearSelect.onchange = function() {
  populateDays(monthSelect.value);
}

monthSelect.onchange = function() {
  populateDays(monthSelect.value);
}