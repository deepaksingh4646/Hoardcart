var sessionUtils = require('../utils/sessionUtils');

module.exports = {
    showContactPage: function* (next) {
        yield this.render('contact',{

        });
    }
}
