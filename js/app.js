// app.js — Hoofd-app logica & navigatie
const app = {
    pianoVrij: null,

    init() {
        // Render voortgang op startscherm
        voortgang.renderOverview('progress-overview');
        voortgang.renderNiveauSterren();

        // Init liedjes lijst
        liedjesSpeler.init();
    },

    showScreen(screenId) {
        // Cleanup huidige schermen
        if (this.pianoVrij) {
            this.pianoVrij.destroy();
            this.pianoVrij = null;
        }

        // Hide all screens
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

        // Show target screen
        const screen = document.getElementById(screenId);
        if (screen) screen.classList.add('active');

        // Screen-specific init
        switch (screenId) {
            case 'home':
                voortgang.renderOverview('progress-overview');
                voortgang.renderNiveauSterren();
                liedjesSpeler.renderLijst();
                break;
            case 'vrij':
                this.pianoVrij = new Piano('piano-vrij', {
                    startNote: 'C3',
                    endNote: 'C5',
                    showLabels: true
                });
                break;
            case 'noten':
                voortgang.renderNiveauSterren();
                // Make sure we show niveau keuze
                document.getElementById('niveau-keuze').classList.remove('hidden');
                document.getElementById('les-content').classList.add('hidden');
                break;
            case 'liedjes':
                document.getElementById('liedjes-lijst').classList.remove('hidden');
                document.getElementById('liedje-speler').classList.add('hidden');
                liedjesSpeler.renderLijst();
                break;
        }
    }
};

// Start de app
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
