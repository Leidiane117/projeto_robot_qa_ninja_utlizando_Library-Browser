"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
// import mongoose from 'mongoose';
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
var _User = require('../app/models/User'); var _User2 = _interopRequireDefault(_User);
var _Student = require('../app/models/Student'); var _Student2 = _interopRequireDefault(_Student);
var _Plan = require('../app/models/Plan'); var _Plan2 = _interopRequireDefault(_Plan);
var _Enrollment = require('../app/models/Enrollment'); var _Enrollment2 = _interopRequireDefault(_Enrollment);
var _HelpOrder = require('../app/models/HelpOrder'); var _HelpOrder2 = _interopRequireDefault(_HelpOrder);
var _File = require('../app/models/File'); var _File2 = _interopRequireDefault(_File);

const models = [_User2.default, _Student2.default, _Plan2.default, _Enrollment2.default, _HelpOrder2.default, _File2.default];

class Database {
  constructor() {
    this.init();
    // this.mongo();
  }

  init() {
    this.connection = new (0, _sequelize2.default)(_database2.default);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  // mongo() {
  //   this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
  //     useNewUrlParser: true,
  //     useFindAndModify: true,
  //     useUnifiedTopology: true,
  //   });
  // }
}

exports. default = new Database();
