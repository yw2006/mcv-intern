let quote = document.getElementById("quote");
let btn = document.getElementById("btn");
// Array of quotes
let quotes = [
  "The best way to get started is to quit talking and begin doing.",
  "Don't let yesterday take up too much of today.",
  "It's not whether you get knocked down, it's whether you get up.",
  "If you are working on something exciting, it will keep you motivated.",
  "Success is not in what you have, but who you are."
];
btn.addEventListener("click", () => {
    let randomIndex = Math.floor(Math.random() * quotes.length);
  quote.innerText = quotes[randomIndex];
});