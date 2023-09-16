'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "пираты Карибского моря",
            "лига справедливости",
            "скотт Пилигрим против...",
            "перед рассветом",
            "одержимость",
            "астрал",
        ]
    };

    const advImg = document.querySelectorAll('.promo__adv img');
    const poster = document.querySelector('.promo__bg');
    const genre = poster.querySelector('.promo__genre');
    const interactiveList = document.querySelector('.promo__interactive-list');

    const form = document.querySelector('.add');
    const input = document.querySelector('.adding__input');
    const checkbox = form.querySelector('[type="checkbox"]');


    const addChanges = () => {
        genre.textContent = 'драма';
        poster.style.cssText = 'background: url(./img/bg.jpg) center center/cover no-repeat';
    };

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        })
    };

    const sortArr = (arr) => {
        arr.sort();
    };

    function setListOfFilms(films, parent) {

        parent.innerHTML = "";

        films.forEach((film, i) => {
            parent.innerHTML += `
            <li class="promo__interactive-item">
            ${i + 1}. ${film}
            <div class="delete"></div>
            </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                setListOfFilms(films, parent);
            })
        })
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let newFilm = input.value;
        const favourite = checkbox.checked;

        if (newFilm.length > 23) {
            newFilm = newFilm.slice(0, 22) + '...';
        }

        if (newFilm) {
            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);

            e.target.reset();
            setListOfFilms(movieDB.movies, interactiveList);
        }

        if (favourite) {
            console.log('Добавляем любимый фильм');
        }

    });

    addChanges();
    deleteAdv(advImg);
    setListOfFilms(movieDB.movies, interactiveList);
    sortArr(movieDB.movies);
})    
