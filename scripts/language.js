import * as reload from './content.js';

let language = 'german';


export function checkLanguage() {
    if (language == 'german') {
        setGerman();
    }
    else {
        setEnglish();
    }
}


export function getLanguage() {
    if (!localStorage.getItem('language')) {
        localStorage.setItem('language', 'german');
    }
    language = localStorage.getItem('language');
    return language;
}


function switchLanguage() {
    (language == 'german') ? setEnglish() : setGerman();
    reload.content();
}


function changeLanguage() {
    let languageId = document.getElementById('selectLanguageId');
    (languageId.value == 1) ? setGerman() : setEnglish();
}


function setGerman() {
    language = 'german';
    localStorage.setItem('language', 'german');
    document.getElementById('selectLanguageId').options[0].text = 'Deutsch';
    document.querySelectorAll('.languageImg').forEach(element => { element.setAttribute('src', 'img/german_flag.png'); });
    document.getElementById('selectLanguageId').options[0].setAttribute('selected', 'selected');
    document.getElementById('selectLanguageId').options[1].removeAttribute('selected', 'selected');
    document.querySelectorAll('.imprintParagraph').forEach(element => { element.innerHTML = 'Impressum' });
    document.querySelectorAll('.dataprotectionParagraph').forEach(element => { element.innerHTML = 'Datenschutz' });
}


function setEnglish() {
    language = 'english';
    document.getElementById('selectLanguageId').options[0].text = 'German';
    localStorage.setItem('language', 'english');
    document.querySelectorAll('.languageImg').forEach(element => { element.setAttribute('src', 'img/british_flag.png'); });
    document.getElementById('selectLanguageId').options[1].setAttribute('selected', 'selected');
    document.getElementById('selectLanguageId').options[0].removeAttribute('selected', 'selected');
    document.querySelectorAll('.imprintParagraph').forEach(element => { element.innerHTML = 'Imprint' });
    document.querySelectorAll('.dataprotectionParagraph').forEach(element => { element.innerHTML = 'Dataprotection' });
}


window.switchLanguage = switchLanguage;
window.changeLanguage = changeLanguage;