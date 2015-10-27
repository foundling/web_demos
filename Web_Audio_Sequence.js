/*
 *
 * Create a new Audio Context
 *
 */

var ctx = new AudioContext();

/*
 * Create a Note Constructor with start, stop methods
 */

var Note = function(frequency, audioGraph) {

    // initial values
    this.frequency = frequency;
    this.initialVolume = 0.5;

    // processing chain
    this.initAudio = audioGraph || this.defaultAudioGraph;


};

Note.prototype.defaultAudioGraph = function(time) {

    this.osc = ctx.createOscillator();
    this.osc.frequency.value = this.frequency;

    this.gainNode = ctx.createGain();
    this.gainNode.gain.value = this.initialVolume;
    
    this.osc.connect(this.gainNode);
    this.gainNode.connect(ctx.destination);

    this.osc.start(time);
}

Note.prototype.start = function(time) {
   this.initAudio(time || 0); 
}

Note.prototype.stop = function(time) {
    this.osc.stop(time || ctx.currentTime);
}


/*
 * 
 * Create a Sequencer
 *
 */

var sequence = [];
var freq;
for (var i = 0; i < 8; i++) {
    freq = 440 + i*(440/12);
    sequence[i] = new Note(freq);
}

var Sequencer = function(sequence) {

    this.sequence = sequence;
    this.tempo = 60/120;
};

Sequencer.prototype.playSequence = function() {

    var startTime = ctx.currentTime;
    for (var i = 0; i < sequence.length; i++) {
        this.playFor(sequence[i], startTime + this.tempo * i, this.tempo);
    };

};

Sequencer.prototype.playFor = function(note, startTime, duration) {
    note.start(startTime); 
    note.stop(startTime + duration);
};

var sequencer = new Sequencer(sequence);
