"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _sequelize = require('sequelize');
var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);
var _Enrollment = require('../models/Enrollment'); var _Enrollment2 = _interopRequireDefault(_Enrollment);

class StudentController {
  async index(req, res) {
    const name = req.query.name || '';
    const page = parseInt(req.query.page || 1, 10);
    const perPage = parseInt(req.query.perPage || 5, 10);

    const students = await _Student2.default.findAndCountAll({
      order: ['name'],
      where: {
        name: {
          [_sequelize.Op.iLike]: `%${name}%`,
        },
      },
      limit: perPage,
      offset: (page - 1) * perPage,
    });

    const totalPage = Math.ceil(students.count / perPage);

    return res.json({
      page,
      perPage,
      data: students.rows,
      total: students.count,
      totalPage,
    });
  }

  async show(req, res) {
    const { id } = req.params;
    const student = await _Student2.default.findByPk(id);

    if (!student) return res.status(404).json({ error: 'Student Not Found' });

    return res.json(student);
  }

  async store(req, res) {

  
    const { email } = req.body;

    // console.log(email)

    const duplicate = await _Student2.default.findOne({ where: { email } })

    // console.log(duplicate)

    if (duplicate)
      return res.status(409).json({ message: "Duplicated email" })
      
    const student = await _Student2.default.create(req.body);

    return res.status(201).json(student);
  }

  async update(req, res) {
    const { id } = req.params;
    const student = await _Student2.default.findByPk(id);
    if (!student) return res.status(400).json({ error: 'Student not found' });

    await student.update(req.body);

    return res.json(student);
  }

  async destroy(req, res) {
    const { id } = req.params;
    const student = await _Student2.default.findByPk(id);

    if (!student) return res.status(404).json({ error: 'Student Not Found' });

    const studentEnrrolment = await _Enrollment2.default.findOne({
      where: { student_id: id },
      attributes: ['id'],
    });

    if (studentEnrrolment) {
      return res.status(409).json({ error: 'Student has a active Enrrolment' });
    }

    await student.destroy();
    return res.status(204).send();
  }
}

exports. default = new StudentController();
