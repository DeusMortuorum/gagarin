import Swiper from 'swiper/bundle';
import IMask from 'imask';

window.onload = function () {

    let preloader = document.querySelector('.preloader');
    preloader.classList.add('loaded');


    let menuLinks = document.querySelectorAll('.nav-header__link');//выбираю все кружочки внутри навигации слева внизу
    let headerBurger = document.querySelector('.header__burger');//бургер в хедере
    let calm = document.querySelector('.calm');//блок спокойствие
    let connection = document.querySelector('.connection');//блок с формой
    let footer = document.querySelector('.footer');//подвал
    let clientsSlider = document.querySelector('.clients__slider');//блок со слайдером
    let headerBack = document.querySelector('.header__back');//кнопка на главнубю
    let checkbox = document.querySelector('.form-connection__checkbox');//блок с чекбоксом
    let submitButton = document.querySelector('.form-connection__submit');//кнопка отправки
    let form = document.querySelector('.form-connection');//форма отправки данных для мейлера
    let submitMessage = document.querySelector('.submit-message');//блок сообщения об отправке
    let formPhone = document.querySelector('.input-phone');//поле телефона для маски

    //маска на телефон
    if (formPhone) { // если найден
        let maskOptions = {
            mask: '+38 (000) 000-00-00', // шаблон
            lazy: true, // make placeholder always visible если фолс
            //если фолс то плейсхолдера нету, еа маску видно. если тру то маска при активности
        };

        let patternMask = IMask(formPhone, maskOptions);
        //при фокусе видня маска
        formPhone.addEventListener('focus', function () {
            patternMask.updateOptions({lazy: false});
        });
        //когда теряет фокус что бы было видно плейсхолдер
        formPhone.addEventListener('blur', function () {
            patternMask.updateOptions({lazy: true});
        });
    }
    //если второй блок существует
    if (calm) {
        window.onscroll = function (e) {
            if (window.scrollY >= calm.offsetTop) {//если пролистала больше или ранво чем второй блок
                headerBurger.classList.add('white');//меняю цвет бутера
                headerBack.classList.add('active');//делаю видимой стрелку на верх
            } else {
                headerBurger.classList.remove('white');//вернуть черный цвет если меньше второго блока
                headerBack.classList.remove('active'); //убрать стрелку
            }
            //наверное проще на словах объяснить
            if (window.scrollY + window.innerHeight > calm.offsetTop + 100 && !(window.scrollY + window.innerHeight > connection.offsetTop)) {
                menuLinks.forEach(menuLink => {
                    menuLink.classList.add('white');
                });
            } else if (window.scrollY + window.innerHeight > footer.offsetTop) {
                menuLinks.forEach(menuLink => {
                    menuLink.classList.add('white');
                });
            } else {
                menuLinks.forEach(menuLink => {
                    menuLink.classList.remove('white');
                });
            }
            if (window.scrollY + window.innerHeight > connection.offsetTop && !(window.scrollY + window.innerHeight > footer.offsetTop)) {
                headerBack.classList.add('black');
            } else {
                headerBack.classList.remove('black');
            }

            menuHighlight();
        };

        menuHighlight();//первый раз присвоить активный класс кружку
        inputsPlaceholder();
    }

    if (checkbox) {// если найден блок с чекбоксом
        checkbox.addEventListener('click', function () {
            let checkboxBody = checkbox.querySelector('input');// внутри блока найти инпут
            if (checkboxBody.checked) {//если чекд убираю аттрибут дисейблед, в противном случае присваиваю (по умолчаию офф)
                submitButton.removeAttribute('disabled');
            } else {
                submitButton.setAttribute('disabled', true);
            }
        });
    }

    if (form) {
        form.addEventListener('submit', formSend); //при отправке вызвать функцию
    }
    // async function formSend(e) {
    //     e.preventDefault();
    //
    //     let formData = new FormData(form);// создать новую форму
    //     let response = await fetch('sendmail.php', {
    //         method: 'POST',
    //         body: formData
    //     });
    //
    //     if (response.ok) { // статус 200-299
    //         let result = await response.json();
    //         form.classList.add('hide');//прячу форму
    //         submitMessage.classList.add('show');//вывожу сообщение об отправке
    //     }
    // }
    //

    function formSend(e) {
        e.preventDefault();
        form.classList.add('hide');//прячу форму
        submitMessage.classList.add('show');//вывожу сообщение об отправке
    }


    //если найден класс слайдера, инициализирую слайдер
    if (clientsSlider) {
        const swiper = new Swiper(clientsSlider, {
            //скорость прокрутки
            speed: 800,
            // loop: true,
            // стрелочки
            navigation: {
                nextEl: '.clients__arrow-next',
                prevEl: '.clients__arrow-prev',
            },
            slidesPerView: 3,
            // при <992 отступ справа 15
            spaceBetween: 15,
            scrollbar: {
                //скроллбар
                el: '.clients__slider-scrollbar',
                // можно ли перетягивать
                draggable: true,
                // ширина ползунка
                dragSize: 10,
            },
            breakpoints: {
                992: {
                    slidesPerView: 4,
                    //отступ справа 60 при >992
                    spaceBetween: 60,
                },
                1452: {
                    //отступ справа 134 при >1452
                    spaceBetween: 134,
                    slidesPerView: 4,
                }
            },
        });
    }
};

