function modal() {
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
};

module.exports = modal;