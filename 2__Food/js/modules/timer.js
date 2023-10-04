function timer() {
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
            return num = `0${num}`;
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
            const remainingTime = getTimeRemainig(endtime),
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
};

export default timer;