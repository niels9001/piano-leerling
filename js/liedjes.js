// liedjes.js — Liedjes speel-module

// Liedjes data
const LIEDJES = [
    {
        id: 'vader-jacob',
        naam: 'Vader Jacob',
        moeilijkheid: 1,
        noten: [
            { noot: 'C4', duur: 'q' }, { noot: 'D4', duur: 'q' }, { noot: 'E4', duur: 'q' }, { noot: 'C4', duur: 'q' },
            { noot: 'C4', duur: 'q' }, { noot: 'D4', duur: 'q' }, { noot: 'E4', duur: 'q' }, { noot: 'C4', duur: 'q' },
            { noot: 'E4', duur: 'q' }, { noot: 'F4', duur: 'q' }, { noot: 'G4', duur: 'h' },
            { noot: 'E4', duur: 'q' }, { noot: 'F4', duur: 'q' }, { noot: 'G4', duur: 'h' },
            { noot: 'G4', duur: '8' }, { noot: 'A4', duur: '8' }, { noot: 'G4', duur: '8' }, { noot: 'F4', duur: '8' }, { noot: 'E4', duur: 'q' }, { noot: 'C4', duur: 'q' },
            { noot: 'G4', duur: '8' }, { noot: 'A4', duur: '8' }, { noot: 'G4', duur: '8' }, { noot: 'F4', duur: '8' }, { noot: 'E4', duur: 'q' }, { noot: 'C4', duur: 'q' },
            { noot: 'C4', duur: 'q' }, { noot: 'G3', duur: 'q' }, { noot: 'C4', duur: 'h' },
            { noot: 'C4', duur: 'q' }, { noot: 'G3', duur: 'q' }, { noot: 'C4', duur: 'h' }
        ]
    },
    {
        id: 'alle-eendjes',
        naam: 'Alle Eendjes',
        moeilijkheid: 1,
        noten: [
            { noot: 'C4', duur: 'q' }, { noot: 'D4', duur: 'q' }, { noot: 'E4', duur: 'q' }, { noot: 'F4', duur: 'q' },
            { noot: 'G4', duur: 'q' }, { noot: 'G4', duur: 'q' }, { noot: 'A4', duur: 'q' }, { noot: 'A4', duur: 'q' },
            { noot: 'G4', duur: 'h' },
            { noot: 'A4', duur: 'q' }, { noot: 'A4', duur: 'q' }, { noot: 'G4', duur: 'h' },
            { noot: 'F4', duur: 'q' }, { noot: 'F4', duur: 'q' }, { noot: 'E4', duur: 'q' }, { noot: 'E4', duur: 'q' },
            { noot: 'D4', duur: 'q' }, { noot: 'D4', duur: 'q' }, { noot: 'C4', duur: 'h' }
        ]
    },
    {
        id: 'berend-botje',
        naam: 'Berend Botje',
        moeilijkheid: 1,
        noten: [
            { noot: 'E4', duur: 'q' }, { noot: 'E4', duur: 'q' }, { noot: 'F4', duur: 'q' }, { noot: 'G4', duur: 'q' },
            { noot: 'G4', duur: 'q' }, { noot: 'F4', duur: 'q' }, { noot: 'E4', duur: 'q' }, { noot: 'D4', duur: 'q' },
            { noot: 'C4', duur: 'q' }, { noot: 'C4', duur: 'q' }, { noot: 'D4', duur: 'q' }, { noot: 'E4', duur: 'q' },
            { noot: 'E4', duur: 'q' }, { noot: 'D4', duur: 'q' }, { noot: 'D4', duur: 'h' }
        ]
    },
    {
        id: 'twinkle',
        naam: 'Twinkle Twinkle',
        moeilijkheid: 1,
        noten: [
            { noot: 'C4', duur: 'q' }, { noot: 'C4', duur: 'q' }, { noot: 'G4', duur: 'q' }, { noot: 'G4', duur: 'q' },
            { noot: 'A4', duur: 'q' }, { noot: 'A4', duur: 'q' }, { noot: 'G4', duur: 'h' },
            { noot: 'F4', duur: 'q' }, { noot: 'F4', duur: 'q' }, { noot: 'E4', duur: 'q' }, { noot: 'E4', duur: 'q' },
            { noot: 'D4', duur: 'q' }, { noot: 'D4', duur: 'q' }, { noot: 'C4', duur: 'h' }
        ]
    },
    {
        id: 'paddenstoel',
        naam: 'Op een Grote Paddenstoel',
        moeilijkheid: 2,
        noten: [
            { noot: 'E4', duur: 'q' }, { noot: 'E4', duur: 'q' }, { noot: 'D4', duur: 'q' }, { noot: 'E4', duur: 'q' },
            { noot: 'F4', duur: 'q' }, { noot: 'F4', duur: 'q' }, { noot: 'E4', duur: 'h' },
            { noot: 'D4', duur: 'q' }, { noot: 'D4', duur: 'q' }, { noot: 'E4', duur: 'q' }, { noot: 'D4', duur: 'q' },
            { noot: 'C4', duur: 'h' }, { noot: 'C4', duur: 'h' },
            { noot: 'E4', duur: 'q' }, { noot: 'E4', duur: 'q' }, { noot: 'D4', duur: 'q' }, { noot: 'E4', duur: 'q' },
            { noot: 'F4', duur: 'q' }, { noot: 'F4', duur: 'q' }, { noot: 'E4', duur: 'h' },
            { noot: 'D4', duur: 'q' }, { noot: 'E4', duur: 'q' }, { noot: 'D4', duur: 'q' }, { noot: 'C4', duur: 'q' },
            { noot: 'C4', duur: 'h' }, { noot: 'C4', duur: 'h' }
        ]
    },
    {
        id: 'slaap-kindje',
        naam: 'Slaap Kindje Slaap',
        moeilijkheid: 2,
        noten: [
            { noot: 'G4', duur: 'q' }, { noot: 'E4', duur: 'h' }, { noot: 'G4', duur: 'q' },
            { noot: 'E4', duur: 'h' }, { noot: 'G4', duur: 'q' }, { noot: 'A4', duur: 'q' },
            { noot: 'G4', duur: 'q' }, { noot: 'F4', duur: 'q' }, { noot: 'E4', duur: 'q' }, { noot: 'D4', duur: 'h' },
            { noot: 'E4', duur: 'q' }, { noot: 'F4', duur: 'q' }, { noot: 'E4', duur: 'q' }, { noot: 'D4', duur: 'q' },
            { noot: 'C4', duur: 'h' }, { noot: 'C4', duur: 'h' }
        ]
    }
];

