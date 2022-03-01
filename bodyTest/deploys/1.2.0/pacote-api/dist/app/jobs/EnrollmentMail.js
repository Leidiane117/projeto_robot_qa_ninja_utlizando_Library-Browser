"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _datefns = require('date-fns');
var _pt = require('date-fns/locale/pt'); var _pt2 = _interopRequireDefault(_pt);
var _Mail = require('../../lib/Mail'); var _Mail2 = _interopRequireDefault(_Mail);

class EnrollmentMail {
  get key() {
    return 'EnrollmentMail';
  }

  async handle({ data }) {
    const { enrollment } = data;

    await _Mail2.default.sendMail({
      to: `${enrollment.student.name} <${enrollment.student.email}>`,
      subject: '[MATRÍCULA REGISTRADA] - Bodytest',
      template: 'enrollment',
      context: {
        student: enrollment.student.name,
        plan: enrollment.plan.title,
        start_date: _datefns.format.call(void 0, 
          _datefns.parseISO.call(void 0, enrollment.start_date),
          "'dia' dd 'de' MMMM 'de' yyyy",
          {
            locale: _pt2.default,
          }
        ),
        end_date: _datefns.format.call(void 0, 
          _datefns.parseISO.call(void 0, enrollment.end_date),
          "'dia' dd 'de' MMMM 'de' yyyy",
          {
            locale: _pt2.default,
          }
        ),
        total: enrollment.price,
      },
    });
  }
}

exports. default = new EnrollmentMail();
