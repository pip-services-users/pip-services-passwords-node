var mongoose = require('mongoose'), Schema = mongoose.Schema, Mixed = Schema.Types.Mixed;
var UserPasswordSchema = new Schema({
    /* Identification */
    _id: { type: String, unique: true },
    password: { type: String, required: true },
    /* Password management */
    lock: { type: Boolean, required: true, 'default': false },
    lock_until: { type: Date, required: false },
    pwd_fail_count: { type: Number, required: false },
    pwd_last_fail: { type: Date, required: false },
    pwd_rec_code: { type: String, required: false },
    pwd_rec_expire: { type: Date, required: false },
    /* Custom fields */
    custom_hdr: { type: Mixed, required: false },
    custom_dat: { type: Mixed, required: false }
}, {
    collection: 'passwords',
    autoIndex: true,
    strict: true
});
UserPasswordSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        // delete ret.password;
        // delete ret.pwd_rec_code;
        // delete ret.pwd_rec_expire;
        return ret;
    }
});
module.exports = function (connection) {
    return connection.model('UserPassword', UserPasswordSchema);
};
