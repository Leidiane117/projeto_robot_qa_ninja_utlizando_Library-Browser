"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);
var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await _File2.default.create({ name, path });

    const student = await _Student2.default.findByPk(req.params.id);

    if (!student) return res.status(400).json({ error: 'Student Not found' });

    student.avatar_id = file.id;

    await student.save();

    return res.json(file);
  }
}

exports. default = new FileController();
