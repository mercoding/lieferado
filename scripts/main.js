import { get, setBasketData, removeFromBasket, removeAllFromBasket } from "./content.js";
import { getBasketSubtotal, getBasketTotal, getMinimumValueDescription, inputBasketOrderNote, setBasketOrderNoteRow, setBasketOrderRow } from './html/basket.js';
import { getLanguage } from "./language.js";
import { basketOpen, closeOverlay, openOverlay } from "./overlay.js";


function checkSBPanel() {
    if (get.delivery) document.querySelectorAll('.switchpanelSBbutton').forEach((element) => { element.style.setProperty('grid-column', '1'); });
    else document.querySelectorAll('.switchpanelSBbutton').forEach((element) => { element.style.setProperty('grid-column', '2'); });
}


export function switchSBpanel(direction) {
    if (direction == 'left') get.delivery = true;
    else if (direction == 'right') get.delivery = false;
    localStorage.setItem('basket', JSON.stringify(get));
    refreshBasket(get);
}


function addAmount(i) {
    addToBasket(get.basket[i].list, get.basket[i].index);
}


function minusAmount(i) {
    removeFromBasket(get.basket[i].list, get.basket[i].index, i);
}


function getBasketOrderFirstAmount(i, j) {
    let basketOrderFirstAmount = document.querySelectorAll(`.basketOrderFirstAmount${i}`);
    basketOrderFirstAmount.forEach((element) => {
        element.style.setProperty('grid-area', `${j + 1} / 1`);
        element.innerHTML = get.basket[i].amount;
    });
}

function getBasketOrderMeal(i, j) {
    let basketOrderMeal = document.querySelectorAll(`.basketOrderMeal${i}`);
    basketOrderMeal.forEach((element) => {
        element.style.setProperty('grid-area', `${j + 1} / 2 / auto / 4`); element.innerHTML = get.basket[i].name;
    });
}

function getBasketOrderPrize(i, j) {
    let basketOrderPrize = document.querySelectorAll(`.basketOrderPrize${i}`);
    basketOrderPrize.forEach((element) => {
        element.style.setProperty('grid-area', `${j + 1} / 6`);
        element.style.setProperty('grid-column', `5 / 8`);
        element.innerHTML = (parseFloat(get.basket[i].prize).toFixed(2)).replace('.', ',') + " €";
    });
}


function getBasketOrderSecondAmount(i, j) {
    let basketOrderSecondAmount = document.querySelectorAll(`.basketOrderSecondAmount${i}`);
    basketOrderSecondAmount.forEach((element) => {
        element.innerHTML = get.basket[i].amount;
        element.style.setProperty('display', `flex`);
        element.style.setProperty('height', `100%`);
        element.style.setProperty('align-items', `center`);
    });
}


function pushBasketOrderToGrid(i, j) {
    getBasketOrderFirstAmount(i, j);
    getBasketOrderMeal(i, j);
    getBasketOrderPrize(i, j);
    getBasketOrderSecondAmount(i, j);
}


function pushBasketOrderNoteToGrid(i, j) {
    document.querySelectorAll('.basketOrderNote' + i).forEach((element) => { element.style.setProperty('grid-area', `${j + 2} / 2 / auto / 3`); });
    document.querySelectorAll('.basketOrderMinusButton' + i).forEach((element) => { element.style.setProperty('grid-area', `${j + 2} / 4`); });
    document.querySelectorAll('.basketOrderSecondAmount' + i).forEach((element) => { element.style.setProperty('grid-area', `${j + 2} / 5`); });
    document.querySelectorAll('.basketOrderSecondAmount' + i + ' .basketOrderSecondAmountContainer').forEach((element) => { element.innerHTML = get.basket[i].amount; });
    document.querySelectorAll('.basketOrderPlusButton' + i).forEach((element) => { element.style.setProperty('grid-area', `${j + 2} / 6`); });
    document.querySelectorAll('.basketOrderNoteInput' + i).forEach((element) => { element.innerHTML = get.basket[i].note; });
    document.querySelectorAll('.basketOrderNoteInput' + i).forEach((element) => { element.style.setProperty('grid-area', `${j + 3} / 2 / auto / 3`); });
    document.querySelectorAll('.basketOrderNoteChange' + i).forEach((element) => { element.style.setProperty('grid-area', `${j + 4} / 2 / auto / 3`); });
}


