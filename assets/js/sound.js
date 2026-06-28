const AudioContext = window.AudioContext || window.webkitAudioContext;

const context = new AudioContext();

const DOT = 120;
const DASH = DOT * 3;

function beep(duration) {

    return new Promise(resolve => {

        const oscillator = context.createOscillator();
        const gain = context.createGain();

        oscillator.connect(gain);
        gain.connect(context.destination);

        oscillator.frequency.value = 650;

        gain.gain.value = 0.12;

        oscillator.start();

        setTimeout(() => {

            oscillator.stop();

            resolve();

        }, duration);

    });

}

function sleep(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));

}

export async function playMorse(morse) {

    if (!morse) return;

    if (context.state === "suspended") {

        await context.resume();

    }

    for (const symbol of morse) {

        if (symbol === ".") {

            await beep(DOT);

            await sleep(DOT);

        }

        else if (symbol === "-") {

            await beep(DASH);

            await sleep(DOT);

        }

        else if (symbol === " ") {

            await sleep(DOT * 3);

        }

        else if (symbol === "/") {

            await sleep(DOT * 7);

        }

    }

}