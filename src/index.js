const canvas = document.querySelector('#my-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.rect(20, 20, 150, 100);
ctx.fill();