function getNoteChangeRow(i, j) {
    let input = document.querySelectorAll('.inputBasketOrderNoteField' + i);
    input.forEach((element) => { element.innerHTML = ''; });
    let basketOrderNote = document.querySelectorAll('.basketOrderNote' + i);
    basketOrderNote.forEach((element) => { element.innerHTML = ''; });
    let get = JSON.parse(localStorage.getItem('basket'));
    let basketOrderNoteInput = document.querySelectorAll('.basketOrderNoteInput' + i);
    basketOrderNoteInput.forEach((element) => {
        if (get.basket[i].note != '') {
            element.innerHTML = get.basket[i].note;
            element.style.setProperty('grid-area', `${j + 3} / 2 / auto / 3`);
        }
        else {
            element.innerHTML = "";
            element.style.setProperty('grid-area', `${j + 3} / 2 / auto / 3`);
        }
    });

    let lang = getLanguage();
    let basketOrderNoteChange = document.querySelectorAll('.basketOrderNoteChange' + i);
    basketOrderNoteChange.forEach((element) => {
        if (get.basket[i].note != '') {
            element.innerHTML = /*html*/ `<div class="basketOrderNoteChange${i}" onclick="changeBasketOrderNote(${i}, ${j})">${(lang == "german") ? 'Anmerkung bearbeiten' : 'Edit note'}</div>`;
            element.style.setProperty('grid-area', `${j + 4} / 2 / auto / 3`);
        }
        else if (get.basket[i].note == '') {
            element.innerHTML = /*html*/ `<div class="basketOrderNoteChange${i}"></div>`;
            element.style.setProperty('grid-area', `${j + 4} / 2 / auto / 3`);
        }
    });
}


function changeBasketOrderNote(i, j) {
    document.querySelectorAll('.basketOrderNoteChange' + i).forEach((element) => { element.innerHTML = ''; });
    addBasketOrderNote(i, j);
}


export function addNote(i, j) {
    let get = JSON.parse(localStorage.getItem('basket'));
    let input = document.querySelectorAll('#inputBasketOrderNoteField' + i);
    input.forEach((element) => { get.basket[i].note = element.value; });
    localStorage.setItem('basket', JSON.stringify(get));
    getNoteChangeRow(i, j);
    refreshBasket();
}


export function cancelNote(i, j) {
    let lang = getLanguage();
    let get = JSON.parse(localStorage.getItem('basket'));
    document.querySelectorAll('.inputBasketOrderNoteField' + i).forEach((element) => { element.innerHTML = ''; });
    if (get.basket[i].note == '') document.querySelectorAll('.basketOrderNote' + i).forEach((element) => { element.innerHTML = (lang == "german") ? 'Anmerkung hinzufügen' : 'Add note'; });
    else if (get.basket[i].note != '') document.querySelectorAll('.basketOrderNoteChange' + i).forEach((element) => { element.innerHTML = (lang == "german") ? 'Anmerkung bearbeiten' : 'Edit note'; });
    getNoteChangeRow(i, j);
    refreshBasket();
}


export function addBasketOrderNote(i, j) {
    let get = JSON.parse(localStorage.getItem('basket'));
    let input = document.querySelectorAll('.basketOrderNoteInput' + i);
    let basketNoteInput = document.querySelectorAll('.basketOrderNote' + i);
    basketNoteInput.forEach((element) => { element.innerHTML = ''; });
    input.forEach((element) => {
        element.innerHTML = inputBasketOrderNote(i, j);
        element.style.setProperty('grid-area', `${j + 3} / 2 / auto / 3`);
    });
    let basket = document.querySelectorAll('.shoppingbasketordersection');
    basket.forEach((element) => { element.style.setProperty('grid-template-rows', `repeat(2, 40px)`); });
    let inputBasketOrderNoteField = document.querySelectorAll('#inputBasketOrderNoteField' + i);
    inputBasketOrderNoteField.forEach((element) => { element.value = get.basket[i].note; });
}


function addBasketOrder(i, j) {
    let basket = document.querySelectorAll('.shoppingbasketordersection');
    basket.forEach((element) => {
        setBasketStyle(element);
        element.innerHTML += setBasketOrderRow(i);
        pushBasketOrderToGrid(i, j);
        if (!element.querySelector('.basketOrderNote' + i)) {
            element.innerHTML += setBasketOrderNoteRow(i, j);
            pushBasketOrderNoteToGrid(i, j);
            if (get.basket[i].note != '') getNoteChangeRow(i, j);
        }
    });
}


