const { FirstTurn, StandardTurn } = require("./template-method");

class Game {
    constructor(player1, player2) {
        this.turncount = 0;
        this.board = [
            [undefined, undefined, undefined, undefined],
            [undefined, undefined, undefined, undefined]
        ];
        this._player1 = player1;
        this._player2 = player2;
        this.state = new FirstPlayerTurn();
        this.state.setTurn(new FirstTurn(this.player1, this.board));
        this.state.setGame(this);
        this.state.takeTurn();
        this.state.switchSides();
        this.state = new FirstPlayerTurn();
        this.state.setTurn(new FirstTurn(this.player2, this.board));
        this.state.setGame(this);
        this.state.takeTurn();
        this.state.switchSides();
        this.transitionTo(new Player1Turn(), player1);
    }
    transitionTo(state, player) {
        console.log(`Context: Transition to ${state.constructor.name}.`);
        this.state = state;
        this.state.setTurn(new StandardTurn(player, this.board));
        this.state.setGame(this);
    }
    takeTurn() {
        this.state.takeTurn();
    }
    takeAction(action) {
        this.state.takeAction(action);
    }
    swapSides() {
        this.state.switchSides();
        if (this.isWinner())
            console.log(this.getWinnerMessage());
    }
    isWinner() {
        return Math.abs(this.player1.score - this.player2.score) >= 15 || this.turncount > 99;
    }
    getWinnerMessage() {
        if (!this.isWinner() || this.player1.score === this.player2.score)
            return 'draw';
        if (this.player1.score > this.player2.score)
            return `${this.player1.username} wins`;
        else
            return `${this.player2.username} wins`;
    }
    get Turn() {
        return this.state;
    }
    set Turn(state) {
        this.state = state;
    }
    get player2() {
        return this._player2;
    }
    set player2(value) {
        this._player2 = value;
    }
    get player1() {
        return this._player1;
    }
    set player1(value) {
        this._player1 = value;
    }
}

class State {
    setGame(game) {
        this.game = game;
    }
    setTurn(turn) {
        this.turn = turn;
    }
}
class Player1Turn extends State {
    takeTurn() {
        var _a;
        console.log(`TURN ${this.game.turncount} - player 1`);
        (_a = this.turn) === null || _a === void 0 ? void 0 : _a.preTurn();
    }
    takeAction(action) {
        // [card id in hand, board tile]
        console.log("player 1 action", action);
        this.turn.takeAction(action);
    }
    switchSides() {
        var _a;
        console.log("player 1 ends turn");
        (_a = this.turn) === null || _a === void 0 ? void 0 : _a.postTurn();
        this.game.turncount++;
        this.game.transitionTo(new Player2Turn(), this.game.player2);
    }
}
class Player2Turn extends State {
    takeTurn() {
        var _a;
        console.log(`TURN ${this.game.turncount} - player 2`);
        (_a = this.turn) === null || _a === void 0 ? void 0 : _a.preTurn();
    }
    takeAction(action) {
        // [card id in hand, board tile]
        console.log("player 2 action", action);
        this.turn.takeAction(action);
    }
    switchSides() {
        var _a;
        console.log("player 2 ends turn");
        (_a = this.turn) === null || _a === void 0 ? void 0 : _a.postTurn();
        this.game.turncount++;
        this.game.transitionTo(new Player1Turn(), this.game.player1);
    }
}
class FirstPlayerTurn extends State {
    takeTurn() {
        var _a;
        console.log('set-up player takes turn');
        (_a = this.turn) === null || _a === void 0 ? void 0 : _a.preTurn();
    }
    takeAction(action) { }
    switchSides() {
        var _a;
        console.log("player ends turn");
        (_a = this.turn) === null || _a === void 0 ? void 0 : _a.postTurn();
    }
}

module.exports = {
    Game,
    FirstPlayerTurn,
    State,
    Player1Turn,
    Player2Turn
}