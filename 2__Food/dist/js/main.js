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

const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}

// getResource('http://localhost:3000/menu')
//     .then(data => {
//         data.forEach(({ img, altimg, title, descr, price }) => {
//             new Card(img, altimg, title, descr, price, '.menu .container').render();
//         })
//     })

axios.get('http://localhost:3000/menu')
    .then(data => {
        data.data.forEach(({ img, altimg, title, descr, price }) => {
            new Card(img, altimg, title, descr, price, '.menu .container').render();
        })
    })

// FORM

const form = document.querySelectorAll('form');

const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Мы скоро с вами свяжемся',
    failure: 'Произошла ошибка, попробуйте еще раз позднее.',
};

form.forEach((item) => {
    bindPostData(item);
})

const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data,
    })
    return await res.json();
}

function bindPostData(form) {

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
        const json = JSON.stringify(Object.fromEntries(formData.entries()));


        postData('http://localhost:3000/requests', json)
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

// SLIDER

const slides = document.querySelectorAll('.offer__slide'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),

    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesInner = document.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(slidesWrapper).width,

    currentIndex = document.querySelector('#current'),
    totalIndex = document.querySelector('#total'),

    slider = document.querySelector('.offer__slider');

let index = 1;
let offset = 0;

//functions
function setCurrentIndex() {
    if (slides.length < 10) {
        currentIndex.textContent = `0${index}`;
    } else {
        currentIndex.textContent = index;
    }
}

function accentDot() {
    dots.forEach(dot => {
        dot.style.opacity = 0.5;
        dots[index - 1].style.opacity = 1;
    })
}

function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
}

//carousel
slidesInner.classList.add('offer__slider-inner-active');
slidesWrapper.classList.add('offer__slider-wrapper-active');
slidesInner.style.width = 100 * slides.length + '%';
slides.forEach(slide => {
    slide.style.width = width;
})


//dots
const indicators = document.createElement('ol');
indicators.classList.add('carousel-indicators');
slider.style.position = 'relative';
slider.append(indicators);

const dots = [];

for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');
    indicators.append(dot);
    dots.push(dot);

    if (i == 0) {
        dot.style.opacity = 1;
    }
}

//zero initial indexes
if (slides.length < 10) {
    totalIndex.textContent = `0${slides.length}`;
    currentIndex.textContent = `0${index}`;
}

//event listeners
next.addEventListener('click', () => {
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
        offset = 0;
    } else {
        offset += deleteNotDigits(width);
    }
    slidesInner.style.transform = `translateX(-${offset}px)`;

    //change of index
    if (index === slides.length) {
        index = 1;
    } else {
        index++;
    }

    setCurrentIndex();
    accentDot();

});

prev.addEventListener('click', () => {
    if (offset == 0) {
        offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
        offset -= deleteNotDigits(width);
    }
    slidesInner.style.transform = `translateX(-${offset}px)`;

    //change of index
    if (index == 1) {
        index = slides.length;
    } else {
        index--;
    }

    setCurrentIndex();
    accentDot();

});

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');
        index = slideTo;
        offset = deleteNotDigits(width) * (slideTo - 1);
        slidesInner.style.transform = `translateX(-${offset}px)`;
        accentDot();
    })
})

// showSlides(index);

// if (slides.length > 10) {
//     totalIndex.textContent = slides.length;
// } else {
//     totalIndex.textContent = `0${slides.length}`;
// }

// function showSlides(ind) {

//     if (ind > slides.length) {
//         index = 1;
//     }
//     if (ind < 1) {
//         index = slides.length;
//     }

//     slides.forEach(slide => {
//         slide.style.display = 'none';
//         slides[index - 1].style.display = 'block';

//         if (slides.length > 10) {
//             currentIndex.textContent = index;
//         } else {
//             currentIndex.textContent = `0${index}`
//         }
//     })
// }

// function changeSlides(ind) {
//     showSlides(index += ind);
// }

// prev.addEventListener('click', () => {
//     changeSlides(-1);
// })

// next.addEventListener('click', () => {
//     changeSlides(1);
// })


//CALCULATOR 

const resultCalc = document.querySelector('.calculating__result span');
let sex = female, height, weight, age, ratio = 1.375;

function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
        resultCalc.textContent = '____';
        return
    }
    if (sex === 'female') {
        resultCalc.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
        resultCalc.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
}

calcTotal();

function getStaticInformation(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);

    elements.forEach(elem => {
        elem.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
                ratio = +e.target.getAttribute('data-ratio');
            } else {
                sex = e.target.getAttribute('id');
            }
            elements.forEach(elem => {
                elem.classList.remove(activeClass);
                e.target.classList.add(activeClass);
            })
            calcTotal();
        })
    })
}

function getDinamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
        switch (input.getAttribute('id')) {
            case 'height':
                height = +input.value;
                break;
            case 'weight':
                weight = +input.value;
                break;
            case 'age':
                age = +input.value;
                break;
        }
        calcTotal()
    })
}

getStaticInformation('#gender', 'calculating__choose-item_active');
getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');
getDinamicInformation('#height');
getDinamicInformation('#weight');
getDinamicInformation('#age');

