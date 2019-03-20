'use strict';

const RequestHandlers = require('./../../common/RequestHandler');
const {ImagesDaoHandler} = require('../../dao/handlers');

class GetMeetupImages extends RequestHandlers {

  methodAction(request, response) {
    return ImagesDaoHandler.getMeetupImages(request.params.id);
  }


}

module.exports = GetMeetupImages;