export function getGemanImprint() {
    return /*html*/`
        <section>
    <div id="imprintcontainer" class="imprintcontainer">
        <h1>Impressum</h1>
        <h2 id="m46">Diensteanbieter</h2>
        Martin Reifschneider
        Breite Schneise 9
        63674 Altenstadt
        Germany

        <h2 id="m56">Kontaktmöglichkeiten</h2>
        <form id="my-form" action="https://formspree.io/f/xvoerbyy" method="POST">
            <input class="contactInput" placeholder="email" type="email" name="email" required /></br>
            <textarea placeholder="Nachricht" type="text" name="message" required></textarea>
            <button id="my-form-button">Senden</button>
            <p id="my-form-status"></p>
        </form>
        <h2 id="m169">Bildnachweise</h2>
        <p>Bildquellen und Urheberrechtshinweise: </p>
        <p>Icons created by <a href="https://www.flaticon.com" target="_blank">https://www.flaticon.com</a></p>
        <p>Pictures created by <a href="https://pixabay.com" target="_blank">https://pixabay.com</a></p>

        <p class="seal"><a href="https://datenschutz-generator.de/"
                title="Rechtstext von Dr. Schwenke - für weitere Informationen bitte anklicken." target="_blank"
                rel="noopener noreferrer nofollow">Erstellt mit kostenlosem Datenschutz-Generator.de von Dr. Thomas
                Schwenke</a></p>
    </div>
    <script>form.addEventListener("submit", handleSubmit);</script>
</section>
    `;
}