export function getDropdown() {
    return /*html*/`
        <div id="dropdownimprintId" onclick="openOverlay('imprint')" class="dropdownimprint">
            <img id="imprintImgId" class="imprintImg" src="img/imprint_icon.png" alt="">
            <p class="imprintParagraph" id="imprintParagraphId">Impressum</p>
        </div>
        <div id="dropdowndataprotectionId" onclick="openOverlay('dataprotection')" class="dropdowndataprotection">
            <img id="dataprotectionImgId" class="dataprotectionImg" src="img/dataprotection_icon.png" alt="">
            <p class="dataprotectionParagraph" id="dataprotectionParagraphId">Datenschutz</p>
        </div>
    `;
}