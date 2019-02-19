'use strict';

const RequestHandler = require('../../common/RequestHandler');
const { Speakers } = require('../../dao/handlers');

class AddSpeaker extends RequestHandler {

  methodAction(request) {

    const { email, name, surname } = request.body;

    console.log(request.body);
    return Speakers.addSpeaker(email, name, surname);

  }

}

module.exports = AddSpeaker;