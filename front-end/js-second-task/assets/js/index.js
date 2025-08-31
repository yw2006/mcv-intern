let rocket = document.getElementById("rocket");
let btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  rocket.classList.add("animation");
  setTimeout(()=>{
  rocket.classList.remove("animation");
  },2000)
});
