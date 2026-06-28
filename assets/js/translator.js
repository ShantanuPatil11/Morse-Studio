import morseMap from "../data/morse-map.js";
import { playMorse } from "./sound.js";

const englishInput = document.getElementById("english-input");
const morseOutput = document.getElementById("morse-output");

const translateBtn = document.getElementById("translate-btn");
const swapBtn = document.getElementById("swap-btn");
const clearBtn = document.getElementById("clear-btn");
const copyBtn = document.getElementById("copy-btn");
const playBtn = document.getElementById("play-btn");

const reverseMap = {};

for (const key in morseMap) {
    reverseMap[morseMap[key]] = key;
}

function encode(text){

    return text
        .toUpperCase()
        .split("")
        .map(char => morseMap[char] || "")
        .join(" ");

}

function decode(morse){

    return morse
        .trim()
        .split(" ")
        .map(code => reverseMap[code] || "")
        .join("")
        .replaceAll("/", " ");

}

translateBtn.addEventListener("click", ()=>{

    const english = englishInput.value.trim();

    const morse = morseOutput.value.trim();

    if(english){

        morseOutput.value = encode(english);

        return;

    }

    if(morse){

        englishInput.value = decode(morse);

    }

});

swapBtn.addEventListener("click", ()=>{

    const temp = englishInput.value;

    englishInput.value = morseOutput.value;

    morseOutput.value = temp;

});

clearBtn.addEventListener("click", ()=>{

    englishInput.value="";

    morseOutput.value="";

});

copyBtn.addEventListener("click", ()=>{

    navigator.clipboard.writeText(morseOutput.value);

});

playBtn.addEventListener("click", () => {

    playMorse(morseOutput.value);

});