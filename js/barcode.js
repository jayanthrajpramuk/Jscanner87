
var _scannerIsRunning = false;

function startScanner() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#scanner-container'),
            constraints: {
                width: 640,
                height: 480,
                facingMode: "environment"
            },
        },
        decoder: {
            readers: [
                "code_128_reader",
                "code_39_reader"
            ],
            debug: {
                showCanvas: true,
                showPatches: true,
                showFoundPatches: true,
                showSkeleton: true,
                showLabels: true,
                showPatchLabels: true,
                showRemainingPatchLabels: true,
                boxFromPatches: {
                    showTransformed: true,
                    showTransformedBox: true,
                    showBB: true
                }
            }
        },

    }, function (err) {
        if (err) {
            alert("Error is", err);
            return
        }

        console.log("Initialization finished. Ready to start");
        Quagga.start();

        // Set flag to is running
        _scannerIsRunning = true;
    });

    Quagga.onProcessed(function (result) {
        var drawingCtx = Quagga.canvas.ctx.overlay,
            drawingCanvas = Quagga.canvas.dom.overlay;

        /*drawingCtx.beginPath();
        drawingCtx.lineWidth = "6";
        drawingCtx.strokeStyle = "red";
        drawingCtx.rect(5, 5, 290, 140);
        drawingCtx.stroke();

// Green rectangle
        drawingCtx.beginPath();
        drawingCtx.lineWidth = "4";
        drawingCtx.strokeStyle = "green";
        drawingCtx.rect(30, 30, 50, 50);
        drawingCtx.stroke();
*/
// Blue rectangle
        drawingCtx.beginPath();
        drawingCtx.lineWidth = "1";
        drawingCtx.strokeStyle = "blue";
        drawingCtx.rect(95, 190, 515, 115);
        drawingCtx.stroke()

      /*  drawingCtx.moveTo(40, 40);
        drawingCtx.lineTo(1000, 0);
        drawingCtx.stroke();*/

       /* var rectXPos = 50;
        var rectYPos = 50;
        var rectWidth = 100;
        var rectHeight = 100;

        drawBorder(rectXPos, rectYPos, rectWidth, rectHeight)

       /!* drawingCtx.fillStyle='#FFF';*!/
        drawingCtx.fillRect(rectXPos, rectYPos, rectWidth, rectHeight);

        function drawBorder(xPos, yPos, width, height, thickness = 1)
        {
          /!*  drawingCtx.fillStyle='#000';*!/
            drawingCtx.fillRect(xPos - (thickness), yPos - (thickness), width + (thickness * 2), height + (thickness * 2));
        }

*/
        if (result) {
            if (result.boxes) {
                drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")),
                    parseInt(drawingCanvas.getAttribute("height")));
                result.boxes.filter(function (box) {
                    return box !== result.box;
                })/*.forEach(function (box) {
                        Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
                    });*/
            }

            if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#bebfbc", lineWidth: 1 });
            }

            /* if (result.codeResult && result.codeResult.code) {
                 Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 1 });
             }*/
        }
    });


    Quagga.onDetected(function (result) {
        alert(result.codeResult.code);
        console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
    });
}


// Start/stop scanner
document.getElementById("btn").addEventListener("click", function () {
    if (_scannerIsRunning) {
        Quagga.stop();
        _scannerIsRunning = false;
    } else {
        startScanner();
    }
}, false);
