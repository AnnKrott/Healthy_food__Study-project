function tabs() {
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
};

export default tabs;