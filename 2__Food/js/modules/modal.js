function openModal(modalSelector, modalId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.scrollbarGutter = 'stable';

    if (modalId) {
        clearInterval(modalId);
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalId) {
    const openModalBtn = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    //functions
    function openModalByScroll() {
        if (Math.round(window.scrollY) + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalId);
            window.removeEventListener('scroll', openModalByScroll);
        }
    }

    //eventlisteners
    openModalBtn.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalId));
    })

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    })

    document.addEventListener('keydown', e => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    })

    window.addEventListener('scroll', openModalByScroll);
};

export default modal;
export { openModal, closeModal };