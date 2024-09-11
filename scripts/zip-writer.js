

async function createGridZip() {
    const zip = new JSZip();
    
    for (let i = 0; i < gridCountElement.value; i++) {
        const grid = genRandomGrid();
        const gridImg = drawGrid(grid);

        zip.file(`grid-${i + 1}.png`, gridImg.split("base64,")[1], { base64: true });

        outputMessageElement.innerText = `${getTranslation("generating")} ${i + 1}/${gridCountElement.value}`;

        await waitForNextFrame();
    }

    const content = await zip.generateAsync({ type: "blob" });

    
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "grids.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}