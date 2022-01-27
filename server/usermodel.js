class User {
    constructor() {
        this._id = '';
        this._username = 'Player';
        this._class = 0;
        this._deck = [];
        this._hand = [];
        this._score = 0;
        this._mana = 0;
        this._no = 0;
    }
    get deck() {
        return this._deck;
    }
    set deck(value) {
        this._deck = value;
    }
    get hand() {
        return this._hand;
    }
    set hand(value) {
        this._hand = value;
    }
    get class() {
        return this._class;
    }
    set class(value) {
        this._class = value;
    }
    get username() {
        return this._username;
    }
    set username(value) {
        this._username = value;
    }
    get score() {
        return this._score;
    }
    set score(value) {
        this._score = value;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get mana() {
        return this._mana;
    }
    set mana(value) {
        this._mana = value;
    }
    get no() {
        return this._no;
    }
    set no(value) {
        this._no = value;
    }
}

module.exports = {
    User
}
