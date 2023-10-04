function tabs(tabsSelector, tabsParent, tabsContent, activeClass) {
    // TABS

    const tabItem = document.querySelectorAll(tabsSelector),
        tabItems = document.querySelector(tabsParent),
        tabContent = document.querySelectorAll(tabsContent);

    function hideTabs() {
        tabContent.forEach(item => {
            item.classList.remove('show', 'fade');
            item.classList.add('hide');
        })
        tabItem.forEach(item => {
            item.classList.remove(activeClass);
        })
    }

    function showTheTab(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabItem[i].classList.add(activeClass);
    }

    tabItems.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
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