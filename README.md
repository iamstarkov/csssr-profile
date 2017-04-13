# Секретный архив учреждения

[![Greenkeeper badge](https://badges.greenkeeper.io/iamstarkov/csssr-profile.svg)](https://greenkeeper.io/)

## Старт разработки

    git clone https://github.com/matmuchrapna/csssr-profile.git csssr-profile
    cd csssr-profile
    npm i
    gulp

После этого будут установлены все зависимости, в папке `dist` будет лежать собранный проект, а на [http://localhost:4000/](http://localhost:4000/) будет крутиться локальный сервер для собранного сайта.

## Структура проекта

* `blocks` — 14 блоков, используемых на проекте (шаблоны, клиентский js и стили)
* `pages` — страницы проекта
* `dist` — собранный сайт

## Список gulp-тасков

* `gulp tree` — генерирует дерево зависимостей БЭМ-блоков.
* `gulp js` — собирает JS по созданным зависимостям.
* `gulp uglify` - минифицирует JS в папке _dist_.
* `gulp css` — собирает CSS по созданным зависимостям.
* `gulp css-images` — копирует код блоков в папку dist, для возможности хранения картинок блока в самом блоке.
* `gulp html` — собирает HTML по JADE-шаблонам.
* `gulp clean` — удаляет _dist_.
* `gulp build` — собирает HTML, CSS и JS.
* `gulp production` — всё тоже самое, что и `build` только дополнительно минифицируется JS.
* `gulp gh` — публикует содержимое _dist_ GitHub Pages.
* `gulp express` — поднимает локальный сервер, смотрящий в _dist_
* `gulp watch` — поднимает несколько вотчеров на разные виды файлов. Таск для разработки.
* `gulp default` === `gulp watch`
