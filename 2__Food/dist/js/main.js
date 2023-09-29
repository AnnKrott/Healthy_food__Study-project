// TABS

const tabItem = document.querySelectorAll('.tabheader__item'),
    tabItems = document.querySelector('.tabheader__items'),
    tabContent = document.querySelectorAll('.tabcontent');

function hideTabs() {
    tabContent.forEach(item => {
        item.classList.remove('show', 'fade');
        item.classList.add('hide');
    })
    tabItem.forEach(item => {
        item.classList.remove('tabheader__item_active');
    })
}

function showTheTab(i = 0) {
    tabContent[i].classList.add('show', 'fade');
    tabContent[i].classList.remove('hide');
    tabItem[i].classList.add('tabheader__item_active');
}

tabItems.addEventListener('click', (e) => {
    const target = e.target;

    if (target && target.classList.contains('tabheader__item')) {
        tabItem.forEach((item, i) => {
            if (target == item) {
                hideTabs();
                showTheTab(i);
            }
        })
    }
})

hideTabs();
showTheTab();

// TIMER

const deadline = '2024-05-16';

function getTimeRemainig(endtime) {
    const difference = Date.parse(endtime) - Date.parse(new Date());

    const sec = difference / 1000 % 60;
    const min = Math.floor(difference / (1000 * 60) % 60);
    const hours = Math.floor(difference / (1000 * 60 * 60) % 24);
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    return {
        'difference': difference,
        'sec': sec,
        'min': min,
        'hours': hours,
        'days': days,
    }
}

function getZero(num) {
    if (num >= 0 && num < 10) {
        return num = `0${num}`
    } else {
        return num;
    }
}

function setTimer(selector, endtime) {
    const timer = document.querySelector(selector);
    const sec = timer.querySelector('#seconds');
    const min = timer.querySelector('#minutes');
    const hours = timer.querySelector('#hours');
    const days = timer.querySelector('#days');
    const timerID = setInterval(updateTimer, 1000);
    updateTimer();

    function updateTimer() {
        const remainingTime = getTimeRemainig(endtime);
        difference = getZero(remainingTime.difference);
        sec.innerHTML = getZero(remainingTime.sec);
        min.innerHTML = getZero(remainingTime.min);
        hours.innerHTML = getZero(remainingTime.hours);
        days.innerHTML = getZero(remainingTime.days);

        if (remainingTime <= 0) {
            clearInterval(timerID);
        }
    }
}
setTimer('.timer', deadline);

//MODAL

const openModalBtn = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalId = setTimeout(openModal, 20000);

//functions

function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.scrollbarGutter = 'stable';
    clearInterval(modalId);
    window.removeEventListener('scroll', openModalByScroll);
}

function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function openModalByScroll() {
    if (Math.round(window.scrollY) + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal();
    }
}

//eventlisteners

openModalBtn.forEach(btn => {
    btn.addEventListener('click', openModal)
})

modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
        closeModal();
    }
})

document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
})

window.addEventListener('scroll', openModalByScroll);


// CARDS

class Card {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        //курс валют
        this.transfer = 27;
        this.changeToUAH();
        // 
        this.parent = document.querySelector(parentSelector);
        this.classes = classes;
    }

    changeToUAH() {
        this.price *= this.transfer;
    }

    render() {
        const div = document.createElement('div');
        if (this.classes.length === 0) {
            this.div = 'menu__item';
            div.classList.add(this.div);
        } else {
            this.classes.forEach(className => div.classList.add(className));
        }

        div.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        `;
        this.parent.append(div);
    }
}

new Card(
    "img/tabs/hamburger.jpg",
    "hamburger",
    'Меню "Сытное"',
    'Меню "Сытное" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.Продукт активных и здоровых людей.Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container',
    // 'menu__item',
    // 'big',
    // 'small',
).render();

// FORM

const form = document.querySelectorAll('form');

const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Мы скоро с вами свяжемся',
    failure: 'Произошла ошибка, попробуйте еще раз позднее.',
};

form.forEach((item) => {
    postData(item);
})

function postData(form) {

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMessage);

        const formData = new FormData(form);
        const obj = {};
        formData.forEach(function (key, value) {
            obj[key] = value;
        });

        fetch('server.php', {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(obj),
        })
            .then(data => data.text())
            .then(data => {
                showThanksModal(message.success);
                statusMessage.remove();
                console.log(data);
            })
            .catch(() => {
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset();
            });

    })
};

// THANKSMODAL

function showThanksModal(message) {

    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    prevModalDialog.classList.remove('show');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
        `
    modal.append(thanksModal);

    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal();
    }, 3000)

}


