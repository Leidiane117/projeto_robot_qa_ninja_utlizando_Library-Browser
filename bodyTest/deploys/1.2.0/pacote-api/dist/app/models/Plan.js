"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Plan extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        title: _sequelize2.default.STRING,
        duration: _sequelize2.default.INTEGER,
        price: _sequelize2.default.DECIMAL(10, 2),
        total: {
          type: _sequelize2.default.VIRTUAL,
          get() {
            return this.duration * this.price;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

exports. default = Plan;
