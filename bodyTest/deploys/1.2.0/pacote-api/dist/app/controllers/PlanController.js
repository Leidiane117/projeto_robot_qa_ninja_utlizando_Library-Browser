"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Plan = require('../models/Plan'); var _Plan2 = _interopRequireDefault(_Plan);
var _sequelize = require('sequelize');
var _Enrollment = require('../models/Enrollment'); var _Enrollment2 = _interopRequireDefault(_Enrollment);

class PlanController {
  async index(req, res) {
    const title = req.query.title || '';
    const page = parseInt(req.query.page || 1, 10);
    const perPage = parseInt(req.query.perPage || 5, 10);

    const plans = await _Plan2.default.findAndCountAll({
      order: ['title'],
      where: {
        title: {
          [_sequelize.Op.iLike]: `%${title}%`,
        },
      },
      limit: perPage,
      offset: (page - 1) * perPage,
    });

    const totalPage = Math.ceil(plans.count / perPage);

    return res.json({
      page,
      perPage,
      data: plans.rows,
      total: plans.count,
      totalPage,
    });
  }

  async show(req, res) {
    const { id } = req.params;
    const plan = await _Plan2.default.findByPk(id);

    if (!plan) return res.status(404).json({ error: 'Plan Not Found' });

    return res.json(plan);
  }

  async store(req, res) {
    const plan = await _Plan2.default.create(req.body);
    return res.status(201).json(plan);
  }

  async update(req, res) {
    const plan = await _Plan2.default.findByPk(req.params.id);

    if (!plan) return res.status(400).json({ error: 'Plan not found' });

    await plan.update(req.body);

    return res.json(plan);
  }

  async delete(req, res) {
    const planId = req.params.id;
    const plan = await _Plan2.default.findByPk(planId);

    if (!plan) return res.status(400).json({ error: 'Plan not found' });

    const planEnrollment = await _Enrollment2.default.findOne({
      where: { plan_id: planId },
      attributes: ['plan_id'],
    });

    if (planEnrollment) {
      return res
        .status(409)
        .json({ error: 'There is a Enrollmente with this plan' });
    }

    await plan.destroy();
    return res.status(204).send();
  }
}

exports. default = new PlanController();
