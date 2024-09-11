const formatElement = document.getElementById("format");
const gridCountElement = document.getElementById("grid-count");
const generateButton = document.getElementById("generate-button");

const outputDivElement = document.getElementById("output-div");
const loadingElement = document.getElementById("loading");
const outputMessageElement = document.getElementById("output-message");



generateButton.addEventListener("click", async () => {
    generateButton.disabled = true;
    outputDivElement.classList.remove("hidden");
    loadingElement.classList.remove("hidden");

    if (gridCountElement.value < 1) {
        outputMessageElement.innerText = getTranslation("negative-grid-count");
        generateButton.disabled = false;
        loadingElement.classList.add("hidden");
        return;
    }


    if (formatElement.value === "PDF") {
        await createGridPDF();
    } else {
        await createGridZip();
    }
    generateButton.disabled = false;
    loadingElement.classList.add("hidden");

    outputMessageElement.innerText = getTranslation("file-ready");
});

document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();
    document.activeElement.blur();
});



function waitForNextFrame() {
    return new Promise((resolve) => setTimeout(resolve, 0));
}
