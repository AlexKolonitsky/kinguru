'use strict';

const RequestHandlers = require('./../../common/RequestHandler');
const {ImagesDaoHandler} = require('../../dao/handlers');

class GetLocationImages extends RequestHandlers {

  methodAction(request, response) {
    return ImagesDaoHandler.getLocationImages(
      !isNaN(parseInt(request.params.id)) ? parseInt(request.params.id) : null
    );
  }


}

module.exports = GetLocationImages;