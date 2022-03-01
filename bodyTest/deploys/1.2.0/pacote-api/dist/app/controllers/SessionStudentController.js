"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);
var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);

class SessionStudentController {
  async store(req, res) {
    const { id } = req.body;

    const student = await _Student2.default.findByPk(id, {
      include: [
        {
          model: _File2.default,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    if (!student) return res.status(401).json({ error: 'Student not found' });

    return res.json(student);
  }
}

exports. default = new SessionStudentController();
