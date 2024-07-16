import { getGermanDataprotection } from './html/german/datenschutz.js';
import { getGemanImprint } from './html/german/impressum.js';
import { getLanguage } from "./language.js";
import { getEnglishImprint } from "./html/english/imprint.js";
import { getEnglishDataprotection } from "./html/english/dataprotection.js";
import { refreshBasket } from './main.js';
import { getHamburgerButtonStatus, hamburgerWasClicked } from './hamburger.js';
export let basketOpen = false;


export function closeOverlay() {
    basketOpen = false;
    document.querySelector('.overlay').classList.add('d-none');
    document.querySelector('.overlay').style.setProperty('display', 'none');
    document.querySelector('html').style.setProperty('overflow', 'auto');
    refreshBasket();
    let isHamburgerActive = getHamburgerButtonStatus();
    if (isHamburgerActive) hamburgerWasClicked();
}


export function getOverlayCloseButton() {
    return /*html*/`
        <div class="closecontainer" onclick="closeOverlay()">
            <div class="closebarone"></div>
            <div class="closebartwo"></div>
        </div>  
    `;
}


export function openOverlay(page) {
    let overlaycontainer = document.querySelector('.overlaycontainer');
    overlaycontainer.innerHTML = '';
    document.querySelector('.overlay').classList.remove('d-none');
    document.querySelector('.overlay').style.setProperty('display', 'flex');
    document.querySelector('.overlay').style.setProperty('justify-content', 'center');
    document.querySelector('.overlay').style.setProperty('align-items', 'center');
    document.querySelector('html').style.setProperty('overflow', 'hidden');
    overlaycontainer.innerHTML += /*html*/`
        <div class="overlaytop"></div>  
        <div class="overlaymain"></div>  
    `;

    switch (page) {
        case "basket": showBasket(); break;
        case "imprint": showImprint(); break;
        case "dataprotection": showDataprotection(); break;
    }
}


function showBasket() {
    basketOpen = true;
    document.querySelector('.overlay').style.setProperty('overflow', 'hidden');
    let overlaycontainer = document.querySelector('.overlaycontainer');
    let basket = document.querySelectorAll('.shoppingbasket');
    overlaycontainer.style.setProperty('display', 'grid');
    overlaycontainer.style.setProperty('overflow', 'hidden');
    overlaycontainer.style.setProperty('grid-template-rows', '64px 1fr');
    document.querySelector('.overlaytop').style.setProperty('grid-row', '1');
    document.querySelector('.overlaytop').style.setProperty('overflow', 'hidden');
    document.querySelector('.overlaymain').style.setProperty('grid-row', '2');
    let overlaymain = document.querySelector('.overlaymain');
    basket.forEach((element) => { overlaymain.innerHTML = element.innerHTML; });
    document.querySelector('.overlaytop').innerHTML = getOverlayCloseButton();
}


function showDataprotection() {
    let lang = getLanguage();
    document.querySelector('.overlay').style.setProperty('overflow', 'hidden');
    let overlaycontainer = document.querySelector('.overlaycontainer');
    overlaycontainer.style.setProperty('display', 'grid');
    overlaycontainer.style.setProperty('grid-template-rows', '64px auto');
    overlaycontainer.style.setProperty('overflow', 'hidden');
    document.querySelector('.overlaytop').style.setProperty('grid-row', '1');
    document.querySelector('.overlaytop').style.setProperty('overflow', 'hidden');
    document.querySelector('.overlaymain').style.setProperty('grid-row', '2');
    document.querySelector('.overlaymain').style.setProperty('overflow', 'auto');
    document.querySelector('.overlaymain').innerHTML = (lang == "german") ? getGermanDataprotection() : getEnglishDataprotection();
    document.querySelector('.overlaytop').innerHTML = getOverlayCloseButton();
}


function showImprint() {
    let lang = getLanguage();
    document.querySelector('.overlay').style.setProperty('overflow', 'hidden');
    let overlaycontainer = document.querySelector('.overlaycontainer');
    overlaycontainer.style.setProperty('display', 'grid');
    overlaycontainer.style.setProperty('grid-template-rows', '64px auto');
    overlaycontainer.style.setProperty('overflow', 'hidden');
    document.querySelector('.overlaytop').style.setProperty('grid-row', '1');
    document.querySelector('.overlaytop').style.setProperty('overflow', 'hidden');
    document.querySelector('.overlaymain').style.setProperty('grid-row', '2');
    document.querySelector('.overlaymain').style.setProperty('overflow', 'auto');
    document.querySelector('.overlaymain').innerHTML = (lang == "german") ? getGemanImprint() : getEnglishImprint();
    document.querySelector('.overlaytop').innerHTML = getOverlayCloseButton();
}

window.closeOverlay = closeOverlay;
window.openOverlay = openOverlay;
