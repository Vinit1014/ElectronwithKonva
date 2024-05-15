// index.js

// const { ipcRenderer } = require('electron'); // Import ipcRenderer from Electron

// // Your existing code...
// document.addEventListener("DOMContentLoaded", function () {
//     const stage = new Konva.Stage({
//         container: "konva-holder",
//         width: window.innerWidth * 0.6,
//         height: window.innerHeight,
//     });

//     const layer = new Konva.Layer();
//     stage.add(layer);

//     let currentShape = null;
//     let rect, circle;

//     function createRect() {
//         rect = new Konva.Rect({
//             x: 50,
//             y: 50,
//             width: 100,
//             height: 50,
//             fill: "blue",
//             draggable: true,
//         });

//         rect.on("click", function () {
//             document.getElementById("shapeName").innerText = "Rectangle";
//         });
//         currentShape = rect;

//         layer.add(rect);
//         stage.draw();
//         console.log(currentShape);
//         console.log(rect);
//     }
    
//     function createCircle() {
//         circle = new Konva.Circle({
//             x: 50,
//             y: 200,
//             radius: 50,
//             fill: "blue",
//             draggable: true,
//         });
        
//         circle.on("click", function () {
//             document.getElementById("shapeName").innerText = "Circle";
//         });
        
//         currentShape = circle;
//         layer.add(circle);
//         stage.draw();
//         console.log(currentShape);
//         console.log(circle);
//     }

//     document.getElementById("rectangleBtn").addEventListener("click", createRect);
//     document.getElementById("circleBtn").addEventListener("click", createCircle);

//     document.getElementById("strokeBtn").addEventListener("click", function () {
//         if (currentShape) {
//             currentShape.stroke("red");
//             currentShape.strokeWidth(20);
//             layer.batchDraw();
//         }
//     });

//     document.getElementById("opacityBtn").addEventListener("click", function () {
//         if (currentShape) {
//             currentShape.opacity(0.5);
//             layer.batchDraw();
//         }
//     });

//     document.getElementById("increaseSizeBtn").addEventListener("click", function () {
//         if (currentShape) {
//             currentShape.width(currentShape.width() * 1.1);
//             currentShape.height(currentShape.height() * 1.1);
//             layer.batchDraw();
//         }
//     });
    
//     document.getElementById("decreaseSizeBtn").addEventListener("click", function () {
//         if (currentShape) {
//             currentShape.width(currentShape.width() * 0.9);
//             currentShape.height(currentShape.height() * 0.9);
//             layer.batchDraw();
//         }
//     });
// });


// index.js

const { ipcRenderer } = require('electron');

document.addEventListener("DOMContentLoaded", function () {
    const stage = new Konva.Stage({
        container: "konva-holder",
        width: window.innerWidth * 0.6,
        height: window.innerHeight,
    });

    const layer = new Konva.Layer();
    stage.add(layer);

    let currentShape = null;
    let rect, circle;

    function createRect() {
        rect = new Konva.Rect({
            x: 50,
            y: 50,
            width: 100,
            height: 50,
            fill: "blue",
            draggable: true,
        });

        rect.on("click", function () {
            document.getElementById("shapeName").innerText = "Rectangle";
            ipcRenderer.send('button-clicked', 'Rectangle'); // Send message to main process
        });
        currentShape = rect;

        layer.add(rect);
        stage.draw();
        console.log(currentShape);
        console.log(rect);
    }
    
    function createCircle() {
        circle = new Konva.Circle({
            x: 50,
            y: 200,
            radius: 50,
            fill: "blue",
            draggable: true,
        });
        
        circle.on("click", function () {
            document.getElementById("shapeName").innerText = "Circle";
            ipcRenderer.send('button-clicked', 'Circle'); // Send message to main process
        });
        
        currentShape = circle;
        layer.add(circle);
        stage.draw();
        console.log(currentShape);
        console.log(circle);
    }

    document.getElementById("rectangleBtn").addEventListener("click", createRect);
    document.getElementById("circleBtn").addEventListener("click", createCircle);

    document.getElementById("strokeBtn").addEventListener("click", function () {
        if (currentShape) {
            currentShape.stroke("red");
            currentShape.strokeWidth(10);
            layer.batchDraw();
        }
    });

    document.getElementById("opacityBtn").addEventListener("click", function () {
        if (currentShape) {
            currentShape.opacity(0.5);
            layer.batchDraw();
        }
    });

    document.getElementById("increaseSizeBtn").addEventListener("click", function () {
        if (currentShape) {
            currentShape.width(currentShape.width() * 1.1);
            currentShape.height(currentShape.height() * 1.1);
            layer.batchDraw();
        }
    });
    
    document.getElementById("decreaseSizeBtn").addEventListener("click", function () {
        if (currentShape) {
            currentShape.width(currentShape.width() * 0.9);
            currentShape.height(currentShape.height() * 0.9);
            layer.batchDraw();
        }
    });

    document.getElementById("increaseStrokeBtn").addEventListener("click", function () {
        if (currentShape) {
            let currentStrokeWidth = currentShape.strokeWidth() || 0;
            currentShape.strokeWidth(currentStrokeWidth + 1);
            layer.batchDraw();
        }
    });

    document.getElementById("decreaseStrokeBtn").addEventListener("click", function () {
        if (currentShape) {
            let currentStrokeWidth = currentShape.strokeWidth() || 0;
            currentShape.strokeWidth(Math.max(0, currentStrokeWidth - 1)); // Ensure stroke width doesn't go below 0
            layer.batchDraw();
        }
    });

    // Listen for responses from the main process
    ipcRenderer.on('button-response', (event, arg) => {
        console.log(`Main process response: ${arg}`);
        // You can update the UI or perform other actions based on the response
    });
});
