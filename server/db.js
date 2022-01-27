const cards = [
    {id: '0', name: 'card0', description: 'Does nothing', mana: '0', hp: '2', atk: '0'},
    {id: '1', name: 'card1', description: 'Does nothing', mana: '0', hp: '1', atk: '0'},
    {id: '2', name: 'card2', description: 'Does nothing', mana: '1', hp: '1', atk: '2'},
    {id: '3', name: 'card3', description: 'Does nothing', mana: '2', hp: '3', atk: '1'},
    {id: '4', name: 'card4', description: 'Does nothing', mana: '3', hp: '4', atk: '2'},
    {id: '5', name: 'card5', description: 'Does nothing', mana: '4', hp: '5', atk: '3'},
    {id: '6', name: 'card6', description: 'Does nothing', mana: '5', hp: '7', atk: '2'},
    {id: '7', name: 'card7', description: 'Does nothing', mana: '1', hp: '1', atk: '3'},
    {id: '8', name: 'card8', description: 'Does nothing', mana: '2', hp: '9', atk: '2'},
    {id: '9', name: 'card9', description: 'Does nothing', mana: '5', hp: '9', atk: '2'},
    {id: '10', name: 'card10', description: 'Does nothing', mana: '4', hp: '9', atk: '2'},
    {id: '11', name: 'card11', description: 'Does nothing', mana: '4', hp: '9', atk: '2'},
    {id: '12', name: 'card12', description: 'Does nothing', mana: '10', hp: '25', atk: '1'},
    {id: '13', name: 'card13', description: 'Does nothing', mana: '9', hp: '9', atk: '10'},
    {id: '14', name: 'card14', description: 'Does nothing', mana: '8', hp: '8', atk: '8'},
    {id: '15', name: 'card15', description: 'Does nothing', mana: '2', hp: '3', atk: '1'},
    {id: '16', name: 'card16', description: 'Does nothing', mana: '3', hp: '1', atk: '2'},
    {id: '17', name: 'card17', description: 'Does nothing', mana: '7', hp: '9', atk: '2'},
    {id: '18', name: 'card18', description: 'Does nothing', mana: '3', hp: '1', atk: '4'},
    {id: '19', name: 'card19', description: 'Does nothing', mana: '6', hp: '6', atk: '7'},
    {id: '20', name: 'card20', description: 'Does nothing', mana: '5', hp: '9', atk: '2'},
    {id: '21', name: 'card21', description: 'Does nothing', mana: '4', hp: '5', atk: '2'},
    {id: '22', name: 'card22', description: 'Does nothing', mana: '3', hp: '2', atk: '2'},
    {id: '23', name: 'card23', description: 'Does nothing', mana: '2', hp: '1', atk: '6'},
    {id: '24', name: 'card24', description: 'Does nothing', mana: '1', hp: '3', atk: '1'},
    {id: '25', name: 'card25', description: 'Does nothing', mana: '1', hp: '1', atk: '1'},
    {id: '26', name: 'card26', description: 'Does nothing', mana: '20', hp: '100', atk: '100'},
]

const classes = [
    { id: '0', desc: "Your units receive +2hp", label: "Defensive" },
    { id: '1', desc: "Your units receive +1atk", label: "Aggresive" },
    { id: '2', desc: "Your units cost -1mana", label: "Swarm" }
];

module.exports = {
    cards, classes
}