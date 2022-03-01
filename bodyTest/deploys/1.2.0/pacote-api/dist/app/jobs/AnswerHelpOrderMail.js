"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _datefns = require('date-fns');
var _pt = require('date-fns/locale/pt'); var _pt2 = _interopRequireDefault(_pt);
var _Mail = require('../../lib/Mail'); var _Mail2 = _interopRequireDefault(_Mail);

class AnswerHelpOrderMail {
  get key() {
    return 'AnswerHelpOrderMail';
  }

  async handle({ data }) {
    const { helpOrder } = data;

    await _Mail2.default.sendMail({
      to: `${helpOrder.student.name} <${helpOrder.student.email}>`,
      subject: '[GYMPOINT - RESPONDE] - Bodytest',
      template: 'answer-help-order',
      context: {
        student: helpOrder.student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
        answer_at: _datefns.format.call(void 0, _datefns.parseISO.call(void 0, helpOrder.answer_at), 'dd/MMMM/yyyy HH:mm', {
          locale: _pt2.default,
        }),
        createdAt: _datefns.format.call(void 0, _datefns.parseISO.call(void 0, helpOrder.createdAt), 'dd/MMMM/yyyy HH:mm', {
          locale: _pt2.default,
        }),
        total: helpOrder.price,
      },
    });
  }
}

exports. default = new AnswerHelpOrderMail();
