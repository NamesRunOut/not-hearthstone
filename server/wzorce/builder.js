class Card {
    constructor() {
        this.id = '';
        this.stat = 0;
        this.name = 'default name';
        this.hp = 1;
        this.atk = 0;
        this.mana = 0;
    }
    Id() {
        return this.id;
    }
    setId(value) {
        this.id = value;
    }
    Hp() {
        return this.hp;
    }
    setHp(value) {
        this.hp = value;
        return this.hp;
    }
    Atk() {
        return this.hp;
    }
    setAtk(value) {
        if (value >= 0)
            this.atk = value;
        else
            this.atk = 0;
        return this.atk;
    }
    Mana() {
        return this.hp;
    }
    setMana(value) {
        if (value >= 0)
            this.mana = value;
        else
            this.mana = 0;
        return this.mana;
    }
    setStat(value) {
        this.stat = value;
    }
}
class CardBuilder {
    constructor() {
        this.card = new Card();
    }
    Id() {
        return this.card.id;
    }
    setId(value) {
        this.card.id = value;
        return this;
    }
    Hp() {
        return this.card.hp;
    }
    setHp(value) {
        this.card.hp = value;
        return this;
    }
    Atk() {
        return this.card.atk;
    }
    setAtk(value) {
        this.card.atk = value;
        return this;
    }
    Mana() {
        return this.card.mana;
    }
    setMana(value) {
        if (value >= 0)
            this.card.mana = value;
        else
            this.card.mana = 0;
        return this;
    }
    setStat(value) {
        this.card.stat = value;
        return this;
    }
    Stat() {
        return this.card.stat;
    }
    setName(value) {
        this.card.name = value;
        return this;
    }
    Name() {
        return this.card.name;
    }
    build() {
        return this.card;
    }
}

module.exports = {
    Card, CardBuilder
}
