var sessionUtils = require('../utils/sessionUtils');
var util = require('util');
var databaseUtils = require('./../utils/databaseUtils');

module.exports = {
    showPublisherPage: function* (next) {

        var pd = this.params.publisher_id;
        var queryString ="select * from hoarding inner join booking on hoarding.hoarding_id = booking.hoarding_id where publisher_id='%s'";
        var query = util.format(queryString,pd);
        var result = yield databaseUtils.executeQuery(query);

        yield this.render('publisherdashboard',{

            userDetails: result

        });
    },
addMorePage: function* (next) {
        var errorMessage;
        yield this.render('addhoarding', {
            errorMessage: errorMessage
        });
    },
    addMore : function* (next) {
        var latitude = this.request.body.latitude;
        var longitude = this.request.body.longitude;
        var landmark = this.request.body.landmark;
        var height = this.request.body.height;
        var width = this.request.body.width;
        var type = this.request.body.type;
        var pub_charge = this.request.body.pub_charge;
        var charge = this.request.body.charge;
    
        var queryString = "insert into hoarding(latitude,longitude,landmark,height,width,type,pub_charge,charge) values('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')";
        var query = util.format(queryString,latitude,longitude,landmark,height,width,type,pub_charge,charge);
        var errorMessage;
    try {
        var result = yield databaseUtils.executeQuery(query);
        
        var queryString = ("select * from hoarding where hoarding_id = '%s'");
        var query = util.format(queryString,result.insertId);
        var result = yield databaseUtils.executeQuery(query);
        var redirectUrl = "/app/contact";
        var insertedUser = result[0];
        sessionUtils.saveUserInSession(insertedUser, this.cookies);
        this.redirect(redirectUrl);
    }
    catch(e) {
        if(e.code === 'ER_DUP_ENTRY')  {
            errorMessage = "Hoarding Already Exists";
            
        }
        else { 
            throw e;
            
         }
    }

        }

}
