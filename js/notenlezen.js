// notenlezen.js — Noten leer-module met niveaus
const notenLezen = {
    piano: null,
    huidigNiveau: 0,
    vragen: [],
    huidigeVraag: 0,
    score: 0,
    totaalVragen: 10,

    // Noot definities per niveau
    niveauConfig: {
        1: {
            titel: 'Witte Toetsen Leren',
            noten: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'],
            toonNotenbalk: false,
            beschrijving: 'Leer de witte toetsen kennen!'
        },
        2: {
            titel: 'Noten op de Balk',
            noten: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'],
            toonNotenbalk: true,
            beschrijving: 'Welke noot staat er op de notenbalk?'
        },
        3: {
            titel: 'Snelheid & Combinaties',
            noten: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'],
            toonNotenbalk: true,
            tijdslimiet: 8000,
            beschrijving: 'Hoe snel kun je de noten herkennen?'
        },
        4: {
            titel: 'Kruisen & Mollen',
            noten: ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4'],
            toonNotenbalk: true,
            beschrijving: 'Nu ook de zwarte toetsen!'
        }
    },

    startNiveau(niveau) {
        this.huidigNiveau = niveau;
        this.score = 0;
        this.huidigeVraag = 0;
        this.timer = null;

        const config = this.niveauConfig[niveau];
        this.vragen = this.genereerVragen(config.noten, this.totaalVragen);

        document.getElementById('niveau-keuze').classList.add('hidden');
        document.getElementById('les-content').classList.remove('hidden');
        document.getElementById('les-titel').textContent = config.titel;

        // Init piano als dat nog niet is
        if (this.piano) this.piano.destroy();
        this.piano = new Piano('piano-noten', {
            startNote: niveau === 4 ? 'C4' : 'C4',
            endNote: 'C5',
            onKeyPress: (note) => this.checkAntwoord(note)
        });

        this.toonVraag();
    },

    genereerVragen(noten, aantal) {
        const vragen = [];
        for (let i = 0; i < aantal; i++) {
            const noot = noten[Math.floor(Math.random() * noten.length)];
            vragen.push(noot);
        }
        return vragen;
    },

    toonVraag() {
        if (this.huidigeVraag >= this.vragen.length) {
            this.eindigLes();
            return;
        }

        const noot = this.vragen[this.huidigeVraag];
        const config = this.niveauConfig[this.huidigNiveau];

        // Update UI
        document.getElementById('les-score').textContent = `${this.score} punten`;
        document.getElementById('les-voortgang').textContent = `${this.huidigeVraag + 1} / ${this.vragen.length}`;
        document.getElementById('les-feedback').textContent = '';
        document.getElementById('les-feedback').className = 'les-feedback';

        if (this.piano) this.piano.clearAllStates();

        if (config.toonNotenbalk) {
            this.renderNotenbalk(noot);
            document.getElementById('les-vraag').textContent = config.beschrijving;
        } else {
            document.getElementById('notenbalk-container').innerHTML = '';
            const nootNaam = noot.replace(/\d/, '');
            document.getElementById('les-vraag').innerHTML = `Tik op de toets <strong>${nootNaam}</strong>`;
            this.piano.highlightKey(noot, 'highlight');
        }

        // Timer voor niveau 3
        if (config.tijdslimiet) {
            if (this.timer) clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.checkAntwoord(null); // tijd op
            }, config.tijdslimiet);
        }
    },

    renderNotenbalk(noot) {
        const container = document.getElementById('notenbalk-container');
        container.innerHTML = '';

        try {
            const { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } = Vex.Flow;

            const div = document.createElement('div');
            container.appendChild(div);

            const renderer = new Renderer(div, Renderer.Backends.SVG);
            renderer.resize(280, 120);
            const context = renderer.getContext();
            context.setFont('Arial', 10);

            const stave = new Stave(10, 10, 260);
            stave.addClef('treble');
            stave.setContext(context).draw();

            // Convert note to VexFlow format
            const vexNote = this.toVexFlowNote(noot);
            const staveNote = new StaveNote({
                keys: [vexNote.key],
                duration: 'q'
            });

            if (vexNote.accidental) {
                staveNote.addModifier(new Accidental(vexNote.accidental));
            }

            // Style the note head
            staveNote.setStyle({ fillStyle: '#6C63FF', strokeStyle: '#6C63FF' });

            const voice = new Voice({ num_beats: 1, beat_value: 4 });
            voice.addTickables([staveNote]);

            new Formatter().joinVoices([voice]).format([voice], 200);
            voice.draw(context, stave);
        } catch (e) {
            console.warn('VexFlow render error:', e);
            container.innerHTML = `<div style="font-size:2em;padding:20px;">🎵 ${noot}</div>`;
        }
    },

    toVexFlowNote(note) {
        const match = note.match(/^([A-G])(#?)(\d)$/);
        if (!match) return { key: 'c/4', accidental: null };

        const [, name, sharp, octave] = match;
        return {
            key: `${name.toLowerCase()}${sharp ? '#' : ''}/${octave}`,
            accidental: sharp ? '#' : null
        };
    },

    checkAntwoord(gespeeldeNoot) {
        if (this.timer) clearTimeout(this.timer);

        const correcteNoot = this.vragen[this.huidigeVraag];
        const feedbackEl = document.getElementById('les-feedback');

        if (gespeeldeNoot === correcteNoot) {
            this.score += 10;
            feedbackEl.textContent = '✅ Goed zo!';
            feedbackEl.className = 'les-feedback correct';
            if (this.piano) this.piano.flashKey(correcteNoot, 'correct');
        } else {
            feedbackEl.textContent = gespeeldeNoot
                ? `❌ Dat was ${gespeeldeNoot.replace(/\d/, '')} — het was ${correcteNoot.replace(/\d/, '')}`
                : `⏰ Tijd op! Het was ${correcteNoot.replace(/\d/, '')}`;
            feedbackEl.className = 'les-feedback wrong';
            if (this.piano) {
                this.piano.flashKey(correcteNoot, 'correct', 1200);
                if (gespeeldeNoot) this.piano.flashKey(gespeeldeNoot, 'wrong');
            }
        }

        this.huidigeVraag++;

        setTimeout(() => {
            this.toonVraag();
        }, 1200);
    },

    eindigLes() {
        const maxScore = this.totaalVragen * 10;
        const percentage = Math.round((this.score / maxScore) * 100);
        const sterren = voortgang.getSterren(percentage);

        voortgang.setNiveauScore(this.huidigNiveau, percentage, percentage >= 60);

        document.getElementById('les-vraag').innerHTML = `
            <div style="text-align:center">
                <div style="font-size:1.5em;margin-bottom:8px">Les klaar!</div>
                <div style="font-size:2em">${sterren || '💪'}</div>
                <div style="margin-top:8px">${this.score} / ${this.totaalVragen * 10} punten (${percentage}%)</div>
                <button class="control-btn" style="margin-top:12px" onclick="notenLezen.startNiveau(${this.huidigNiveau})">🔄 Opnieuw</button>
                <button class="control-btn" style="margin-top:12px" onclick="notenLezen.stopLes()">← Terug</button>
            </div>
        `;
        document.getElementById('les-feedback').textContent = '';
        document.getElementById('notenbalk-container').innerHTML = '';
        if (this.piano) this.piano.clearAllStates();
    },

    stopLes() {
        if (this.timer) clearTimeout(this.timer);
        document.getElementById('les-content').classList.add('hidden');
        document.getElementById('niveau-keuze').classList.remove('hidden');
        voortgang.renderNiveauSterren();
        if (this.piano) {
            this.piano.destroy();
            this.piano = null;
        }
    }
};