burger('.header__burger', '.menu-header');

function burger(iconClass, menuClass) {
    const iconMenu = document.querySelector(iconClass);//иконка бургера
    const menuBody = document.querySelector(menuClass);//само меню
    if (iconMenu && menuBody) {//только если оба существуют
        iconMenu.addEventListener('click', function (e) {//клик на бургер
            iconMenu.classList.toggle('active');//делаю крестик и в обратном порядке
            menuBody.classList.toggle('active');//показываю меню и в обратном порядке
            document.body.classList.toggle('lock');//убираю скролл в меню
        });
    }
}

//навигация слеваснизу
function menuHighlight() {
    const sections = document.querySelectorAll('section');//выбираю все секции
    const menuLinks = document.querySelectorAll('.nav-header__link');//выбираю все кружочки внутри навигации слева внизу

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;//смещение от верха(мейн) для каждой секции
        if (pageYOffset + (window.innerHeight / 2) >= sectionTop) {//насколько прокручен документ + (текущая высота окна внутреннего деленного на 2); в общем, если прокрученно до секции
            current = section.getAttribute('id'); //взять айдишник текущей секции
        }
    });

    menuLinks.forEach(menuLink => {
        menuLink.classList.remove('active');//убираю у всех кружков
        if (menuLink.dataset.goto.slice(1) == current) {//игнорировать первый символ(точку), если класс совпадает с полученным при прокрутке добавить класс
            menuLink.classList.add('active');//добавить класс
        }
    });
}

//плейсхолдеры
function inputsPlaceholder() {
    //cобираю все инпуты в массив
    const inputs = document.querySelectorAll('.input');
    const textareas = document.querySelectorAll('textarea');
    //если есть инпуты
    if (inputs) {
        //проходим по всем инпутам
        inputs.forEach(input => {
            //берем плейсхолдер из аттрибута data-placeholder и подставляем в аттрибут placeholder
            input.setAttribute('placeholder', input.dataset.placeholder);
            //при фокусе устанавливаю пустой плейсхолдер
            input.addEventListener('focus', function () {
                input.setAttribute('placeholder', '');
            });
            //при расфокусирвоке устанавливаем плейсхолдер обратно
            input.addEventListener('blur', function () {
                input.setAttribute('placeholder', input.dataset.placeholder);
            });
        });
    }
    //если есть текст области
    if (textareas) {
        textareas.forEach(input => {
            //берем плейсхолдер из аттрибута data-placeholder и подставляем в аттрибут placeholder
            input.setAttribute('placeholder', input.dataset.placeholder);
            //при фокусе устанавливаем пустой плейсхолдер
            input.addEventListener('focus', function () {
                input.setAttribute('placeholder', '');
            });
            //при расфокусирвоке устанавливаем плейсхолдер обратно
            input.addEventListener('blur', function () {
                input.setAttribute('placeholder', input.dataset.placeholder);
            });
        });
    }
}

//плавный преход
smoothScroll('.header__burger', '.menu-header');

function smoothScroll(burgerClass, menuClass) {
    //находим все ссылки с атт data-goto, помещаем их в список gotoLinks
    const gotoLinks = document.querySelectorAll('a[data-goto]');
    //проверяюю на наличие
    if (gotoLinks.length > 0) {
        //вешаю на каждый элемент списка слушатель по клику, при клике запускаю функцию
        gotoLinks.forEach(gotoLink => {
            gotoLink.addEventListener('click', ongotoLinkClick);
        });

        //функция скролла
        function ongotoLinkClick(e) {
            //чекаем объект по которому кликнули на наличие атт data-goto и записываем его в gotoLink
            const gotoLink = checkTarget(e.target);

            //проверяю не пустой ли атт и есть ли элементы, которые подходят по описанию из атт
            if (gotoLink.dataset.goto && document.querySelector(gotoLink.dataset.goto)) {
                //записываю в переменную блок, до которого надо проскролить
                const gotoBlock = document.querySelector(gotoLink.dataset.goto);
                //высчитываю верхней точки блока
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

                const headerBurger = document.querySelector(burgerClass);
                const menuBody = document.querySelector(menuClass);

                //убира активные классы, если при клике открыто меню
                if (headerBurger.classList.contains('active')) {
                    headerBurger.classList.remove('active');
                    menuBody.classList.remove('active');
                    document.body.classList.remove('lock');
                }

                //запускаем скролл до блока
                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: 'smooth'
                });
                //убираем обычное поведение ссылки
                e.preventDefault();
            }
        }

        //принимает на вход объект по которому кликнули
        function checkTarget(target) {
            //проверяю есть ли у объекта атт data-goto
            if (target.dataset.goto) {
                //возвращаю объект, если есть атт
                return target;
            } else {
                //возвращает ближайщую ссылку-родителя, если нет атт
                return target.closest('a');
            }
        }
    }
}
