"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _HelpOrder = require('../models/HelpOrder'); var _HelpOrder2 = _interopRequireDefault(_HelpOrder);
var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);
// import Queue from '../../lib/Queue';
// import AnswerHelpOrderMail from '../jobs/AnswerHelpOrderMail';

class AnswerController {
  async index(req, res) {
    const page = parseInt(req.query.page || 1, 10);
    const perPage = parseInt(req.query.perPage || 10, 10);

    const helporders = await _HelpOrder2.default.findAndCountAll({
      where: { answer_at: null },
      order: ['createdAt'],
      limit: perPage,
      offset: (page - 1) * perPage,
      include: [
        {
          model: _Student2.default,
          as: 'student',
          attributes: ['id', 'name', 'email'],
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
    const helpOrderUpdated = await _HelpOrder2.default.findByPk(req.params.id);

    if (!helpOrderUpdated)
      return res.status(400).json({ error: 'Help Order not found' });

    helpOrderUpdated.answer = req.body.answer;
    helpOrderUpdated.answer_at = new Date();

    await helpOrderUpdated.save();

    const helpOrder = await helpOrderUpdated.reload({
      // order: ['createdAt', 'desc'],
      include: [
        {
          model: _Student2.default,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    /**
     *  Send email with details of enrollment
     */

    // await Queue.add(AnswerHelpOrderMail.key, { helpOrder });

    /**
     *  Notify user at mobile
     */

    // console.log(req.conectedStudents);

    const ownerSocket = req.conectedStudents[helpOrder.student_id];
    if (ownerSocket) {
      req.io.to(ownerSocket).emit('ANSWER_NOTIFICATION', helpOrder);
    }

    return res.status(201).json(helpOrder);
  }
}

exports. default = new AnswerController();
