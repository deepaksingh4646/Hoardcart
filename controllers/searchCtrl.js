var sessionUtils = require('../utils/sessionUtils');
var util = require('util');
var databaseUtils = require('./../utils/databaseUtils');

module.exports = {
showSearchPage: function* (next) {

        var userEnter = this.request.query.mark;
        var s_date= this.request.query.sdate;
        var e_date=this.request.query.edate;

        var queryString1 = "select * from hoarding left join booking on hoarding.hoarding_id=booking.hoarding_id where end_date<'%s' and landmark like '%s'";
        var queryString2 = "select * from hoarding where landmark like '%s' and hoarding.hoarding_id not in(select hoarding_id from booking)";
        var query = util.format(queryString1,e_date,"%"+userEnter+"%");
        var query2 = util.format(queryString2,"%"+userEnter+"%");
    console.log(query);
    var result = yield databaseUtils.executeQuery(query);
    var result2 = yield databaseUtils.executeQuery(query2);
        console.log(e_date);

        yield this.render('search',{
            searchQuery : result,
            searchResult : result2

        });
    },
    showDetailsPage: function* (next) {

            var u = this.params.hoarding_id;

            var queryString = 'select * from hoarding left join booking on hoarding.hoarding_id = booking.hoarding_id where hoarding.hoarding_id="%s"';
            var query = util.format(queryString,u);

        var result = yield databaseUtils.executeQuery(query);

var searchQuery=result[0];
            yield this.render('details',{
                searchQuery : searchQuery

            });
        },



showJsonPage: function* (next) {

        var userEnter = this.request.query.mark;
        var userEnter1 = this.request.query.lat;
        var userEnter2 = this.request.query.lon;

        var queryString = "select latitude,longitude,landmark from hoarding";
        var query = util.format(queryString,"%"+userEnter+"%",userEnter1,userEnter2);
        var result = yield databaseUtils.executeQuery(query);


        yield this.render('search',{
            searchQuery : result

        });
    }
}
