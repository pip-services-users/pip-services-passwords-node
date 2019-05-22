"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let Mixed = mongoose_1.Schema.Types.Mixed;
exports.UserPasswordsMongooseSchema = function (collection) {
    collection = collection || 'passwords';
    let schema = new mongoose_1.Schema({
        /* Identification */
        _id: { type: String },
        password: { type: String, required: true },
        /* Password management */
        change_time: { type: Date, required: false },
        locked: { type: Boolean, required: true, 'default': false },
        lock_time: { type: Date, required: false },
        fail_count: { type: Number, required: false },
        fail_time: { type: Date, required: false },
        rec_code: { type: String, required: false },
        rec_expire_time: { type: Date, required: false },
        /* Custom fields */
        custom_hdr: { type: Mixed, required: false },
        custom_dat: { type: Mixed, required: false }
    }, {
        collection: collection,
        autoIndex: true,
        strict: true
    });
    schema.set('toJSON', {
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
    return schema;
};
//# sourceMappingURL=UserPasswordsMongooseSchema.js.map