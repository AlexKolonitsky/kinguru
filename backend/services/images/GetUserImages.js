'use strict';

const RequestHandlers = require('./../../common/RequestHandler');
const {ImagesDaoHandler} = require('../../dao/handlers');

class GetUserImages extends RequestHandlers {

  methodAction(request) {
    return ImagesDaoHandler.getUserImages(
      !isNaN(parseInt(request.params.id)) ? parseInt(request.params.id) : null
    );
  }


}

module.exports = GetUserImages;