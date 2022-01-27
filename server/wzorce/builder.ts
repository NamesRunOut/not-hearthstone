export interface CardInterface {
    Hp(): number
    setHp(arg0: number): void

    Atk(): number
    setAtk(arg0: number): void

    Mana(): number
    setMana(arg0: number): void

    setStat(arg0: number): void
}

export class Card implements CardInterface{
    id: string = ''
    public stat: number = 0
    public name: string = 'default name'

    public hp: number = 1
    public atk: number = 0
    public mana: number = 0

    Id(): string {
        return this.id;
    }
    setId(value: string) {
        this.id = value;
    }

    public Hp() {
        return this.hp
    }
    public setHp(value: number) {
        this.hp = value
        return this.hp
    }

    public Atk() {
        return this.hp
    }
    public setAtk(value: number) {
        if (value >= 0) this.atk = value
        else this.atk = 0
        return this.atk
    }

    public Mana() {
        return this.hp
    }
    public setMana(value: number) {
        if (value >= 0) this.mana = value
        else this.mana = 0
        return this.mana
    }

    public setStat(value: number) {
        this.stat = value
    }
}

export interface CardBuilderInterface {
    Id(): string
    setId(arg0: string): CardBuilderInterface

    Stat(): number
    setStat(arg0: number): CardBuilderInterface

    Name(): string
    setName(arg0: string): CardBuilderInterface

    Hp(): number
    setHp(arg0: number): CardBuilderInterface

    Atk(): number
    setAtk(arg0: number): CardBuilderInterface

    Mana(): number
    setMana(arg0: number): CardBuilderInterface

    build(): Card
}

export class CardBuilder implements CardBuilderInterface {
    private card: Card;

    constructor() {
        this.card = new Card()
    }

    public Id() {
        return this.card.id
    }
    public setId(value: string) {
        this.card.id = value
        return this
    }

    public Hp() {
        return this.card.hp
    }
    public setHp(value: number) {
        this.card.hp = value
        return this
    }

    public Atk() {
        return this.card.atk
    }
    public setAtk(value: number) {
        this.card.atk = value
        return this
    }

    public Mana() {
        return this.card.mana
    }
    public setMana(value: number) {
        if (value >= 0) this.card.mana = value
        else this.card.mana = 0
        return this
    }

    public setStat(value: number) {
        this.card.stat = value;
        return this
    }
    public Stat() {
        return this.card.stat
    }

    public setName(value: string) {
        this.card.name = value;
        return this
    }
    public Name() {
        return this.card.name
    }

    public build(): Card {
        return this.card;
    }
}