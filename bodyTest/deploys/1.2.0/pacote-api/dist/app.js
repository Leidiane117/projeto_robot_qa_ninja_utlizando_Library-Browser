"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }require('./bootstrap');
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _youch = require('youch'); var _youch2 = _interopRequireDefault(_youch);
var _socketio = require('socket.io'); var _socketio2 = _interopRequireDefault(_socketio);
var _http = require('http'); var _http2 = _interopRequireDefault(_http);

var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var _node = require('@sentry/node'); var Sentry = _interopRequireWildcard(_node);
require('express-async-errors');

var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);
var _sentry = require('./config/sentry'); var _sentry2 = _interopRequireDefault(_sentry);
require('./database');

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.server = _http2.default.Server(this.app);
    Sentry.init(_sentry2.default);
    this.socket();
    this.middlewares();
    this.routes();
    this.exceptionHandler();

    this.conectedStudents = {};
  }

  socket() {
    this.io = _socketio2.default.call(void 0, this.server);

    this.io.on('connection', socket => {
      const { student_id } = socket.handshake.query;
      this.conectedStudents[student_id] = socket.id;

      socket.on('disconect', () => {
        delete this.conectedStudents[student_id];
      });
    });
  }

  middlewares() {
    this.app.use(Sentry.Handlers.requestHandler());
    this.app.use(_express2.default.json());
    this.app.use(_helmet2.default.call(void 0, ));
    this.app.use(
      _cors2.default.call(void 0, {
        origin: "*",
      })
    );

    this.app.use(
      '/files',
      _express2.default.static(_path2.default.resolve(__dirname, '..', 'tmp', 'uploads'))
    );

    this.app.use((req, res, next) => {
      req.io = this.io;
      req.conectedStudents = this.conectedStudents;
      next();
    });
  }

  routes() {
    this.app.use(_routes2.default);
    this.app.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.app.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new (0, _youch2.default)(err, req).toJSON();
        return res.status(500).json(errors);
      }
      return res.status(500).json({
        error: 'Internal server error',
      });
    });
  }
}

exports. default = new App().server;
