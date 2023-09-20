window.addEventListener('DOMContentLoaded', () => {

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
})

// timer

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

//modal

const openModalBtn = document.querySelectorAll('[data-modal]'),
    closeModalBtn = document.querySelector('[data-close'),
    modal = document.querySelector('.modal');


openModalBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
    })
})

function closeModal() {
    modal.classList.toggle('show');
    document.body.style.overflow = '';
}

closeModalBtn.addEventListener('click', closeModal);

modal.addEventListener('click', e => {
    if (e.target === modal) {
        closeModal();
    }
})

document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
})






