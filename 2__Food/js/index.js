window.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs');
    const timer = require('./modules/timer');
    const modal = require('./modules/modal');
    const form = require('./modules/form');
    const cards = require('./modules/cards');
    const slider = require('./modules/slider');
    const calculator = require('./modules/calculator');

    tabs();
    timer();
    modal();
    form();
    cards();
    slider();
    calculator();
})


