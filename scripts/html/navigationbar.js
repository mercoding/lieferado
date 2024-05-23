import { getLanguage } from "../language.js";


function getGermanNavbar() {
    return /*html*/`
        <li id="navantipasti" onclick="scrollToDiv('antipasti')">Antipasti - Vorspeisen</li>
        <li id="navsalad" onclick="scrollToDiv('salad')">Salate</li>
        <li id="navpizza" onclick="scrollToDiv('pizza')">Pizza</li>
        <li id="navfamilypizza" onclick="scrollToDiv('familypizza')">Familien - Pizza</li>
        <li id="navpizzabread" onclick="scrollToDiv('pizzabread')">Pizzabrot</li>
        <li id="navpastaclassica" onclick="scrollToDiv('pastaclassica')">Pasta Classica</li>
        <li id="navpastaalforno" onclick="scrollToDiv('pastaalforno')">Pasta al Forno</li>
        <li id="navschnitzel" onclick="scrollToDiv('schnitzel')">Schnitzel</li>
        <li id="navsupplements" onclick="scrollToDiv('supplements')">Beilagen</li>
        <li id="navdesserts" onclick="scrollToDiv('desserts')">Desserts</li>
        <li id="navsoftdrinks" onclick="scrollToDiv('softdrinks')">Alkoholfreie Getränke</li>
        <li id="navdrinks" onclick="scrollToDiv('drinks')">Alkoholische Getränke</li>
    `;
}

function getEnglishNavbar() {
    return /*html*/`
        <li id="navantipasti" onclick="scrollToDiv('antipasti')">Antipasti - Starters</li>
        <li id="navsalad" onclick="scrollToDiv('salad')">Salad</li>
        <li id="navpizza" onclick="scrollToDiv('pizza')">Pizza</li>
        <li id="navfamilypizza" onclick="scrollToDiv('familypizza')">Family - Pizza</li>
        <li id="navpizzabread" onclick="scrollToDiv('pizzabread')">Pizzabread</li>
        <li id="navpastaclassica" onclick="scrollToDiv('pastaclassica')">Pasta Classica</li>
        <li id="navpastaalforno" onclick="scrollToDiv('pastaalforno')">Pasta al Forno</li>
        <li id="navschnitzel" onclick="scrollToDiv('schnitzel')">Schnitzel</li>
        <li id="navsupplements" onclick="scrollToDiv('supplements')">Supplements</li>
        <li id="navdesserts" onclick="scrollToDiv('desserts')">Desserts</li>
        <li id="navsoftdrinks" onclick="scrollToDiv('softdrinks')">Soft Drinks</li>
        <li id="navdrinks" onclick="scrollToDiv('drinks')">Drinks</li>
    `;
}



export function getNavigationBar() {
    let lang = getLanguage();
    return /*html*/`
        <div class="wrapper">
            <nav id="navbar" class="navbar">
                ${(lang == "german") ? getGermanNavbar() : getEnglishNavbar() }
            </nav>  
        </div>
    `;
}