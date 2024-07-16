import * as layouts from './layouts.js';
import * as language from './language.js';
import './hamburger.js';
import './main.js';
import { getHeaderContent } from './html/header.js';
import { findTopPosition, findLeftPosition, refreshBasket } from './main.js';
import { getFooterContent } from './html/footer.js';
import { getDropdown } from './html/dropdown.js';
import { getTopContent } from './html/top.js';
import { getNavigationBar } from './html/navigationbar.js';
import { getCenterContent } from './html/center.js';
import { getShoppingBasket } from './html/basket.js';

const sections = ['header', 'aside', 'main', 'footer'];
export let currentLayout, data = loadJSON('./data/data.json'), get = loadJSON('./data/basket.json'), startY, startX, scrollLeft, scrollTop, isDown, container;


export async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        document.file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(document.file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


export function template(id, name) {
    var contentId = document.getElementById(id);
    contentId.removeAttribute("w3-include-html");
    contentId.setAttribute("w3-include-html", name);
}


function set(content) {
    for (let i = 0; i < sections.length; i++) {
        for (let j = 0; j < content.length; j++) {
            if (content[j].id != sections[i]) template(content[j].id, './templates/empty.html');
            template(content[j].id, content[j].url);
        }
    }
}


function hideContent(query) {
    document.querySelector(query).classList.add('d-none');
}


export function content() {
    currentLayout = layouts.getLayout();
    set(currentLayout);

    includeHTML().then(res => {
        // Do something else after loaded layout
        document.getElementById('headercontainer').innerHTML = getHeaderContent();
        document.getElementById('dropdowncontainer').innerHTML = getDropdown();
        document.getElementById('topcontainer').innerHTML = getTopContent();
        document.getElementById('navcontainer').innerHTML = getNavigationBar();
        if (document.getElementById('centercontainer')) {
            document.getElementById('centercontainer').innerHTML = getCenterContent();
            document.getElementById('right').classList.remove('d-none');
        }
        if (document.getElementById('rightcontainer')) document.getElementById('rightcontainer').innerHTML = getShoppingBasket();
        else document.getElementById('right').classList.add('d-none');

        refreshBasket();
        document.getElementById('footercontainer').innerHTML = getFooterContent();
        language.getLanguage();
        language.checkLanguage();
        addNavigationListener();
    }).catch(err => console.log(err));
}


// Load JSON file -> Martin
function loadJSON(file) {
    var xhReq = new XMLHttpRequest();
    xhReq.open("GET", file, false);
    xhReq.send(null);
    return JSON.parse(xhReq.responseText);
}


//Experimental -> never used
function checkCenterPosition() {
    if(window.scrollY >= findTopPosition(document.getElementById('antipasti'))) document.querySelector('.navbar').scroll(findLeftPosition(document.getElementById('navantipasti')), 0);
    if(window.scrollY >= findTopPosition(document.getElementById('salad'))) document.querySelector('.navbar').scroll(findLeftPosition(document.getElementById('navsalad')), 0);
    if(window.scrollY >= findTopPosition(document.getElementById('pizza'))) document.querySelector('.navbar').scroll(findLeftPosition(document.getElementById('navpizza')), 0);
    if(window.scrollY >= findTopPosition(document.getElementById('familypizza'))) document.querySelector('.navbar').scroll(findLeftPosition(document.getElementById('navfamilypizza')), 0);
    if(window.scrollY >= findTopPosition(document.getElementById('pizzabread'))) document.querySelector('.navbar').scroll(findLeftPosition(document.getElementById('navpizzabread')), 0);
    if(window.scrollY >= findTopPosition(document.getElementById('pastaclassica'))) document.querySelector('.navbar').scroll(findLeftPosition(document.getElementById('navpastaclassica')), 0);
    if(window.scrollY >= findTopPosition(document.getElementById('pastaalforno'))) document.querySelector('.navbar').scroll(findLeftPosition(document.getElementById('navpastaalforno')), 0);
    if(window.scrollY >= findTopPosition(document.getElementById('schnitzel'))) document.querySelector('.navbar').scroll(findLeftPosition(document.getElementById('navschnitzel')), 0);
    if(window.scrollY >= findTopPosition(document.getElementById('supplements'))) document.querySelector('.navbar').scroll(findLeftPosition(document.getElementById('navsupplements')), 0);
    if(window.scrollY >= findTopPosition(document.getElementById('desserts'))) document.querySelector('.navbar').scroll(findLeftPosition(document.getElementById('navdesserts')), 0);
    if(window.scrollY >= findTopPosition(document.getElementById('softdrinks'))) document.querySelector('.navbar').scroll(findLeftPosition(document.getElementById('navsoftdrinks')), 0);
    if(window.scrollY >= findTopPosition(document.getElementById('drinks'))) document.querySelector('.navbar').scroll(findLeftPosition(document.getElementById('navdrinks')), 0);
}


const storeScroll = () => {
    if (window.scrollY > 372)
        document.documentElement.dataset.scroll = 32;
    else if (window.scrollY < 373)
        document.documentElement.dataset.scroll = 0;
    if (window.scrollY > 372) {
        if (document.getElementById('navcontainer')) {
            document.getElementById('navcontainer').classList.add('fixednav');
        }
    }
    else if (window.scrollY < 301) {
        if (document.getElementById('navcontainer')) {
            document.getElementById('navcontainer').classList.remove('fixednav');
        }
    }
}


function checkBasket(name) {
    if (JSON.parse(localStorage.getItem('basket'))) get = JSON.parse(localStorage.getItem('basket'));
    for (let index = 0; index < get.basket.length; index++) if (get.basket[index].name == name) return index;
    return -1;
}


export function removeFromBasket(list, i) {
    let meals = getDataWithKey(list);
    let index = checkBasket(meals[i].name.de);
    if (index > -1) {
        get.basket[index].amount -= 1;
        get.basket[index].prize -= parseFloat(meals[i].prize);
    }
    if (get.basket[index].amount <= 0) {
        clearOrderRow(index);
        get.basket.splice(index, 1);
        document.querySelector('.bottom').dataset.basket = 0;
    }

    localStorage.setItem('basket', JSON.stringify(get));
    get = JSON.parse(localStorage.getItem('basket'));
    refreshBasket();
}


export function removeAllFromBasket() {
    get = loadJSON('./data/basket.json');
    localStorage.setItem('basket', JSON.stringify(get));
    get = JSON.parse(localStorage.getItem('basket'));
    document.querySelector('.layout').dataset.basket = 0;
    document.querySelector('.bottom').dataset.basket = 0;
    refreshBasket();
}



export function addToBasket(list, i) {
    let meals = getDataWithKey(list);
    let index = checkBasket(meals[i].name.de);
    if (index > -1) {
        get.basket[index].amount += 1;
        get.basket[index].prize += parseFloat(meals[i].prize);
    }
    else {
        get.basket.push({ "list": list, "index": i, "name": meals[i].name.de, "amount": 1, "prize": meals[i].prize, "note": "" });

    }
    document.querySelector('.layout').dataset.basket = 1;
    document.querySelector('.bottom').dataset.basket = 1;
    localStorage.setItem('basket', JSON.stringify(get));
    refreshBasket();
}


function getDataWithKey(list) {
    let keys = Object.keys(data);
    let index = 0;
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == list) return data[keys[i]];
        index++;
    }
    return "";
}


export function setBasketData(data) {
    get = data;
}


// Listen for new scroll events, here we debounce our `storeScroll` function
document.addEventListener('scroll', storeScroll), { passive: true };


function addNavigationListener() {
    container = document.querySelector('.navbar');
    container.addEventListener('mousedown', e => mouseIsDown(e));
    container.addEventListener('mouseup', e => mouseUp(e))
    container.addEventListener('mouseleave', e => mouseLeave(e));
    container.addEventListener('mousemove', e => mouseMove(e));
}


function mouseIsDown(e) {
    isDown = true;
    startY = e.pageY - container.offsetTop;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    scrollTop = container.scrollTop;
}


function mouseUp(e) {
    isDown = false;
}


function mouseLeave(e) {
    isDown = false;
}


function mouseMove(e) {
    if (isDown) {
        e.preventDefault();
        //Move vertcally
        const y = e.pageY - container.offsetTop;
        const walkY = y - startY;
        container.scrollTop = scrollTop - walkY;

        //Move Horizontally
        const x = e.pageX - container.offsetLeft;
        const walkX = x - startX;
        container.scrollLeft = scrollLeft - walkX;

    }
}


window.content = content;
window.addToBasket = addToBasket;
window.removeFromBasket = removeFromBasket;
