"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _datefns = require('date-fns');

class Enrollment extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        student_id: _sequelize2.default.INTEGER,
        plan_id: _sequelize2.default.INTEGER,
        start_date: _sequelize2.default.DATE,
        end_date: _sequelize2.default.DATE,
        price: _sequelize2.default.DECIMAL(10, 2),
        status: {
          type: _sequelize2.default.VIRTUAL,
          get() {
            return _datefns.isBefore.call(void 0, new Date(), this.end_date);
            // return (
            //   isBefore(this.get('start_date'), new Date()) &&
            //   isAfter(this.get('end_date'), new Date())
            // );
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
  }
}

exports. default = Enrollment;
