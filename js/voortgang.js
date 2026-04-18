// voortgang.js — Voortgang tracking via localStorage
const voortgang = {
    STORAGE_KEY: 'piano-leerling-voortgang',

    defaults() {
        return {
            noten: {
                niveau: { 1: { score: 0, afgerond: false }, 2: { score: 0, afgerond: false }, 3: { score: 0, afgerond: false }, 4: { score: 0, afgerond: false } }
            },
            liedjes: {},
            badges: [],
            totaalPunten: 0
        };
    },

    load() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            if (data) {
                const parsed = JSON.parse(data);
                // Merge with defaults for forward compatibility
                const defaults = this.defaults();
                return { ...defaults, ...parsed, noten: { ...defaults.noten, ...parsed.noten } };
            }
        } catch (e) {
            console.warn('Kon voortgang niet laden:', e);
        }
        return this.defaults();
    },

    save(data) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.warn('Kon voortgang niet opslaan:', e);
        }
    },

    getNiveauScore(niveau) {
        const data = this.load();
        return data.noten.niveau[niveau] || { score: 0, afgerond: false };
    },

    setNiveauScore(niveau, score, afgerond) {
        const data = this.load();
        if (!data.noten.niveau[niveau]) data.noten.niveau[niveau] = { score: 0, afgerond: false };
        if (score > data.noten.niveau[niveau].score) {
            data.noten.niveau[niveau].score = score;
        }
        if (afgerond) data.noten.niveau[niveau].afgerond = true;
        this.save(data);
    },

    getLiedjeVoortgang(liedjeId) {
        const data = this.load();
        return data.liedjes[liedjeId] || { afgerond: false, pogingen: 0 };
    },

    setLiedjeVoortgang(liedjeId, afgerond) {
        const data = this.load();
        if (!data.liedjes[liedjeId]) data.liedjes[liedjeId] = { afgerond: false, pogingen: 0 };
        data.liedjes[liedjeId].pogingen++;
        if (afgerond) data.liedjes[liedjeId].afgerond = true;
        this.save(data);
    },

    getTotaalPunten() {
        const data = this.load();
        let totaal = 0;
        Object.values(data.noten.niveau).forEach(n => totaal += n.score);
        return totaal;
    },

    getAantalAfgerond() {
        const data = this.load();
        let niveaus = Object.values(data.noten.niveau).filter(n => n.afgerond).length;
        let liedjes = Object.values(data.liedjes).filter(l => l.afgerond).length;
        return { niveaus, liedjes };
    },

    getSterren(score) {
        if (score >= 90) return '⭐⭐⭐';
        if (score >= 60) return '⭐⭐';
        if (score >= 30) return '⭐';
        return '';
    },

    renderOverview(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const afgerond = this.getAantalAfgerond();
        const punten = this.getTotaalPunten();

        container.innerHTML = `
            <div class="progress-item">
                <div class="progress-value">${punten}</div>
                <div class="progress-label">Punten</div>
            </div>
            <div class="progress-item">
                <div class="progress-value">${afgerond.niveaus}/4</div>
                <div class="progress-label">Niveaus</div>
            </div>
            <div class="progress-item">
                <div class="progress-value">${afgerond.liedjes}</div>
                <div class="progress-label">Liedjes</div>
            </div>
        `;
    },

    renderNiveauSterren() {
        for (let i = 1; i <= 4; i++) {
            const el = document.getElementById(`sterren-${i}`);
            if (el) {
                const info = this.getNiveauScore(i);
                el.textContent = this.getSterren(info.score);
            }
        }
    }
};
