"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);
var _HelpOrder = require('../models/HelpOrder'); var _HelpOrder2 = _interopRequireDefault(_HelpOrder);

class HelpOrderController {
  async index(req, res) {
    const page = parseInt(req.query.page || 1, 10);
    const perPage = parseInt(req.query.perPage || 5, 10);

    const studentExists = await _Student2.default.findByPk(req.params.id);

    if (!studentExists)
      return res.status(400).json({ error: 'Student not found' });

    const helporders = await _HelpOrder2.default.findAndCountAll({
      order: [['created_at', 'DESC']],
      where: { student_id: req.params.id },
      limit: perPage,
      offset: (page - 1) * perPage,
      include: [
        {
          model: _Student2.default,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
    });

    const totalPage = Math.ceil(helporders.count / perPage);

    return res.json({
      page,
      perPage,
      data: helporders.rows,
      total: helporders.count,
      totalPage,
    });
  }

  async store(req, res) {
    const studentExists = await _Student2.default.findByPk(req.params.id);

    if (!studentExists)
      return res.status(400).json({ error: 'Student not found' });

    const helpOrderCreated = await _HelpOrder2.default.create({
      ...req.body,
      student_id: req.params.id,
    });

    const helpOrder = await helpOrderCreated.reload({
      include: [
        {
          model: _Student2.default,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
    });

    /**
     *  Notify user admin
     */
    req.io.emit('HELP_ORDER_CREATE_NOTIFICATION', helpOrder);

    return res.status(201).json(helpOrder);
  }
}

exports. default = new HelpOrderController();
