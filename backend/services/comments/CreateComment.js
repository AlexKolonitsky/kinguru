'use strict';

const RequestHandler = require('../../common/RequestHandler');
const { CommentsDaoHandler } = require('../../dao/handlers');

class CreateComment extends RequestHandler {

  methodAction(request, response) {
    return CommentsDaoHandler.createComment(request);
  }

}

module.exports = CreateComment;