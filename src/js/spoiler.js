//ищу все возможные контейнеры со спойлерами(датаатрибут)
const spoilersArray = document.querySelectorAll('[data-spoilers]');
//если найдены
if (spoilersArray.length > 0) {
    //получение обычных спойлеров
    const spoilersRegular = Array.from(spoilersArray);//нод коллекция
    // Инициализация обычных спойлеров
    if (spoilersRegular.length > 0) {
        initSpoilers(spoilersRegular);
    }

    //инициализация
    function initSpoilers(spoilersArray) {
        spoilersArray.forEach(spoilersBlock => {
            //найденным блокам присвоить
            // spoilersBlock.classList.add('init'); //что бы было видно что подключилось
            //прячет все спойлерры
            initSpoilerBody(spoilersBlock);
            //слушатель переключалка класса и аним
            spoilersBlock.addEventListener('click', setSpoilerAction);
        });
    }

    //прячет все спойлерры
    function initSpoilerBody(spoilersBlock) {
        //все спойлеры внутри конт
        const spoilerTitles = spoilersBlock.querySelectorAll('[data-spoiler]');
        //если есть спойлеры
        if (spoilerTitles.length > 0) {
            spoilerTitles.forEach(spoilerTitle => {
                //если не содержит класс кнопка то прятать текст
                if (!spoilerTitle.classList.contains('active')) {
                    //спрятать текст
                    spoilerTitle.nextElementSibling.hidden = true;
                }
            });
        }
    }

    //открыть спойлер
    function setSpoilerAction(e) {
        //по которому нажато
        const el = e.target;
        //если нажато на саму кнопку(хэз атт не подходит, так как попадаю на текст)
        if (el.closest('[data-spoiler]')) {
            //кнопка на который нажато
            const spoilerTitle = el.closest('[data-spoiler]');
            //добавить класс или убрать
            spoilerTitle.classList.toggle('active');
            //анимашки и открыть спойлер
            slideToggle(spoilerTitle.nextElementSibling);//текст
            e.preventDefault();
        }
    }
}

let slideToggle = (target, duration = 500) => {
    //если элем по которому нажали спрятан, анимация плавно вниз
    if (target.hidden) {
        return slideDown(target, duration);
    } else {
        return slideUp(target, duration);
    }
};
//закрытие спойлера аним
let slideUp = (target, duration = 500) => {
    //если текст не содержит класса
    if (!target.classList.contains('slide')) {
        target.classList.add('slide'); //что бы не ломалось при многократном клике
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';// высота = высота элемента с отспупаи
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = '0';
        target.style.paddingTop = '0';
        target.style.paddingBottom = '0';
        target.style.marginTop = '0';
        target.style.marginBottom = '0';
        window.setTimeout(() => {
            target.hidden = true;
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('slide');
        }, duration);
    }
};
//открытие спойлера аним
let slideDown = (target, duration = 500) => {
    //если текст не содержит класса
    if (!target.classList.contains('slide')) {
        target.classList.add('slide'); //что бы не ломалось при многократном клике
        //если спрятан то открыть
        if (target.hidden) {
            target.hidden = false;
        }
        let height = target.offsetHeight;//высота блока текста где нажато
        target.style.overflow = 'hidden';
        target.style.height = '0';
        target.style.paddingTop = '0';
        target.style.paddingBottom = '0';
        target.style.marginTop = '0';
        target.style.marginBottom = '0';
        target.offsetHeight;
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('slide');
        }, duration);
    }
};


