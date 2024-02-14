const colours = ['green', 'red', 'yellow', 'blue'];
let trueSequence = [];
let sequence = [];
let status = 'fail';
let round = 0;

// plays audio from ../public/sound/
export function PlaySound(name) {
    var audio = new Audio(process.env.PUBLIC_URL + '/sound/' + name + '.mp3');
    audio.type = 'audio/mp3';
    audio.play()
};

// change the colour of the selected colour and append it to the user list
export function Select(colour) {   
    document.getElementById(colour).style.backgroundColor = '#9e9e9e';
    PlaySound(colour);
    sequence.push(colour);
    setTimeout (() => {
        document.getElementById(colour).style.backgroundColor = colour; 
    }, 100)
};

// choose a random colour to add onto the sequence
export function GenerateSequence() {
    round += 1;
    document.getElementById('level-title').innerHTML = (`Level ${round}`);

    let a = Math.floor(Math.random() * 4);
    trueSequence.push(colours[a]);
    let btnSelect = colours[a];
    document.getElementById(btnSelect).style.boxShadow = (`0px 0px 40px 20px ${btnSelect}`);
    setTimeout (() => {
        document.getElementById(btnSelect).style.boxShadow = ('none');
    }, 500);
};

// check if the user sequence is correct
export function CheckSequences(sequence, trueSequence) {
    var sequenceLength = sequence.length;
    let equals = (a, b) =>
        JSON.stringify(a) === JSON.stringify(b);
    if (equals(trueSequence.slice(0, sequenceLength), sequence)) {
        if (trueSequence.length === sequenceLength) {
            return 'round win';
        } else {
            return 'winning';
        };
    } else {
        return 'fail';
    };
};

// start the game by pressing any key
window.onkeypress = () => {
    if (status === 'fail') {
        GenerateSequence();
        status = 'winning';
    };
};

// the game itself
export default function Game(colour) {
    Select(colour);
    status = CheckSequences(sequence, trueSequence);
    if (status === 'fail') {
        // reset varaibles
        sequence = [];
        trueSequence = [];
        round = 0;

        PlaySound('wrong');
        document.getElementById('level-title').innerHTML = ('Game Over, Press Any Key to Restart');
        document.documentElement.style.setProperty('--background', '#ff0000');
        setTimeout (() => {
            document.documentElement.style.setProperty('--background', '#011F3F');
        }, 500)
    } else if (status === 'winning') {
        // do nothing since user needs to input more colours
    } else if (status === 'round win') {
        sequence = [];
        GenerateSequence();
    };
};