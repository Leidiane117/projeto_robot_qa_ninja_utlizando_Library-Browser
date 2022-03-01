"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _expressbrute = require('express-brute'); var _expressbrute2 = _interopRequireDefault(_expressbrute);
var _expressbruteredis = require('express-brute-redis'); var _expressbruteredis2 = _interopRequireDefault(_expressbruteredis);
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

// Configs
var _multer3 = require('./config/multer'); var _multer4 = _interopRequireDefault(_multer3);

// Middlewares
var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

// Validators
var _PKValidator = require('./app/validators/PKValidator'); var _PKValidator2 = _interopRequireDefault(_PKValidator);
var _SessionStoreValidator = require('./app/validators/SessionStoreValidator'); var _SessionStoreValidator2 = _interopRequireDefault(_SessionStoreValidator);
var _SessionStudentStoreValidator = require('./app/validators/SessionStudentStoreValidator'); var _SessionStudentStoreValidator2 = _interopRequireDefault(_SessionStudentStoreValidator);
var _StudentCreateValidator = require('./app/validators/StudentCreateValidator'); var _StudentCreateValidator2 = _interopRequireDefault(_StudentCreateValidator);
var _StudentUpdateValidator = require('./app/validators/StudentUpdateValidator'); var _StudentUpdateValidator2 = _interopRequireDefault(_StudentUpdateValidator);
var _PlanCreateValidator = require('./app/validators/PlanCreateValidator'); var _PlanCreateValidator2 = _interopRequireDefault(_PlanCreateValidator);
var _PlanUpdateValidator = require('./app/validators/PlanUpdateValidator'); var _PlanUpdateValidator2 = _interopRequireDefault(_PlanUpdateValidator);
var _EnrollmentCreateValidator = require('./app/validators/EnrollmentCreateValidator'); var _EnrollmentCreateValidator2 = _interopRequireDefault(_EnrollmentCreateValidator);
var _EnrollmentUpdateValidator = require('./app/validators/EnrollmentUpdateValidator'); var _EnrollmentUpdateValidator2 = _interopRequireDefault(_EnrollmentUpdateValidator);
var _HelpOrderCreateValidator = require('./app/validators/HelpOrderCreateValidator'); var _HelpOrderCreateValidator2 = _interopRequireDefault(_HelpOrderCreateValidator);
var _AnswerValidator = require('./app/validators/AnswerValidator'); var _AnswerValidator2 = _interopRequireDefault(_AnswerValidator);

// Controllers
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _SessionStudentController = require('./app/controllers/SessionStudentController'); var _SessionStudentController2 = _interopRequireDefault(_SessionStudentController);
var _FileController = require('./app/controllers/FileController'); var _FileController2 = _interopRequireDefault(_FileController);
var _StudentController = require('./app/controllers/StudentController'); var _StudentController2 = _interopRequireDefault(_StudentController);
var _CheckinController = require('./app/controllers/CheckinController'); var _CheckinController2 = _interopRequireDefault(_CheckinController);
var _PlanController = require('./app/controllers/PlanController'); var _PlanController2 = _interopRequireDefault(_PlanController);
var _EnrollmentController = require('./app/controllers/EnrollmentController'); var _EnrollmentController2 = _interopRequireDefault(_EnrollmentController);
var _HelpOrderController = require('./app/controllers/HelpOrderController'); var _HelpOrderController2 = _interopRequireDefault(_HelpOrderController);
var _NotificationController = require('./app/controllers/NotificationController'); var _NotificationController2 = _interopRequireDefault(_NotificationController);
var _AnswerController = require('./app/controllers/AnswerController'); var _AnswerController2 = _interopRequireDefault(_AnswerController);

// Variables
const routes = new (0, _express.Router)();
const upload = _multer2.default.call(void 0, _multer4.default);

routes.get('/', async (req, res) => {
  res.json({
    name: 'Api Bodytest',
    version: '1.2.0',
    mode: process.env.NODE_ENV,
    created_by: "Fernando Papito"
  });
});

// Apply Brute in production Mode
if (process.env.NODE_ENV === 'production') {
  const bruteStore = new (0, _expressbruteredis2.default)({
    host: process.env.HOST,
    port: process.env.PORT,
  });
  const bruteForce = new (0, _expressbrute2.default)(bruteStore);
  routes.post(
    '/sessions',
    bruteForce.prevent,
    _SessionStoreValidator2.default,
    _SessionController2.default.store
  );
} else {
  routes.post('/sessions', _SessionStoreValidator2.default, _SessionController2.default.store);
}

// Routes Students
routes.post(
  '/sessionsStudent',
  _SessionStudentStoreValidator2.default,
  _SessionStudentController2.default.store
);
routes.get('/students/:id/checkins', _PKValidator2.default, _CheckinController2.default.index);
routes.post('/students/:id/checkins', _PKValidator2.default, _CheckinController2.default.store);
routes.get('/students/:id/help-orders', _PKValidator2.default, _HelpOrderController2.default.index);
routes.post(
  '/students/:id/help-orders',
  _PKValidator2.default,
  _HelpOrderCreateValidator2.default,
  _HelpOrderController2.default.store
);

// Routes below is JWT AUTH required
routes.use(_auth2.default);

// Routes Students
routes.get('/students', _StudentController2.default.index);
routes.get('/students/:id', _PKValidator2.default, _StudentController2.default.show);
routes.post('/students', _StudentCreateValidator2.default, _StudentController2.default.store);
routes.put(
  '/students/:id',
  _PKValidator2.default,
  _StudentUpdateValidator2.default,
  _StudentController2.default.update
);
routes.delete('/students/:id', _PKValidator2.default, _StudentController2.default.destroy);
routes.post(
  '/students/:id/files',
  _PKValidator2.default,
  upload.single('file'),
  _FileController2.default.store
);

// Routes Help Order
routes.get('/help-orders', _AnswerController2.default.index);
routes.post(
  '/help-orders/:id/answer',
  _PKValidator2.default,
  _AnswerValidator2.default,
  _AnswerController2.default.store
);

// Notifications
routes.get('/notifications', _NotificationController2.default.index);

// Routes Plan
routes.get('/plans', _PlanController2.default.index);
routes.get('/plans/:id', _PKValidator2.default, _PlanController2.default.show);
routes.post('/plans', _PlanCreateValidator2.default, _PlanController2.default.store);
routes.put(
  '/plans/:id',
  _PKValidator2.default,
  _PlanUpdateValidator2.default,
  _PlanController2.default.update
);
routes.delete('/plans/:id', _PKValidator2.default, _PlanController2.default.delete);

// Routes Enrollment
routes.get('/enrollments', _EnrollmentController2.default.index);
routes.get('/enrollments/:id', _PKValidator2.default, _EnrollmentController2.default.show);
routes.post(
  '/enrollments',
  _EnrollmentCreateValidator2.default,
  _EnrollmentController2.default.store
);
routes.put(
  '/enrollments/:id',
  _PKValidator2.default,
  _EnrollmentUpdateValidator2.default,
  _EnrollmentController2.default.update
);
routes.delete('/enrollments/:id', _PKValidator2.default, _EnrollmentController2.default.delete);

exports. default = routes;
