function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, inner }) {
    // SLIDER

    const slider = document.querySelector(container),
        slides = document.querySelectorAll(slide),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),

        slidesWrapper = document.querySelector(wrapper),
        slidesInner = document.querySelector(inner),
        width = window.getComputedStyle(slidesWrapper).width,

        currentIndex = document.querySelector(currentCounter),
        totalIndex = document.querySelector(totalCounter);

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
    });


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
};

export default slider;