function setBasketStyle(basket) {
    basket.style.setProperty('display', 'grid');
    basket.style.setProperty('grid-template-columns', '32px 1fr 80px 32px 32px 32px 32px');
    basket.style.setProperty('grid-template-rows', `repeat(${get.basket.length * 4}, 40px)`);
    basket.style.setProperty('overflow-x', 'hiden');
    basket.style.setProperty('overflow-y', 'auto');
    basket.style.setProperty('height', `100%`);
}


function addMinimumValueDescription() {
    let lang = getLanguage();
    let minimum = document.querySelectorAll('.shoppingbasketminimumvalue');
    let sum = calculateOrderPrize();
    minimum.forEach((element) => {
        element.innerHTML = getMinimumValueDescription();
        if (sum < 40 && get.delivery) {
            element.querySelector('.basketminimumvalueheadline').innerHTML = (lang == "german") ? 'Benötigter Betrag, um den Mindestbestellwert zu erreichen' : 'Amount required to reach the minimum order value';
            element.querySelector('.basketminimumvalue').innerHTML = (parseFloat(40 - sum).toFixed(2)).replace('.', ',') + " €";
        }
    });
}


function calculateOrderPrize() {
    let sum = 0
    for (let i = 0; i < get.basket.length; i++) sum += get.basket[i].prize;
    return sum;
}


function addBasketSubtotal() {
    let lang = getLanguage();
    let subtotal = document.querySelectorAll('.shoppingbasketsubtotal');
    subtotal.forEach((element) => { element.innerHTML = getBasketSubtotal(); });
    let basketsubtotalheadline = document.querySelectorAll('.basketsubtotalheadline');
    basketsubtotalheadline.forEach((element) => { element.innerHTML = (lang == "german") ? 'Zwischensumme' : 'Subtotal'; });
    let basketsubtotal = document.querySelectorAll('.basketsubtotal');
    basketsubtotal.forEach((element) => { element.innerHTML = (parseFloat(calculateOrderPrize(get)).toFixed(2)).replace('.', ',') + " €"; });
}


function addBasketTotal() {
    let lang = getLanguage();
    let shoppingbaskettotal = document.querySelectorAll('.shoppingbaskettotal');
    shoppingbaskettotal.forEach((element) => { element.innerHTML = getBasketTotal(); });
    let baskettotalheadline = document.querySelectorAll('.baskettotalheadline');
    baskettotalheadline.forEach((element) => { element.innerHTML = (lang == "german") ? 'Summe' : 'Total'; });
    let totalprize = (get.delivery) ? 5 : 0;
    let baskettotal = document.querySelectorAll('.baskettotal');
    baskettotal.forEach((element) => { element.innerHTML = (parseFloat(calculateOrderPrize(get) + totalprize).toFixed(2)).replace('.', ',') + " €"; });
}


export function clearOrderRow(i) {
    document.querySelector('.basketOrderFirstAmount' + i).innerHTML = '';
    document.querySelector('.basketOrderMeal' + i).innerHTML = '';
    document.querySelector('.basketOrderPrize' + i).innerHTML = '';
    document.querySelector('.basketOrderSecondAmount' + i + ' .basketOrderSecondAmountContainer').innerHTML = '';
    document.querySelector('.basketOrderNoteInput' + i).innerHTML = '';
    document.querySelector('.basketOrderNote' + i).innerHTML = '';
    document.querySelector('.basketOrderNoteInput' + i).innerHTML = '';
    document.querySelector('.basketOrderNote' + i).innerHTML = ' ';
    if (document.querySelector('.basketOrderNoteChange' + i))
        document.querySelector('.basketOrderNoteChange' + i).innerHTML = '';
    document.querySelector('.basketOrderMinusButton' + i).innerHTML = '';
    document.querySelector('.basketOrderPlusButton' + i).innerHTML = '';
}


function pay() {
    let sum = calculateOrderPrize();
    if (sum > 40 && get.delivery) {
        localStorage.removeItem('basket');
        removeAllFromBasket();
        if (window.innerWidth < 1029) closeOverlay();
    }
    else if (!get.delivery) {
        localStorage.removeItem('basket');
        removeAllFromBasket();
        if (window.innerWidth < 1029) closeOverlay();
    }
}


