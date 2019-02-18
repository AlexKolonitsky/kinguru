'use strict';

const RequestHandlers = require('./../../common/RequestHandler');
const { MeetupsDaoHandler } = require('../../dao/handlers');

class CreateMeetup extends RequestHandlers {


  methodAction(request) {

    let { type, title, location, isFree, date} = request.body;

    return MeetupsDaoHandler.createMeetup(type, title, location, isFree, date)
  }


}

module.exports = CreateMeetup;