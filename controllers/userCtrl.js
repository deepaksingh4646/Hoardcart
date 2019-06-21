var sessionUtils = require('./../utils/sessionUtils');
var Constants = require('./../constants');
var config = require('./../config');
var databaseUtils = require('./../utils/databaseUtils');
var redisUtils = require('./../utils/redisUtils');
var util = require('util');

module.exports = {
showRegisterPage: function* (next) {
        var errorMessage;
        yield this.render('register', {
            errorMessage: errorMessage
        });
    },
showLoginPage: function* (next) {
        var errorMessage;
        yield this.render('login', {
            errorMessage: errorMessage
        });
    },
signup : function* (next) {
        var user_name = this.request.body.user_name;
        var name = this.request.body.name;
        var password = this.request.body.password;
        var email_id = this.request.body.email_id;
        var address = this.request.body.address;
        var contact = this.request.body.contact;
    
        var queryString = "insert into user(user_name,name,password,email_id,address,contact,active_status,account_status) values('%s', '%s', '%s', '%s', '%s', '%s','active','running')";
        var query = util.format(queryString,user_name,name,password,email_id,address,contact);
        var errorMessage;
    try {
        var result = yield databaseUtils.executeQuery(query);
        
        var queryString = ("select * from user where user_id = '%s'");
        var query = util.format(queryString,result.insertId);
        var result = yield databaseUtils.executeQuery(query);
        var redirectUrl = "/app/home";
        var insertedUser = result[0];
        sessionUtils.saveUserInSession(insertedUser, this.cookies);
        this.redirect(redirectUrl);
    }
    catch(e) {
        if(e.code === 'ER_DUP_ENTRY')  {
            errorMessage = "User Already Exists";
            
        }
        else { 
            throw e;
            
         }
    }

        },
uploadFile: function* (next) {
      var uploadedFiles =this.request.body.files;
      this.body= uploadedFiles;
    },
    
login: function* (next) {
        var email_id = this.request.body.email_id;
        var password = this.request.body.password;

        var queryString = "select * from user where email_id = '%s' and password = '%s'";
        var query = util.format(queryString, email_id, password);
        var results = yield databaseUtils.executeQuery(query);

        var errorMessage;
        if(results.length == 0) {
            errorMessage = "Incorrect user credentials";
            yield this.render('login', {
                errorMessage: errorMessage
            });
        } else {
            var redirectUrl = "/app/home";
            sessionUtils.saveUserInSession(results[0], this.cookies);
            this.redirect(redirectUrl);
        }
    },
logout: function* (next) {
        var sessionId = this.cookies.get("SESSION_ID");
        if(sessionId) {
            sessionUtils.deleteSession(sessionId);
        }
        this.cookies.set("SESSION_ID", '', {expires: new Date(1), path: '/'});
        this.redirect('/app/home');
    }
}
