import {User} from "../usermodel";

export abstract class Turn {
    user: User
    board: any

    constructor(user: User, board: any) {
        this.user = user
        this.board = board
    }

    protected increaseMana(): void {
        this.user.mana = this.user.mana+2
    }

    protected drawCard(): void {
        console.log('draw cards')
        if (this.user.deck.length > 0) {
            this.user.hand.push(this.user.deck[0])
            this.user.deck = this.user.deck.slice(1)
        } else this.user.score--
    }

    public abstract takeAction(action: any): void

    protected fight(): void {
        console.log('fight')
        let user1 = this.user.no
        let user2 = this.user.no === 0 ? 1 : 0
        for (let i=0;i<this.board[0].length;i++){
            let attacker = this.board[user1][i]
            if (attacker === undefined) continue
            let opponent = this.board[user2][i]
            if (opponent === undefined){
                this.user.score = this.user.score + attacker.atk
                continue
            }
            opponent.hp = opponent.hp - attacker.atk
            if (opponent.hp <= 0){
                this.board[user2][i] = undefined
            }
        }
    }

    public preTurn(): void {
        this.increaseMana()
        this.drawCard()
    }

    public postTurn(): void {
        this.fight()
    }

    public takeTurn(): User {
        this.increaseMana()
        this.drawCard()
        this.fight()

        return this.user
    }
}

export class StandardTurn extends Turn {
    public takeAction(action: any): void {
        // takes [card id in hand, board tile]
        let cardIndex = this.user.hand.findIndex(card => card.Id() === action[0])
        if (cardIndex === undefined || cardIndex === -1){
            console.log('You dont have that card in your hand')
            return
        }
        let manaCost = this.user.hand[cardIndex].mana
        if (this.board[this.user.no][action[1]] === undefined && this.user.mana >= manaCost){
            this.board[this.user.no][action[1]] = this.user.hand[cardIndex]
            this.user.mana = this.user.mana - manaCost
            this.user.hand = this.user.hand.filter(card => card.Id() !== action[0])
        }
        else
            console.log('Board space must be empty')
    }
}

export class FirstTurn extends Turn {
    public userAction(): void {}

    public preTurn() {
        this.drawCard()
        this.drawCard()
    }

    public takeAction(action: any): void {}

    public fight(): void {}
}



