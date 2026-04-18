// piano.js — Virtueel piano keyboard component
class Piano {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.startNote = options.startNote || 'C3';
        this.endNote = options.endNote || 'C5';
        this.showLabels = options.showLabels !== false;
        this.onKeyPress = options.onKeyPress || null;
        this.synth = null;
        this.keys = [];
        this.keyElements = {};
        this.initSynth();
        this.buildKeys();
        this.render();
    }

    initSynth() {
        this.synth = new Tone.PolySynth(Tone.Synth, {
            oscillator: { type: 'triangle8' },
            envelope: {
                attack: 0.005,
                decay: 0.3,
                sustain: 0.4,
                release: 1.2
            },
            volume: -8
        }).toDestination();
    }

    buildKeys() {
        const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const startIdx = this.noteToMidi(this.startNote);
        const endIdx = this.noteToMidi(this.endNote);

        for (let midi = startIdx; midi <= endIdx; midi++) {
            const octave = Math.floor(midi / 12) - 1;
            const noteIdx = midi % 12;
            const noteName = noteNames[noteIdx];
            const fullName = noteName + octave;
            const isBlack = noteName.includes('#');

            this.keys.push({
                note: fullName,
                midi: midi,
                isBlack: isBlack,
                label: this.getNoteLabel(noteName)
            });
        }
    }

    getNoteLabel(noteName) {
        const labels = {
            'C': 'Do', 'D': 'Re', 'E': 'Mi', 'F': 'Fa',
            'G': 'Sol', 'A': 'La', 'B': 'Si',
            'C#': 'Do#', 'D#': 'Re#', 'F#': 'Fa#', 'G#': 'Sol#', 'A#': 'La#'
        };
        return labels[noteName] || noteName;
    }

    noteToMidi(note) {
        const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const match = note.match(/^([A-G]#?)(\d)$/);
        if (!match) return 60;
        const [, name, octave] = match;
        return (parseInt(octave) + 1) * 12 + noteNames.indexOf(name);
    }

    render() {
        if (!this.container) return;
        const pianoEl = document.createElement('div');
        pianoEl.className = 'piano';

        this.keys.forEach(key => {
            const keyEl = document.createElement('div');
            keyEl.className = `piano-key ${key.isBlack ? 'black' : 'white'}`;
            keyEl.dataset.note = key.note;

            if (this.showLabels) {
                keyEl.textContent = key.isBlack ? key.note.replace(/\d/, '') : key.note.replace(/\d/, '');
            }

            const playNote = (e) => {
                e.preventDefault();
                this.playNote(key.note);
                if (this.onKeyPress) this.onKeyPress(key.note);
            };

            keyEl.addEventListener('pointerdown', playNote);

            this.keyElements[key.note] = keyEl;
            pianoEl.appendChild(keyEl);
        });

        this.container.innerHTML = '';
        this.container.appendChild(pianoEl);
    }

    async playNote(note, duration = '8n') {
        await Tone.start();
        this.synth.triggerAttackRelease(note, duration);

        const el = this.keyElements[note];
        if (el) {
            el.classList.add('active');
            setTimeout(() => el.classList.remove('active'), 200);
        }
    }

    highlightKey(note, className = 'highlight') {
        this.clearHighlights(className);
        const el = this.keyElements[note];
        if (el) el.classList.add(className);
    }

    highlightKeys(notes, className = 'highlight') {
        this.clearHighlights(className);
        notes.forEach(note => {
            const el = this.keyElements[note];
            if (el) el.classList.add(className);
        });
    }

    clearHighlights(className = 'highlight') {
        Object.values(this.keyElements).forEach(el => {
            el.classList.remove(className);
        });
    }

    clearAllStates() {
        Object.values(this.keyElements).forEach(el => {
            el.classList.remove('highlight', 'correct', 'wrong', 'active');
        });
    }

    flashKey(note, className, duration = 800) {
        const el = this.keyElements[note];
        if (el) {
            el.classList.add(className);
            setTimeout(() => el.classList.remove(className), duration);
        }
    }

    destroy() {
        if (this.synth) {
            this.synth.dispose();
        }
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}
