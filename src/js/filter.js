const projectList = document.querySelector('.project-page__filters');
//если есть блок
if (projectList) {
    filter('.project-page__filters');
}

function filter(listClass) {
    const projectList = document.querySelector(listClass);//блок фильтров
    const projectListItems = document.querySelectorAll('.project-page__filter');//получаю коллекцию фильтров

    projectList.addEventListener('click', event => {
        const targetId = event.target.dataset.id;
        const target = event.target;
        //если нажали на кнопку фильтра
        if(target.classList.contains('project-page__filter')) {
            projectListItems.forEach( listItem => {
                listItem.classList.remove('active');//убираю везде класс
            });
            target.classList.add('active');//присваиваю по нажатому

            showId(targetId);
        }

        event.preventDefault();
    })
}

function showId(targetId) {
    const projectItems = document.querySelectorAll('.project-page__item');//проекты
    if(targetId) {//если существует
        projectItems.forEach( item => {
            if(!(item.dataset.filter.includes(targetId))){//если совпадение нету
                item.classList.add('hide');
            } else {
                item.classList.remove('hide');
            }
        });
    } else {//если не существует показываю все(выбор всё)
        projectItems.forEach( item => {
            item.classList.remove('hide');
        });
    }
}

