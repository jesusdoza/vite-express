import { Schema, model } from "mongoose";
import { genSalt, hash as _hash, compare } from "bcrypt";

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            defaul: Date.now(),
            immutable: true,
        },
        role: {
            type: String,
            default: "basic",
        },
        version: {
            type: Number,
            default: 1,
        },
        email: {
            // unique:true,
            type: String,
            default: "no_email",
            lowercase: true,
        },
        groups: {
            type: [String],
            default: function () {
                return this.username;
            },
        },
    },
    {
        collection: "users",
    }
);

// Password hash middleware.
UserSchema.pre("save", function save(next) {
    // console.log(`pre save`, this)
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        _hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            console.log(user);
            next();
        });
    });
});

// Helper method for validating user's password.
UserSchema.methods.comparePassword = function comparePassword(
    candidatePassword,
    cb
) {
    compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};

export const User = model("User", UserSchema);
