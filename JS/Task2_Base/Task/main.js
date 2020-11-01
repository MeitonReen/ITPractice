var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');
var imagesSrcs = ["images/pic1.jpg", "images/pic2.jpg", "images/pic3.jpg", "images/pic4.jpg", "images/pic5.jpg"];

var btn = document.querySelector('button');
var overlay = document.querySelector('.overlay');

imagesSrcs.forEach((imgSrcItem) => {
  var newImage = document.createElement('img');
  newImage.src = imgSrcItem;

  thumbBar.appendChild(newImage);
})

displayedImage.src = imagesSrcs[0];

thumbBar.addEventListener("click", (e) => {
  displayedImage.src = e.target.src;
});

btn.addEventListener("click", () => {
  if (overlay.style.visibility === "visible")
  {
    overlay.style.visibility = "hidden";
  } else
  {
    overlay.style.visibility = "visible";
  }
});