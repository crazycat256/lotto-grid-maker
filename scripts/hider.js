
const formatSelect = document.getElementById("format");
const elementsToHide = document.querySelectorAll(".pdf-only");


function updateVisibility() {
    const isPdf = formatSelect.value === "PDF";
    elementsToHide.forEach(element => {
        if (isPdf) {
            element.classList.remove("hidden");
        } else {
            element.classList.add("hidden");
        }
    });
}


formatSelect.addEventListener("input", updateVisibility);
updateVisibility();