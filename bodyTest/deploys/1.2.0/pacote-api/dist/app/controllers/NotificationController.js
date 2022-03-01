"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _HelpOrder = require('../models/HelpOrder'); var _HelpOrder2 = _interopRequireDefault(_HelpOrder);
var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);

class NotificationController {
  async index(req, res) {
    const helporders = await _HelpOrder2.default.findAll({
      where: { answer_at: null },
      order: ['createdAt'],
      include: [
        {
          model: _Student2.default,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    return res.json(helporders);
  }
}

exports. default = new NotificationController();
