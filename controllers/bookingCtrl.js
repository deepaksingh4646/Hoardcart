var sessionUtils = require('../utils/sessionUtils');
var util=require('util');
var databaseUtils=require('./../utils/databaseUtils');



module.exports = {
    showHistoryPage: function* (next) {

        var hid = this.params.hoarding_id;
        var queryString = "select * from hoarding as hoard left join booking as book on hoard.hoarding_id=book.hoarding_id left join advertiser_hoarding as adv on adv.advertiser_id=book.advertiser_id left join user as u on adv.user_id=u.user_id where book.end_date<curdate() and book.hoarding_id='%s'";
        var query = util.format(queryString,hid);
        var result = yield databaseUtils.executeQuery(query);


        yield this.render('history',{
            userDetails:result

        });
    },
showBookingPage: function* (next) {

        var bid = this.params.hoarding_id;
        var queryString = "select case when exists(select * from booking where curdate()>start_date and curdate()<end_date and hoarding_id='%s') then 'booked' else 'available' end as 'result'";
        var query = util.format(queryString,bid);
        var result = yield databaseUtils.executeQuery(query);
        var userDetails=result[0];

        yield this.render('bookingstatus',{
            userDetails:userDetails

        });
    }
}
