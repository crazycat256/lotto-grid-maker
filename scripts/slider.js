const entry = document.getElementById("grid-count");
const slider = document.getElementById("grid-count-slider");

slider.addEventListener("input", function() {
    this.style.setProperty("--value", `${this.value}%`);
    entry.value = this.value;
});

entry.addEventListener("input", function() {
    slider.value = this.value;
    slider.style.setProperty("--value", `${slider.value}%`);
});

entry.addEventListener("blur", () => {
    if (entry.value < 1) {
        entry.value = 1;
        document.getElementById("grid-count-slider").value = 1;
    }
});