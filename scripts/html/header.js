import { getLanguage } from "../language.js";

export function getHeaderContent() {
    let lang = getLanguage();
    return /*html*/`
        <div class="logocontainer" onclick="content()">
            <img src="./svg/arcticons--just-eat.svg" alt="Lieferando Icon">
            <p>Lieferado</p>
        </div>
        <div class="menuheaderparagraph">
            <p>${(lang == "german") ? 'Speisekarte' : 'Menu' }</p>
        </div>
        <div class="headermenucontainer">
            <div onclick="switchLanguage()" class="languageswitch"><img class="languageImg" src="./img/german_flag.png" alt="language switch button"></div>
            <div class="burgermenu" onclick="hamburgerWasClicked()">
                <input class="checkbox" type="checkbox" id="menu-toggle">
                <div class="menu-bar-container">
                    <div class="menu-bar"></div>
                </div>
            </div>
        </div>
    `;
}