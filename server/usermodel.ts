import {Card} from "./wzorce/builder";

export class User {
    _id: string = ''
    private _username: string = 'Player'
    private _class: number = 0
    private _deck: Card[] = []
    private _hand: Card[] = []
    private _score: number = 0
    private _mana: number = 0
    private _no: number = 0

    get deck(): Card[] {
        return this._deck;
    }
    set deck(value: Card[]) {
        this._deck = value;
    }

    get hand(): Card[] {
        return this._hand;
    }
    set hand(value: Card[]) {
        this._hand = value;
    }

    get class(): number {
        return this._class;
    }
    set class(value: number) {
        this._class = value;
    }

    get username(): string {
        return this._username;
    }
    set username(value: string) {
        this._username = value;
    }

    get score(): number {
        return this._score;
    }
    set score(value: number) {
        this._score = value;
    }

    get id(): string {
        return this._id;
    }
    set id(value: string) {
        this._id = value;
    }

    get mana(): number {
        return this._mana;
    }
    set mana(value: number) {
        this._mana = value;
    }

    get no(): number {
        return this._no;
    }
    set no(value: number) {
        this._no = value;
    }
}