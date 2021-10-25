function burger(iconClass, menuClass) {
    const iconMenu = document.querySelector(`${iconClass}`);
    const menuBody = document.querySelector(`${menuClass}`);
    if (iconMenu && menuBody){
        iconMenu.addEventListener('click', function(e) {
            iconMenu.classList.toggle('active');
            menuBody.classList.toggle('active');
            document.body.classList.toggle('lock');
        });
    }
}

function menuHighlight() {
    const sections = document.querySelectorAll('section');
    const menuLinks = document.querySelectorAll('.nav-header__link');

    let current = '';
    sections.forEach( section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if(pageYOffset + (window.innerHeight / 2) >= sectionTop){
            current = section.getAttribute('id');
        }
    });

    menuLinks.forEach(menuLink => {
        menuLink.classList.remove('active');
        if(menuLink.dataset.goto.slice(1) == current){
            menuLink.classList.add('active');
        }
    });
}

function inputsPlaceholder() {
    //Собираем все инпуты в массив
    const inputs = document.querySelectorAll('.input');
    const textareas = document.querySelectorAll('textarea');
    //если есть инпуты
    if(inputs) {
        //проходим по всем инпутам
        inputs.forEach(input => {
            //берем плейсхолдер из аттрибута data-placeholder и подставляем в аттрибут placeholder
            input.setAttribute('placeholder', input.dataset.placeholder);
            //при фокусе устанавливаем пустой плейсхолдер
            input.addEventListener('focus', function() {
                input.setAttribute('placeholder', '')
            })
            //при блюре устанавливаем плейсхолдер обратно
            input.addEventListener('blur', function() {
                input.setAttribute('placeholder', input.dataset.placeholder)
            })
        });
    }
    if(textareas) {
        textareas.forEach(input => {
            //берем плейсхолдер из аттрибута data-placeholder и подставляем в аттрибут placeholder
            input.setAttribute('placeholder', input.dataset.placeholder);
            //при фокусе устанавливаем пустой плейсхолдер
            input.addEventListener('focus', function() {
                input.setAttribute('placeholder', '')
            })
            //при блюре устанавливаем плейсхолдер обратно
            input.addEventListener('blur', function() {
                input.setAttribute('placeholder', input.dataset.placeholder)
            })
        });
    }
}

function smoothScroll(burgerClass, menuClass) {
    //Smoth scroll
    //находим все ссылки с атт data-goto, помещаем их в список gotoLinks
    const gotoLinks = document.querySelectorAll('a[data-goto]');
    //проверяем на наличие
    if (gotoLinks.length > 0) {
        //вешаем на каждый элемент списка слушатель по клику, при клике запускаю функцию
        gotoLinks.forEach(gotoLink => {
            gotoLink.addEventListener('click', ongotoLinkClick);
        });

        //функция скролла
        function ongotoLinkClick(e) {
            //чекаем объект по которому кликнули на наличие атт data-goto и записываем его в gotoLink
            const gotoLink = checkTarget(e.target);

            //проверяем не пустой ли атт и есть ли элементы, которые подходят по описанию из атт
            if(gotoLink.dataset.goto && document.querySelector(gotoLink.dataset.goto)) {
                //записываем в переменную блок, до которого надо проскролить
                const gotoBlock = document.querySelector(gotoLink.dataset.goto);
                //высчитываем верхней точки блока - высота шапки
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

                const headerBurger = document.querySelector(`${burgerClass}`);
                const menuBody = document.querySelector(`${menuClass}`);

                //убираем активные классы, если при клике открыто меню
                if (headerBurger.classList.contains('active')){
                    headerBurger.classList.remove('active');
                    menuBody.classList.remove('active');
                    document.body.classList.remove('lock');
                }

                //запускаем скролл до блока
                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: "smooth"
                });
                //убираем обычное поведение ссылки
                e.preventDefault();
            }
        }

        //принимает на вход объект по которому кликнули
        function checkTarget(target) {
            //проверяет есть ли у объекта атт data-goto
            if(target.dataset.goto){
                //возвращает объект, если есть атт
                return target;
            }else {
                //возвращает ближайщую ссылку-родителя, если нет атт
                return target.closest('a');
            }
        }
    }
}
