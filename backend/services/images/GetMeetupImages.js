'use strict';

const RequestHandlers = require('./../../common/RequestHandler');
const {ImagesDaoHandler} = require('../../dao/handlers');

class GetMeetupImages extends RequestHandlers {

  methodAction(request, response) {
    return ImagesDaoHandler.getMeetupImages(
      !isNaN(parseInt(request.params.id)) ? parseInt(request.params.id) : null
    );
  }


}

module.exports = GetMeetupImages;