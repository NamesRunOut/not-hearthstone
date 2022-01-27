import {User} from "../usermodel";
import {FirstTurn, StandardTurn, Turn} from "./template-method";

export class Game {
    private state: State;
    private _player1: User
    private _player2: User
    turncount: number = 0
    board: any = [
        [undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined]
    ]

    constructor(player1: User, player2: User) {
        this._player1 = player1
        this._player2 = player2

        this.state = new FirstPlayerTurn()
        this.state.setTurn(new FirstTurn(this.player1, this.board))
        this.state.setGame(this)
        this.state.takeTurn()
        this.state.switchSides()

        this.state = new FirstPlayerTurn()
        this.state.setTurn(new FirstTurn(this.player2, this.board))
        this.state.setGame(this)
        this.state.takeTurn()
        this.state.switchSides()

        this.transitionTo(new Player1Turn(), player1)
    }

    public transitionTo(state: State, player: User): void {
        console.log(`Context: Transition to ${(<any>state).constructor.name}.`);
        this.state = state;
        this.state.setTurn(new StandardTurn(player, this.board))
        this.state.setGame(this);
    }

    public takeTurn(): void {
        this.state.takeTurn()
    }

    public takeAction(action: any): void {
        this.state.takeAction(action)
    }

    public swapSides(): void {
        this.state.switchSides();
        if (this.isWinner()) console.log(this.getWinnerMessage())
    }

    public isWinner(): boolean {
        return Math.abs(this.player1.score - this.player2.score) >= 15 || this.turncount > 99;
    }

    public getWinnerMessage(): string {
        if (!this.isWinner() || this.player1.score === this.player2.score) return 'draw'
        if (this.player1.score > this.player2.score) return `${this.player1.username} wins`
        else return `${this.player2.username} wins`
    }

    get Turn(): State {
        return this.state;
    }
    set Turn(state: State) {
        this.state = state;
    }
    get player2(): User {
        return this._player2;
    }
    set player2(value: User) {
        this._player2 = value;
    }
    get player1(): User {
        return this._player1;
    }
    set player1(value: User) {
        this._player1 = value;
    }
}

abstract class State {
    // @ts-ignore
    protected game: Game
    // @ts-ignore
    turn: Turn

    public setGame(game: Game) {
        this.game = game;
    }

    public setTurn(turn: Turn) {
        this.turn = turn;
    }

    public abstract takeTurn(): void;
    public abstract takeAction(action: any): void;
    public abstract switchSides(): void;
}

export class Player1Turn extends State {
    public takeTurn(): void {
        console.log(`TURN ${this.game.turncount} - player 1`)
        this.turn?.preTurn()
    }

    public takeAction(action: any): void {
        // [card id in hand, board tile]
        console.log("player 1 action", action)
        this.turn.takeAction(action)
    }

    public switchSides(): void {
        console.log("player 1 ends turn");
        this.turn?.postTurn()
        this.game.turncount++
        this.game.transitionTo(new Player2Turn(), this.game.player2)
    }
}

export class Player2Turn extends State {
    public takeTurn(): void {
        console.log(`TURN ${this.game.turncount} - player 2`)
        this.turn?.preTurn()
    }

    public takeAction(action: any): void {
        // [card id in hand, board tile]
        console.log("player 2 action", action)
        this.turn.takeAction(action)
    }

    public switchSides(): void {
        console.log("player 2 ends turn");
        this.turn?.postTurn()
        this.game.turncount++
        this.game.transitionTo(new Player1Turn(), this.game.player1)
    }
}

export class FirstPlayerTurn extends State {
    public takeTurn(): void {
        console.log('set-up player takes turn')
        this.turn?.preTurn()
    }

    public takeAction(action: any): void {}

    public switchSides(): void {
        console.log("player ends turn");
        this.turn?.postTurn()
    }
}