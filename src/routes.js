const express = require('express')
const multer = require('multer')
const uploadConfig = require('./config/upload')

const SessionController = require('./controllers/SessionController')
const SpotController = require('./controllers/SpotController')
const DashboardController = require('./controllers/DashboardController')
const BookingController = require('./controllers/BookingController')
const ApprovalsController = require('./controllers/ApprovalController')
const RejectionsController = require('./controllers/RejectionController')


const routes = express.Router()
const upload = multer(uploadConfig)

routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);

routes.post('/bookings/:booking_id/approvals', ApprovalsController.store);

routes.post('/bookings/:booking_id/rejections', RejectionsController.store);


module.exports = routes //exportando as rotas