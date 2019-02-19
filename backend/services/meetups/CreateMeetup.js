'use strict';

const RequestHandlers = require('./../../common/RequestHandler');
const { MeetupsDaoHandler } = require('../../dao/handlers');


/**
 * Is used for create meetup
 * @class CreateMeetup
 * @extends RequestHandlers
 */

class CreateMeetup extends RequestHandlers {


  methodAction(request) {

    let { type, title, location, isFree, date, speakers} = request.body;
    let file = request.file;
    console.log(file);

    return MeetupsDaoHandler.createMeetup(type, title, location, isFree, date, speakers, file)
  }


}

module.exports = CreateMeetup;