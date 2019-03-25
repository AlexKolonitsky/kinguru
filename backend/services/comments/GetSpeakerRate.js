'use strict';

const RequestHandlers = require('./../../common/RequestHandler');
const {CommentsDaoHandler} = require('../../dao/handlers');


class GetSpeakerRate extends RequestHandlers {


  methodAction(request) {

    return CommentsDaoHandler.getSpeakerRate(
      !isNaN(parseInt(request.params.speakerId)) ? parseInt(request.params.speakerId) : null
    );
  }
}

module.exports = GetSpeakerRate;