'use strict';

const RequestHandlers = require('./../../common/RequestHandler');
const {ImagesDaoHandler} = require('../../dao/handlers');

class GetLocationImages extends RequestHandlers {

  methodAction(request, response) {
    return ImagesDaoHandler.getLocationImages(request.params.id);
  }


}

module.exports = GetLocationImages;