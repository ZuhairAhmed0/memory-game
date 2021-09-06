document
   .querySelector(".control-buttoms span")
   .addEventListener("click", function() {
      let yourName = prompt("What is Your Name?");
      document.querySelector(".name span").textContent =
         yourName || "Unknown";
      document.querySelector("#win").pause();
      this.parentElement.remove();
   });

let duration = 1000;

const blocksContainer = document.querySelector(".memory-game-blocks");
const blocks = Array.from(blocksContainer.children);

//let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());
shuffle(orderRange);

blocks.forEach((block, index) => {
   block.style.order = orderRange[index];

   block.addEventListener("click", function() {
      flipBlock(block);
   });
});

function flipBlock(selectedBlock) {
   selectedBlock.classList.add("is-flipped");

   let allFlippedBlocks = blocks.filter((flippedBlock) =>
      flippedBlock.classList.contains("is-flipped"),
   );

   if (allFlippedBlocks.length === 2) {
      stopClicking();
      checkMatheeBlock(allFlippedBlocks[0], allFlippedBlocks[1]);
   }
}

function checkMatheeBlock(firstBlock, secondBlock) {
   let triesElement = document.querySelector(".tries span");

   if (firstBlock.dataset.language === secondBlock.dataset.language) {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");

      firstBlock.classList.add("has-match");
      secondBlock.classList.add("has-match");
      document.querySelector("#success").play();
      setTimeout(() => {
         document.querySelector("#success").pause();
      }, duration);
      document.querySelector("#worng").pause();
   } else {
      triesElement.textContent++;
      setTimeout(() => {
         firstBlock.classList.remove("is-flipped");
         secondBlock.classList.remove("is-flipped");
         document.querySelector("#worng").pause();
      }, duration);
      document.querySelector("#success").pause();
      document.querySelector("#worng").play();
   }
}


window.onload = () => {document.querySelector('#win').play()};
function stopClicking() {
   blocksContainer.classList.add("no-clicking");

   setTimeout(() => {
      blocksContainer.classList.remove("no-clicking");
   }, duration);
}

function shuffle(array) {
   let current = array.length,
      temp,
      random;

   while (current > 0) {
      random = Math.floor(Math.random() * current);

      current--;

      temp = array[current];

      array[current] = array[random];
      9

      array[random] = temp;
   }
   return array;
}


// let timeOver = 20;
// 
// function times() {
   // let setTime = setInterval(() => {
      // timeOver--;
      // document.querySelector('.time-over span').textContent =
         // String(timeOver)
   // }, 1000);
// 
// }
// 
