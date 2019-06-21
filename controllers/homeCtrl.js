var sessionUtils = require('../utils/sessionUtils');
var util = require('util');
var databaseUtils = require('./../utils/databaseUtils');
module.exports = {
    showHomePage: function* (next) {
        var queryString='select * from booking inner join hoarding on booking.hoarding_id=hoarding.hoarding_id group by booking.hoarding_id order by count(booking.hoarding_id) desc limit 3';
        var result=yield databaseUtils.executeQuery(queryString);
        yield this.render('home',{
            userList: result
        });
    }
}
