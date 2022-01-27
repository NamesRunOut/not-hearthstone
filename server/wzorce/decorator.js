class PermamentDecorator {
    constructor(component) {
        this.card = component;
    }
    setStat(arg0) {
        this.card.setStat(arg0);
        return this;
    }
    Id() {
        return this.card.Id();
    }
    setId(value) {
        this.card.setId(value);
        return this;
    }
    setHp(value) {
        this.card.setHp(value);
        return this;
    }
    setAtk(value) {
        this.card.setAtk(value);
        return this;
    }
    setName(arg0) {
        this.card.setName(arg0);
        return this;
    }
    setMana(value) {
        this.card.setMana(value);
        return this;
    }
    Atk() {
        return this.card.Atk();
    }
    Hp() {
        return this.card.Hp();
    }
    Name() {
        return this.card.Name();
    }
    Mana() {
        return this.card.Mana();
    }
    Stat() {
        return this.card.Stat();
    }
    build() {
        return this.card.build();
    }
}
class PermaClassHpBuff extends PermamentDecorator {
    setHp(value) {
        return super.setHp(value + 2);
    }
}
class PermaClassAtkBuff extends PermamentDecorator {
    setAtk(value) {
        return super.setAtk(value + 1);
    }
}
class PermaClassManaDecr extends PermamentDecorator {
    setMana(value) {
        return super.setMana(value - 1);
    }
}

module.exports = {
    PermaClassHpBuff: PermaClassHpBuff,
    PermaClassAtkBuff: PermaClassAtkBuff,
    PermaClassManaDecr: PermaClassManaDecr
}