const liedjesSpeler = {
    piano: null,
    huidigLiedje: null,
    huidigeNoot: 0,
    modus: 'stap', // 'stap' of 'luister'
    isAfspelen: false,

    init() {
        this.renderLijst();
    },

    renderLijst() {
        const container = document.getElementById('liedjes-lijst');
        if (!container) return;

        container.innerHTML = LIEDJES.map(liedje => {
            const progress = voortgang.getLiedjeVoortgang(liedje.id);
            const sterren = '⭐'.repeat(liedje.moeilijkheid);
            const status = progress.afgerond ? '✅ Geleerd!' : progress.pogingen > 0 ? `🎯 ${progress.pogingen}x geprobeerd` : '';

            return `
                <div class="liedje-card" onclick="liedjesSpeler.startLiedje('${liedje.id}')">
                    <div class="liedje-naam">${liedje.naam}</div>
                    <div class="liedje-moeilijkheid">${sterren}</div>
                    <div class="liedje-status">${status}</div>
                </div>
            `;
        }).join('');
    },

    startLiedje(id) {
        this.huidigLiedje = LIEDJES.find(l => l.id === id);
        if (!this.huidigLiedje) return;

        this.huidigeNoot = 0;
        this.modus = 'stap';
        this.isAfspelen = false;

        document.getElementById('liedjes-lijst').classList.add('hidden');
        document.getElementById('liedje-speler').classList.remove('hidden');
        document.getElementById('liedje-titel').textContent = this.huidigLiedje.naam;

        if (this.piano) this.piano.destroy();
        this.piano = new Piano('piano-liedjes', {
            startNote: 'C3',
            endNote: 'C5',
            onKeyPress: (note) => this.handleKeyPress(note)
        });

        this.updateModusButtons();
        this.toonHuidigeNoot();
    },

    handleKeyPress(note) {
        if (this.modus !== 'stap' || this.isAfspelen) return;
        if (!this.huidigLiedje || this.huidigeNoot >= this.huidigLiedje.noten.length) return;

        const verwacht = this.huidigLiedje.noten[this.huidigeNoot].noot;

        if (note === verwacht) {
            this.piano.flashKey(note, 'correct');
            this.huidigeNoot++;

            if (this.huidigeNoot >= this.huidigLiedje.noten.length) {
                this.liedjeKlaar();
            } else {
                setTimeout(() => this.toonHuidigeNoot(), 300);
            }
        } else {
            this.piano.flashKey(note, 'wrong', 500);
            document.getElementById('liedje-instructie').textContent = `❌ Dat was niet goed. Probeer ${verwacht.replace(/\d/, '')}!`;
        }
    },

    toonHuidigeNoot() {
        if (!this.huidigLiedje || this.huidigeNoot >= this.huidigLiedje.noten.length) return;

        const nootData = this.huidigLiedje.noten[this.huidigeNoot];
        const nootNaam = nootData.noot.replace(/\d/, '');

        this.piano.clearAllStates();
        this.piano.highlightKey(nootData.noot, 'highlight');

        const voortgangText = `${this.huidigeNoot + 1} / ${this.huidigLiedje.noten.length}`;
        document.getElementById('liedje-instructie').textContent = `Tik op ${nootNaam}  (${voortgangText})`;

        this.renderLiedjeNotenbalk();
    },

    renderLiedjeNotenbalk() {
        const container = document.getElementById('liedje-notenbalk');
        container.innerHTML = '';

        try {
            const { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } = Vex.Flow;

            const div = document.createElement('div');
            container.appendChild(div);

            // Show a window of notes around the current position
            const windowSize = 8;
            const start = Math.max(0, this.huidigeNoot - 2);
            const end = Math.min(this.huidigLiedje.noten.length, start + windowSize);
            const notenWindow = this.huidigLiedje.noten.slice(start, end);

            const renderer = new Renderer(div, Renderer.Backends.SVG);
            renderer.resize(500, 120);
            const context = renderer.getContext();

            const stave = new Stave(10, 10, 480);
            stave.addClef('treble');
            stave.setContext(context).draw();

            const staveNotes = notenWindow.map((n, idx) => {
                const vex = this.toVexFlowNote(n.noot);
                const duration = this.toVexDuration(n.duur);
                const sn = new StaveNote({ keys: [vex.key], duration: duration });

                if (vex.accidental) {
                    sn.addModifier(new Accidental(vex.accidental));
                }

                const actualIdx = start + idx;
                if (actualIdx === this.huidigeNoot) {
                    sn.setStyle({ fillStyle: '#F39C12', strokeStyle: '#F39C12' });
                } else if (actualIdx < this.huidigeNoot) {
                    sn.setStyle({ fillStyle: '#2ECC71', strokeStyle: '#2ECC71' });
                } else {
                    sn.setStyle({ fillStyle: '#6C63FF', strokeStyle: '#6C63FF' });
                }

                return sn;
            });

            if (staveNotes.length === 0) return;

            // Use SOFT voice mode to avoid strict timing
            const voice = new Voice({ num_beats: staveNotes.length, beat_value: 4 }).setMode(Voice.Mode.SOFT);
            voice.addTickables(staveNotes);
            new Formatter().joinVoices([voice]).format([voice], 420);
            voice.draw(context, stave);
        } catch (e) {
            console.warn('Notenbalk render error:', e);
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

    toVexDuration(duur) {
        const map = { 'w': 'w', 'h': 'h', 'q': 'q', '8': '8', '16': '16' };
        return map[duur] || 'q';
    },

    async luisterModus() {
        this.modus = 'luister';
        this.isAfspelen = true;
        this.updateModusButtons();

        document.getElementById('liedje-instructie').textContent = '🎵 Luister naar het liedje...';
        this.piano.clearAllStates();

        await Tone.start();

        for (let i = 0; i < this.huidigLiedje.noten.length; i++) {
            if (!this.isAfspelen) break;

            const nootData = this.huidigLiedje.noten[i];
            const duurMs = this.duurNaarMs(nootData.duur);

            this.piano.highlightKey(nootData.noot, 'highlight');
            this.piano.synth.triggerAttackRelease(nootData.noot, duurMs / 1000);
            this.huidigeNoot = i;
            this.renderLiedjeNotenbalk();

            await new Promise(r => setTimeout(r, duurMs));
            this.piano.clearHighlights();
        }

        this.isAfspelen = false;
        this.huidigeNoot = 0;
        document.getElementById('liedje-instructie').textContent = '✅ Liedje afgespeeld! Probeer nu zelf.';
        this.stapModus();
    },

    stapModus() {
        this.modus = 'stap';
        this.isAfspelen = false;
        this.updateModusButtons();
        this.toonHuidigeNoot();
    },

    updateModusButtons() {
        document.getElementById('btn-luister').classList.toggle('active', this.modus === 'luister');
        document.getElementById('btn-stap').classList.toggle('active', this.modus === 'stap');
    },

    duurNaarMs(duur) {
        const bpm = 100;
        const beatMs = 60000 / bpm;
        const map = { 'w': 4, 'h': 2, 'q': 1, '8': 0.5, '16': 0.25 };
        return (map[duur] || 1) * beatMs;
    },

    liedjeKlaar() {
        voortgang.setLiedjeVoortgang(this.huidigLiedje.id, true);
        this.piano.clearAllStates();

        document.getElementById('liedje-instructie').innerHTML = `
            <div style="text-align:center">
                <div style="font-size:1.5em">🎉 Geweldig! Je hebt "${this.huidigLiedje.naam}" gespeeld!</div>
                <div style="margin-top:12px">
                    <button class="control-btn" onclick="liedjesSpeler.startLiedje('${this.huidigLiedje.id}')">🔄 Opnieuw</button>
                    <button class="control-btn" onclick="liedjesSpeler.stopLiedje()">← Terug</button>
                </div>
            </div>
        `;
        document.getElementById('liedje-notenbalk').innerHTML = '';
    },

    stopLiedje() {
        this.isAfspelen = false;
        this.huidigLiedje = null;
        document.getElementById('liedje-speler').classList.add('hidden');
        document.getElementById('liedjes-lijst').classList.remove('hidden');
        this.renderLijst();
        if (this.piano) {
            this.piano.destroy();
            this.piano = null;
        }
    }
};
