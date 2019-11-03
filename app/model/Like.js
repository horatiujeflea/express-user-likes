class Like {
    constructor(fromUser, toUser) {
        this._fromUser = fromUser;
        this._toUser = toUser;
    }

    get fromUser() {
        return this._fromUser;
    }

    set fromUser(user) {
        this._fromUser = user;
    }

    get toUser() {
        return this._toUser;
    }

    set toUser(user) {
        this._toUser = user;
    }
}