var sessionUtils = require('../utils/sessionUtils');
var util = require('util');
var databaseUtils = require('./../utils/databaseUtils');

module.exports = {
    showAdvertiserPage: function* (next) {
        var pd = this.params.advertiser_id;
        var queryString ="select * from booking inner join hoarding on booking.hoarding_id=hoarding.hoarding_id where advertiser_id='%s'";
        var query = util.format(queryString,pd);
        var result = yield databaseUtils.executeQuery(query);

        yield this.render('advertiserdashboard',{
            userDetails : result

        });
    }
}
