import { data } from "../content.js";
import { getLanguage } from "../language.js";


function getMealSection(mealsectionheadline, mealdescription, mealprize, currency, list, i) {
    const mealfunction = `showMealInfo('${list}', ${i})`;
    const addtobasket = `addToBasket('${list}', ${i})`;
    return /*html*/`
        <div class="mealsection">
            <h1 class="mealsectionheadline">${mealsectionheadline} ${getImgSection("mealinfobox", "img/imprint_icon.png", mealfunction)}</h1>
            <p class="mealdescription">${mealdescription}</p>
            <h1 class="mealprize">${mealprize} ${currency}</h1>
            <img class="addtobasket" src="svg/akar-icons--plus.svg" onclick="${addtobasket}" alt="Add To Basket Button">
        </div>
    `;
}


function prepareMealContainer(content, headline, headlineId) {
    return /*html*/`
        <div class="mealcontainer">
            <div id="${headlineId}" class="mealheadline">${headline}</div>
            ${content}
        </div>
    `;
}


function getImgSection(className, src, fn = "") {
    if (fn != "") return /*html*/`<img class="${className}" src="${src}" onclick="${fn}" alt="Image">`;
    return /*html*/`<img class="${className}" src="${src}" alt="Image">`;
}


function getSection(className, src, list, array, headline, headlineId) {
    let lang = getLanguage();
    let str = "";
    if (className != "" && src != "") str += getImgSection(className, src);
    for (let i = 0; i < array.length; i++) {
        if(lang == "german") str += getMealSection(array[i].name.de, array[i].description.de, parseFloat(array[i].prize).toFixed(2), array[i].currency, list, i);
        else str += getMealSection(array[i].name.en, array[i].description.en, parseFloat(array[i].prize).toFixed(2), array[i].currency, list, i);
    }
    return prepareMealContainer(str, headline, headlineId);
}


function getEnglishCenterContent() {
    return /*html*/`
        ${getSection("", "", "popular", data.popular, "Popular", "popular")}
        ${getSection("appetizersimg", "img/olives-2431689_1280.jpg", "antipasti", data.antipasti, "Antipasti - Starters", "antipasti")}
        ${getSection("saladimg", "img/salad-1603608_1280.jpg", "salad", data.salad, "Salad", "salad")}
        ${getSection("pizzaimg", "img/ai-generated-8673813_1280.png", "pizza", data.pizza, "Pizza", "pizza")}
        ${getSection("pizzaimg", "img/pizza-1331314_1280.jpg", "pizza_family", data.pizza_family, "Family-Pizza", "familypizza")}
        ${getSection("pizzaimg", "img/italian-cuisine-1047388_1280.jpg", "pizza_bread", data.pizza_bread, "Pizzabread", "pizzabread")}
        ${getSection("pastaimg", "img/pasta-712664_1280.jpg", "pasta_classica", data.pasta_classica, "Pasta Classica", "pastaclassica")}
        ${getSection("pastaimg", "img/lasagne-8266544_1280.jpg", "pasta_alforno", data.pasta_alforno, "Pasta al Forno", "pastaalforno")}
        ${getSection("schnitzelimg", "img/schnitzel-1817337_1280.jpg", "schnitzel", data.schnitzel, "Schnitzel", "schnitzel")}
        ${getSection("extraimg", "img/french-fries-5332766_1280.jpg", "extra", data.extra, "Supplements", "supplements")}
        ${getSection("dessertsimg", "img/italian-food-2157246_1280.jpg", "desserts", data.desserts, "Desserts", "desserts")}
        ${getSection("drinksimg", "img/bubbles-7747590_1280.jpg", "soft_drinks", data.soft_drinks, "Soft Drinks" , "softdrinks")}
        ${getSection("drinksimg", "img/water-3007467_1280.jpg", "drinks", data.drinks, "Drinks", "drinks")}
    `;
}


function getGermanCenterContent() {
    return /*html*/`
        ${getSection("", "", "popular", data.popular, "Beliebt", "Popular", "popular")}
        ${getSection("appetizersimg", "img/olives-2431689_1280.jpg", "antipasti", data.antipasti, "Antipasti - Vorspeisen", "antipasti")}
        ${getSection("saladimg", "img/salad-1603608_1280.jpg", "salad", data.salad, "Salate", "salad")}
        ${getSection("pizzaimg", "img/ai-generated-8673813_1280.png", "pizza", data.pizza, "Pizza", "pizza")}
        ${getSection("pizzaimg", "img/pizza-1331314_1280.jpg", "pizza_family", data.pizza_family, "Familien-Pizza", "familypizza")}
        ${getSection("pizzaimg", "img/italian-cuisine-1047388_1280.jpg", "pizza_bread", data.pizza_bread, "Pizzabrot", "pizzabread")}
        ${getSection("pastaimg", "img/pasta-712664_1280.jpg", "pasta_classica", data.pasta_classica, "Pasta Classica", "pastaclassica")}
        ${getSection("pastaimg", "img/lasagne-8266544_1280.jpg", "pasta_alforno", data.pasta_alforno, "Pasta al Forno", "pastaalforno")}
        ${getSection("schnitzelimg", "img/schnitzel-1817337_1280.jpg", "schnitzel", data.schnitzel, "Schnitzel", "schnitzel")}
        ${getSection("extraimg", "img/french-fries-5332766_1280.jpg", "extra", data.extra, "Beilagen", "supplements")}
        ${getSection("dessertsimg", "img/italian-food-2157246_1280.jpg", "desserts", data.desserts, "Desserts", "desserts")}
        ${getSection("drinksimg", "img/bubbles-7747590_1280.jpg", "soft_drinks", data.soft_drinks, "Alkoholfreie Getränke", "softdrinks")}
        ${getSection("drinksimg", "img/water-3007467_1280.jpg", "drinks", data.drinks, "Alkoholische Getränke", "drinks")}
    `;
}


export function getCenterContent() {
    let lang = getLanguage();
    return /*html*/`
        <div class="wrapper">
            ${(lang == "german") ? getGermanCenterContent() : getEnglishCenterContent() };
        </div>
    `;
}