var gridContext;
var emptyGridImg;
var gridCanvas;
var emptySlotImg;

async function loadResources() {
    const font = new FontFace("ERASBD", "url(src/ERASBD.ttf)");
    const fontLoadPromise = font.load().then((loadedFace) => {
        document.fonts.add(loadedFace);
    });

    emptyGridImg = new Image();
    const emptyGridImgLoadPromise = new Promise((resolve) => {
        emptyGridImg.onload = resolve;
    });
    emptyGridImg.src = "src/empty-grid.png";

    emptySlotImg = new Image();
    const emptySlotImgLoadPromise = new Promise((resolve) => {
        emptySlotImg.onload = resolve;
    });
    emptySlotImg.src = "src/empty-slot.png";


    await Promise.all([fontLoadPromise, emptyGridImgLoadPromise, emptySlotImgLoadPromise]);

    gridCanvas = document.createElement("canvas");
    gridContext = gridCanvas.getContext("2d");

    gridCanvas.width = emptyGridImg.width;
    gridCanvas.height = emptyGridImg.height;

    gridContext.font = "90px ERASBD";
}

loadResources();


function drawGrid(grid) {
    gridContext.drawImage(emptyGridImg, 0, 0);

    for (let i = 0; i < 3; i++) {
    
        for (let j = 0; j < 9; j++) {
            if (grid[i][j]) {
                let x = j == 0 ? 55 : 157 + 128 * (j - 1);
                let y = 133 + 158 * i;
                gridContext.fillText(grid[i][j], x, y);
            } else {
                let x = 44 + 128 * j;
                let y = 147 + 158 * i;
                gridContext.drawImage(emptySlotImg, x + 5, y - 100);
            }
        }
    }

    return gridCanvas.toDataURL("image/png");
}
