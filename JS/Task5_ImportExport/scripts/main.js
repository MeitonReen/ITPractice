import {Game} from "./game.js"; 

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const maxWidth = canvas.width = window.innerWidth;
const maxHeight = canvas.height = window.innerHeight;

const winBack = document.querySelector(".win-back");
const winButton = document.querySelector(".win-button");

function win(winBack) {
  winBack.style.visibility = "visible";
}

let game = new Game(ctx, maxWidth, maxHeight, 25, () => win(winBack));

winButton.addEventListener("click", () => {
  winBack.style.visibility = "hidden";
  game.start();
});

game.start();



