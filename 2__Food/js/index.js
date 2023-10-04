import tabs from './modules/tabs';
import timer from './modules/timer';
import modal, { openModal } from './modules/modal';
import form from './modules/form';
import cards from './modules/cards';
import slider from './modules/slider';
import calculator from './modules/calculator';

window.addEventListener('DOMContentLoaded', () => {
    const modalId = setTimeout(() => openModal('.modal', modalId), 50000);

    tabs('.tabheader__item', '.tabheader__items', '.tabcontent', 'tabheader__item_active');
    timer('.timer', '2024-05-16');
    modal('[data-modal]', '.modal', modalId);
    form('form', modalId);
    cards();
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        wrapper: '.offer__slider-wrapper',
        inner: '.offer__slider-inner',
        currentCounter: '#current',
        totalCounter: '#total',
    });
    calculator();
})


