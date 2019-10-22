class User {
    constructor(id, username, password) {
        this._id = id;
        this._username = username;
        this._password = password;
    }

    get id() {
        return this._id;
    }

    set id(name) {
        this._id = name;
    }

    get username() {
        return this._username;
    }

    set username(name) {
        this._username = name;
    }

    get password() {
        return this._password;
    }

    set password(pass) {
        this._password = pass;
    }

}