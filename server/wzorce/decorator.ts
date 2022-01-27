import {CardBuilderInterface} from "./builder";

export class PermamentDecorator implements CardBuilderInterface {
    private card: CardBuilderInterface;

    constructor(component: CardBuilderInterface) {
        this.card = component;
    }

    public setStat(arg0: number){
        this.card.setStat(arg0)
        return this
    }
    public Id() {
        return this.card.Id()
    }
    public setId(value: string) {
        this.card.setId(value)
        return this
    }
    public setHp(value: number) {
        this.card.setHp(value)
        return this
    }
    public setAtk(value: number) {
        this.card.setAtk(value)
        return this
    }
    public setName(arg0: string) {
        this.card.setName(arg0);
        return this
    }
    public setMana(value: number) {
        this.card.setMana(value)
        return this
    }

    Atk(): number {
        return this.card.Atk();
    }
    Hp(): number {
        return this.card.Hp();
    }
    Name(): string {
        return this.card.Name();
    }
    Mana(): number {
        return this.card.Mana();
    }
    Stat(): number {
        return this.card.Stat();
    }

    build() {
        return this.card.build()
    }
}

export class PermaClassHpBuff extends PermamentDecorator {
    public setHp(value: number) {
        return super.setHp(value+2)
    }
}

export class PermaClassAtkBuff extends PermamentDecorator {
    public setAtk(value: number) {
        return super.setAtk(value+1)
    }
}

export class PermaClassManaDecr extends PermamentDecorator {
    public setMana(value: number) {
        return super.setMana(value-1)
    }
}