import { jsPDF } from "jspdf";

const downloadBtn = document.getElementById("download-btn");

const englishInput = document.getElementById("english-input");
const morseOutput = document.getElementById("morse-output");

downloadBtn.addEventListener("click", () => {

    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Morse Studio", 20, 20);

    doc.setFontSize(12);

    doc.text("English", 20, 40);

    doc.setFont("courier", "normal");

    doc.text(
        englishInput.value || "-",
        20,
        50,
        { maxWidth: 170 }
    );

    doc.setFont("helvetica", "bold");

    doc.text("Morse Code", 20, 90);

    doc.setFont("courier", "normal");

    doc.text(
        morseOutput.value || "-",
        20,
        100,
        { maxWidth: 170 }
    );

    doc.save("morse-translation.pdf");

});