function getPayButton() {
    let lang = getLanguage();
    let totalprize = (get.delivery) ? 5 : 0;
    return /*html*/`
        <div class="paybutton" onclick="pay()">${(lang == "german") ? 'Bezahlen' : 'Pay'} (${(parseFloat(calculateOrderPrize(get) + totalprize).toFixed(2)).replace('.', ',') + " €"})</div> 
    `;
}


function setPayButtonColor() {
    let paybutton = document.querySelectorAll('.paybutton');
    if (!get.delivery || calculateOrderPrize() >= 40) {
        paybutton.forEach((element) => {
            element.style.setProperty('color', 'white');
            element.style.setProperty('background-color', '#F15D00');
        });
    }
    else {
        paybutton.forEach((element) => {
            element.style.setProperty('color', '#9C999B');
            element.style.setProperty('background-color', '#F0F1F1');
        });
    }
}


function addPayButton() {
    if (get.basket.length < 1 || !localStorage.getItem('basket')) {
        emptyBasket();
        return;
    }
    setBasketData(JSON.parse(localStorage.getItem('basket')));
    let paybutton = document.querySelectorAll('.shoppingbasketpaybutton');
    paybutton.forEach((element) => { element.innerHTML = getPayButton(); });
    setPayButtonColor();
}


function emptyBasket() {
    document.querySelectorAll('.shoppingbasketordersection').forEach((element) => { element.innerHTML = '' });
    document.querySelectorAll('.shoppingbasketminimumvalue').forEach((element) => { element.innerHTML = '' });
    document.querySelectorAll('.shoppingbasketsubtotal').forEach((element) => { element.innerHTML = '' });
    document.querySelectorAll('.shoppingbaskettotal').forEach((element) => { element.innerHTML = '' });
    document.querySelectorAll('.shoppingbasketpaybutton').forEach((element) => { element.innerHTML = '' });
}


function addBigBasket() {
    let i = 0;
    for (let j = 0; j < get.basket.length * 4; j += 4) {
        addBasketOrder(i, j);

        i++;
    }
    addMinimumValueDescription();
    addBasketSubtotal();
    addBasketTotal();
    checkSBPanel();
    addPayButton();
}


function getSmallBasket() {
    let totalprize = (get.delivery) ? 5 : 0;
    let lang = getLanguage();
    return /*html*/`
        <div class="basketbutton" onclick="openOverlay('basket')">${(lang == 'german') ? 'Warenkorb' : 'Shopping Cart'} (${(parseFloat(calculateOrderPrize(get) + totalprize).toFixed(2)).replace('.', ',') + " €"})</div>  
    `;
}


function addSmallBasket() {
    let bottom = document.querySelector('.bottomcontainer');
    bottom.innerHTML = getSmallBasket();
}


function setDatasetBasket() {
    if (get.basket.length > 0) {
        document.querySelector('.layout').dataset.basket = 1;
        document.querySelector('.bottom').dataset.basket = 1;
    }
    else {
        document.querySelector('.layout').dataset.basket = 0;
        document.querySelector('.bottom').dataset.basket = 0;
    }
}


export function refreshBasket() {
    if (!JSON.parse(localStorage.getItem('basket'))) return;
    setBasketData(JSON.parse(localStorage.getItem('basket')));
    setDatasetBasket();
    emptyBasket();
    addBigBasket();
    addSmallBasket();
}


function scrollToDiv(element) {
    window.scroll(0, findTopPosition(document.getElementById(element)));
}


export function findTopPosition(obj) {
    var currenttop = 0;
    if (obj.offsetParent) {
        do {
            currenttop += obj.offsetTop;
        } while ((obj = obj.offsetParent));
        return [currenttop];
    }
}


export function findLeftPosition(obj) {
    var currentLeft = 0;
    if (obj.offsetParent) {
        do {
            currentLeft += obj.offsetLeft - 40;
        } while ((obj = obj.offsetParent));
        return [currentLeft];
    }
}

function checkScreenSize() {
    if(basketOpen && window.innerWidth > 1028) closeOverlay();
}


window.pay = pay;
window.changeBasketOrderNote = changeBasketOrderNote;
window.addNote = addNote;
window.cancelNote = cancelNote;
window.switchSBpanel = switchSBpanel;
window.addBasketOrderNote = addBasketOrderNote;
window.addAmount = addAmount;
window.minusAmount = minusAmount;
window.clearOrderRow = clearOrderRow;
window.scrollToDiv = scrollToDiv;
window.onresize = checkScreenSize;