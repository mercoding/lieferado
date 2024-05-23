import '../language.js';
import { getLanguage } from '../language.js';


export function getShoppingBasketButtons() {
    let lang = getLanguage();
    return /*html*/`
        <div class="leftSBbutton" onclick="switchSBpanel('left')">
            <div class="leftSBbuttongrid">
                <div class="leftSBdelivery">${(lang == "german") ? 'Lieferung' : 'Delivery' }</div>
                <div class="leftSBoperatingtime">${(lang == "german") ? 'ab' : 'at' } 11:45</div>
            </div>
        </div>
        <div class="switchpanelSBbutton"></div> 
        <div class="rightSBbutton" onclick="switchSBpanel('right')">
            <div class="rightSBbuttongrid">
                <div class="rightSBpickup">${(lang == "german") ? 'Abholung' : 'Pick up' }</div>
                <div class="rightSBoperatingtime">${(lang == "german") ? 'ab' : 'at' } 11:45</div>
            </div>
        </div>    
    `;
}


export function setBasketOrderRow(i) {
    return /*html*/`
        <div class="basketOrderFirstAmount${i}"></div> 
        <div class="basketOrderMeal${i}"></div>
        <div class="basketOrderPrize${i}"></div> 
    `;
}


export function setBasketOrderNoteRow(i, j) {
    let lang = getLanguage();
    return /*html*/`
        <div id="basketOrderNote" class="basketOrderNote${i}" onclick="addBasketOrderNote(${i}, ${j})">${(lang == "german") ? 'Anmerkung hinzufügen' : 'Add note' }</div> 
        <div class="basketOrderMinusButton${i}"><div class="basketOrderAmountButtonContainer"><div onclick="minusAmount(${i}, ${j})" class="basketOrderAmountButton">-</div></div></div>
        <div class="basketOrderSecondAmount${i}"><div class="basketOrderSecondAmountContainer"></div></div>
        <div class="basketOrderPlusButton${i}"><div class="basketOrderAmountButtonContainer"><div onclick="addAmount(${i})" class="basketOrderAmountButton">+</div></div></div>
        <div class="basketOrderNoteInput${i}"></div>
        <div class="basketOrderNoteChange${i}"></div> 
    `;
}


export function getShoppingBasket() {
    let lang = getLanguage();
    return /*html*/`
        <div id="shoppingbasket" class="shoppingbasket">
            <div id="shoppingbasketcontainer" class="shoppingbasketcontainer">
                <div class="shoppingbasketheadline">
                    <h1>${(lang == "german") ? 'Warenkorb' : 'Shopping cart' }</h1>
                </div>
                <div class="shoppingbasketbuttons">${getShoppingBasketButtons()}</div>
                <div class="shoppingbasketordersection"></div>
                <div class="shoppingbasketminimumvalue"></div>
                <div class="shoppingbasketsubtotal"></div> 
                <div class="shoppingbaskettotal"></div>   
                <div class="shoppingbasketpaybutton"></div>   
            </div>
        </div>    
    `;
}


export function getMinimumValueDescription() {
    return /*html*/`
        <div class="basketminimumvaluecontainer">
            <div class="basketminimumvalueheadline"></div>
            <div class="basketminimumvalue"></div>
        </div>   
    `;
}


export function inputBasketOrderNote(i, j) {
    let lang = getLanguage();
    return /*html*/`
        <div class="inputBasketOrderNoteField${i}">
            <textarea class="inputBasketField" id="inputBasketOrderNoteField${i}"></textarea>
            <button onclick="cancelNote(${i}, ${j})">${(lang == "german") ? 'Abrechen' : 'Cancel' }</button>
            <button onclick="addNote(${i}, ${j})">${(lang == "german") ? 'Hinzufügen' : 'Add' }</button>
        </div>  
    `;
}


export function getBasketSubtotal() {
    return /*html*/`
        <div class="basketsubtotalcontainer">
            <div class="basketsubtotalheadline"></div>
            <div class="basketsubtotal"></div>
        </div>   
    `;
}


export function getBasketTotal() {
    return /*html*/`
        <div class="baskettotalcontainer">
            <div class="baskettotalheadline"></div>
            <div class="baskettotal"></div>
        </div>   
    `;
}