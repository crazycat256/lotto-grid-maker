
// Grid: 1200x522
//

const gridPerSheetElement = document.getElementById("grid-per-page");
const compressionLevelElement = document.getElementById("compression-level");

const minMarginBase = 50;
const gridWidth = 675;
const gridHeight = 292;

const formats = {
    "1": {
        width: 841,
        height: 594,
    },
    "2": {
        width: 1189,
        height: 841,
    },
    "3": {
        width: 841,
        height: 1189,
    },
    "5": {
        width: 1261,
        height: 1783,
    },
    "6": {
        width: 1783,
        height: 1261,
    },
    "12": {
        width: 2378,
        height: 1682,
    },
    "14": {
        width: 1682,
        height: 2378,
    },
}


async function createGridPDF() {
    
    const jsPDF = window.jspdf.jsPDF;
    const pdfSize = formats[gridPerSheetElement.value];
    const pdf = new jsPDF({
        orientation: pdfSize.width > pdfSize.height ? "landscape" : "portrait",
        unit: "px",
        format: [pdfSize.width, pdfSize.height],
    });

    const minMargin = 150 * (Math.max(pdfSize.width, pdfSize.height) / 1189);

    const rows = Math.floor((pdfSize.height - minMargin) / gridHeight);
    const columns = Math.floor((pdfSize.width - minMargin) / gridWidth);
    const horizontalMarginSize = (pdfSize.width - columns * gridWidth) / (columns + 1);
    const verticalMarginSize = (pdfSize.height - rows * gridHeight) / (rows + 1);
    const sheetCount = Math.ceil(gridCountElement.value / (rows * columns));
    let remainingGrids = gridCountElement.value;

    for (let i = 0; i < sheetCount; i++) {

        if (i > 0) {
            pdf.addPage();
        }

        loop:
        for (let j = 0; j < rows; j++) {
            for (let k = 0; k < columns; k++) {

                if (remainingGrids === 0) {
                    break loop;
                }
                outputMessageElement.innerText = `${getTranslation("generating")} ${gridCountElement.value - remainingGrids + 1}/${gridCountElement.value}`;
                remainingGrids--;

                const x = k * gridWidth + (k + 1) * horizontalMarginSize;
                const y = j * gridHeight + (j + 1) * verticalMarginSize;

                const grid = genRandomGrid();
                const gridImg = drawGrid(grid);

                pdf.addImage(gridImg, "JPEG", x, y, gridWidth, gridHeight, undefined, compressionLevelElement.value);
                await waitForNextFrame();
            }
        }
    }

    pdf.save(`grids-${gridCountElement.value}.pdf`);
}



