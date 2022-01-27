const {User} = require("../usermodel");
const {cards, classes} = require('../db')
const {PermaClassHpBuff, PermaClassAtkBuff, PermaClassManaDecr} = require("./decorator");
const {CardBuilder} = require("./builder");
const {Game} = require('./state');

let connections: Array<any> = []
const users = new Map();
let game: any;

function rand(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array: any) {
    let currentIndex = array.length
    let randomIndex
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

const cardBuilder = (playerclass: number) => {
    switch(+playerclass){
        case 0:
            return new PermaClassHpBuff(new CardBuilder())
        case 1:
            return new PermaClassAtkBuff(new CardBuilder())
        case 2:
            return new PermaClassManaDecr(new CardBuilder())
        default:
            return new CardBuilder()
    }
}

class Facade {
    protected lobby: Lobby;
    protected match: Match;

    constructor(lobby: Lobby, match: Match) {
        this.lobby = lobby || undefined;
        this.match = match || undefined;
    }

    public init(): void {
        this.initLobby()
        this.initMatch()
    }

    public initLobby(): void {
        if (this.lobby === undefined) return

        this.lobby.setUsernameListener()
        this.lobby.getCardsListener()
        this.lobby.getClassesListener()
        this.lobby.connectErrorListener()
    }

    public initMatch(): void {
        if (this.match === undefined) return

        this.match.actionListener()
        this.match.nextTurnListener()
        this.match.playListener()
        this.match.resetListener()
    }
}

class Lobby {
    io: any;
    socket: any;

    constructor(io: any, socket: any) {
        this.io = io;
        this.socket = socket;
    }

    public setUsernameListener(): void {
        this.socket.on('setUsername', (username: any) => {
            if (users.has(this.socket.id)) {
                let tmp = users.get(this.socket.id)
                tmp.username = username
                users.set(this.socket.id, tmp)
            }
        })
    }

    public getCardsListener(): void {
        this.socket.on('getCards', () => {
            this.io.to(`${this.socket.id}`).emit('cardsList', cards)
        })
    }

    public getClassesListener(): void {
        this.socket.on('getClasses', () => {
            this.io.to(`${this.socket.id}`).emit('classesList', classes)
        })
    }

    public connectErrorListener(): void {
        this.socket.on('connect_error', (err: any) => {
            console.log(`connect_error due to ${err.message}`);
        });
    }
}

class Match {
    io: any;
    socket: any;

    constructor(io: any, socket: any) {
        this.io = io;
        this.socket = socket;
    }

    private sendUpdate(): void {
        users.forEach(user => {
            let tmp = {
                myid: user.id,
                turncount: game.turncount,
                board: game.board,
                player1: game._player1,
                player2: game._player2,
                player: game.state.turn.user._id,
                victor: game.isWinner(),
                victormessage: game.getWinnerMessage()
            }
            this.io.to(`${user.id}`).emit('status', tmp)
        })
    }

    private setUpGame(): void {
        let tmp: Array<any> = []
        users.forEach(user => tmp.push(user))
        let User1 = new User()
        User1.id = tmp[0].id
        User1.username = tmp[0].username
        User1.class = tmp[0].class
        User1.no = 0

        let User2 = new User()
        User2.id = tmp[1].id
        User2.username = tmp[1].username
        User2.class = tmp[1].class
        User2.no = 1

        let tmpclass1 = []
        let tmpclass2 = []
        for (let i=0;i<tmp[0].deck.length;i++){
            let buff = cardBuilder(tmp[0].class)
                .setId(`${tmp[0].class}${i}`)
                .setName(`Unit-${tmp[0].class}-${i}`)
                .setHp(+cards[i].hp)
                .setAtk(+cards[i].atk)
                .setMana(+cards[i].mana)
                .setStat(rand(1, 10))
                .build()
            tmpclass1.push(buff)
        }
        for (let i=0;i<tmp[1].deck.length;i++){
            let buff = cardBuilder(tmp[1].class)
                .setId(`${tmp[1].class}${i}`)
                .setName(`Unit-${tmp[1].class}-${i}`)
                .setHp(+cards[i].hp)
                .setAtk(+cards[i].atk)
                .setMana(+cards[i].mana)
                .setStat(rand(1, 10))
                .build()
            tmpclass2.push(buff)
        }

        shuffle(tmpclass1)
        shuffle(tmpclass2)

        User1.deck = tmpclass1
        User2.deck = tmpclass2

        game = new Game(User1, User2)
        game.takeTurn()

        this.sendUpdate()
    }

    public playListener(): void {
        this.socket.on('play', (deck: any, pclass: any, username: any) => {
            if (users.has(this.socket.id)) {
                let tmp = users.get(this.socket.id)
                tmp.id = this.socket.id
                tmp.deck = deck
                tmp.class = pclass
                tmp.username = username
                tmp.ready = true
                tmp.hand = []
                tmp.score = 0
                tmp.mana = 0
                users.set(this.socket.id, tmp)
            }
            this.io.to(`${this.socket.id}`).emit('enterLobby')
            let rdy = true
            users.forEach(user => {if(!user.ready) rdy = false})
            if (rdy) {
                this.setUpGame()
            }
        })
    }

    public actionListener(): void {
        this.socket.on('action', (action: [string, number]) => {
            game.takeAction(action)
            this.sendUpdate()
        })
    }

    public resetListener(): void {
        this.socket.on('reset', () => {
            this.setUpGame()
        })
    }

    public nextTurnListener(): void {
        this.socket.on('nextTurn', () => {
            this.sendUpdate()
            game.swapSides()
            game.takeTurn()
            this.sendUpdate()
        })
    }
}

function clientCode(io: any) {
    io.on('connection', (socket: any) => {
        connections.push(socket.id)
        if (users.size < 2) {
            users.set(socket.id, {username: 'Player', deck: ['1'], class: '1', ready: false})

            const lobby = new Lobby(io, socket);
            const match = new Match(io, socket);

            const facade = new Facade(lobby, match);

            facade.init()
        }
        console.log('connected', connections, users)

        socket.on('disconnect', () => {
            console.log('disconnect', socket.id, users)
            connections = connections.filter(id => socket.id !== id)
            users.delete(socket.id);
        })
    });
}

module.exports = {
    clientCode
}
export {}