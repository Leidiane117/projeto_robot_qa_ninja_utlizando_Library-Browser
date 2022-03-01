"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _datefns = require('date-fns');
// import Queue from '../../lib/Queue';
var _EnrollmentMail = require('../jobs/EnrollmentMail'); var _EnrollmentMail2 = _interopRequireDefault(_EnrollmentMail);

var _Enrollment = require('../models/Enrollment'); var _Enrollment2 = _interopRequireDefault(_Enrollment);
var _Plan = require('../models/Plan'); var _Plan2 = _interopRequireDefault(_Plan);
var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);

class EnrollmentController {
  async index(req, res) {
    const term = req.query.term || '';
    const page = parseInt(req.query.page || 1, 10);
    const perPage = parseInt(req.query.perPage || 5, 10);
    const enrollments = await _Enrollment2.default.findAndCountAll({
      order: ['id'],
      where: {
        [_sequelize.Op.or]: [
          {
            '$student.name$': {
              [_sequelize.Op.iLike]: `%${term}%`,
            },
          },
          {
            '$plan.title$': {
              [_sequelize.Op.iLike]: `%${term}%`,
            },
          },
        ],
      },
      include: [
        {
          model: _Student2.default,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: _Plan2.default,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price', 'total'],
        },
      ],
      limit: perPage,
      offset: (page - 1) * perPage,
    });

    // return res.json(enrollments);

    const totalPage = Math.ceil(enrollments.count / perPage);

    return res.json({
      page,
      perPage,
      data: enrollments.rows,
      total: enrollments.count,
      totalPage,
    });
  }

  async show(req, res) {
    const { id } = req.params;
    // const enrollment = await Enrollment.findByPk(id);

    const enrollment = await _Enrollment2.default.findOne({
      where: {
        id,
      },
      include: [
        {
          model: _Student2.default,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: _Plan2.default,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price', 'total'],
        },
      ],
    });

    if (!enrollment)
      return res.status(404).json({ error: 'Enrollment Not Found' });

    return res.json(enrollment);
  }

  async store(req, res) {
    const plan = await _Plan2.default.findByPk(req.body.plan_id);

    if (!plan) return res.status(400).json({ error: 'Plan not found' });

    const end_date = _datefns.addMonths.call(void 0, _datefns.parseISO.call(void 0, req.body.start_date), plan.duration);

    const enrollmentCreated = await _Enrollment2.default.create({
      ...req.body,
      end_date,
      price: plan.total,
    });

    const enrollment = await enrollmentCreated.reload({
      include: [
        {
          model: _Student2.default,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: _Plan2.default,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price', 'total'],
        },
      ],
    });

    /**
     *  Send email with details of enrollment
     */
    // await Queue.add(EnrollmentMail.key, { enrollment });
    return res.status(201).json(enrollment);
  }

  async update(req, res) {
    const enrollment = await _Enrollment2.default.findByPk(req.params.id);
    if (!enrollment)
      return res.status(400).json({ error: 'Enrollment not found' });

    const plan = await _Plan2.default.findByPk(req.body.plan_id);
    if (!plan) return res.status(400).json({ error: 'Plan not found' });

    const end_date = _datefns.addMonths.call(void 0, _datefns.parseISO.call(void 0, req.body.start_date), plan.duration);

    await enrollment.update({ ...req.body, end_date, price: plan.total });

    return res.json(enrollment);
  }

  async delete(req, res) {
    const enrollment = await _Enrollment2.default.findByPk(req.params.id);

    if (!enrollment)
      return res.status(400).json({ error: 'Enrollment not found' });

    await enrollment.destroy();
    return res.status(204).send();
  }
}

exports. default = new EnrollmentController();
