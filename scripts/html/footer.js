export function getFooterContent() {
    return /*html*/`
        <div class="divider"></div>
        <div class="footergrid">
            <div id="imprintId" onclick="openOverlay('imprint')" class="imprint">
                <img id="imprintImgId" class="imprintImg" src="img/imprint_icon.png" alt="">
                <p class="imprintParagraph" id="imprintParagraphId">Impressum</p>
            </div>
            <div id="dataprotectionId" onclick="openOverlay('dataprotection')" class="dataprotection">
                <img id="dataprotectionImgId" class="dataprotectionImg" src="img/dataprotection_icon.png" alt="">
                <p class="dataprotectionParagraph" id="dataprotectionParagraphId">Datenschutz</p>
            </div>
            <div class="language">
                <img onclick="switchLanguage()" id="languageImgId" class="languageImg" src="img/german_flag.png" alt="">
                <select class="selectBox" id="selectLanguageId" onchange="changeLanguage()">
                    <option value="1">German</option>
                    <option value="2" selected="selected">English</option>
                </select>
            </div>
        </div>
    `;
}