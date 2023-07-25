// extract HTML element from DOM
const canvas = document.getElementById("canvas");
const body = document.querySelector("body");

// height and width of the canva
canvas.height = window.innerHeight
canvas.width = window.innerWidth

let theColor = '';
let lineW = 5;
let prevX = null
let prevY = null
let draw = false

 var theInput = document.getElementById("favcolor");

// Add event listener to change the background color of canva
theInput.addEventListener("input", function(){
  theColor = theInput.value;
  body.style.backgroundColor = theColor;
}, false);

const ctx = canvas.getContext("2d");
ctx.lineWidth = lineW;

//  To change the width of the drawing line and number from bottom as well
document.getElementById("ageInputId").oninput = function(){
  draw = null;
  lineW = document.getElementById("ageInputId").value;
  document.getElementById("ageOutputId").innerHTML = lineW;
  ctx.lineWidth = lineW;
};

// If clicked on one of the color circle it will draw in selected color
let colors = document.querySelectorAll(".clr");
colors = Array.from(colors);
colors.forEach(clr => {
  clr.addEventListener("click", () => {
    ctx.strokeStyle = clr.dataset.clr;
  })
})

// If clicked on clear button it will clear the canva
let clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
});

// If clicked on save button it will download the drawed canva 
//as an image/png with the name of drawing.png
let saveBtn = document.querySelector(".save");
saveBtn.addEventListener("click", () => {
  let data = canvas.toDataURL("image/png");
  let a = document.createElement("a");
  a.href = data;
  a.download = "drawing.png";
  a.click();
})


// Add event listener when click to draw
window.addEventListener("mousedown", (e) => draw = true);
// Add event listener when mouse its up to dont draw
window.addEventListener("mouseup", (e) => draw = false);
// Add event listener when mouse its moving 
window.addEventListener("mousemove", (e) => {
  if(prevX == null || prevY == null || !draw){
    prevX = e.clientX;
    prevY = e.clientY;
    return
  }

  let currentX = e.clientX;
  let currentY = e.clientY;

  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(currentX, currentY);
  ctx.stroke();

  prevX = currentX;
  prevY = currentY;
})





