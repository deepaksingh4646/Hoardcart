var Router= require('koa-router');
var bodyParser = require('koa-body')();

module.exports = function(app){

    var router = new Router();

    //Welcome Routes
    var userCtrl = require('./../controllers/userCtrl');
    router.get('/login', userCtrl.showLoginPage);
    router.post('/login', userCtrl.login);
    router.get('/register', userCtrl.showRegisterPage);
    router.post('/register', userCtrl.signup);
    router.get('/logout', userCtrl.logout);
    var advertisersCtrl = require('./../controllers/advertisersCtrl');
    router.get('/advertiserdashboard/:advertiser_id/advertiser', advertisersCtrl.showAdvertiserPage);
    var companyCtrl = require('./../controllers/companyCtrl');
    router.get('/contact', companyCtrl.showContactPage);


    var bookingCtrl = require('./../controllers/bookingCtrl');
    router.get('/history/:hoarding_id/hoarding', bookingCtrl.showHistoryPage);
    router.get('/bookingstatus/:hoarding_id/status', bookingCtrl.showBookingPage);
    var homeCtrl = require('./../controllers/homeCtrl');
    router.get('/home', homeCtrl.showHomePage);
    var publishersCtrl = require('./../controllers/publishersCtrl');
    router.get('/publisherdashboard/:publisher_id/publisher', publishersCtrl.showPublisherPage);
    router.get('/publishers/addhoarding', publishersCtrl.addMorePage);
    router.post('/publishers/addhoarding', publishersCtrl.addMore);
    var searchCtrl = require('./../controllers/searchCtrl');
    router.get('/search', searchCtrl.showSearchPage);
    router.get('/:hoarding_id', searchCtrl.showDetailsPage);

    return router.middleware();
}
