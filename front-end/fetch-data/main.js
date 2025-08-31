
let con = document.getElementById("con");
let btn = document.getElementById("btn");
btn.onclick = ()=>{
    con.innerHTML = "";
fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response) => response.json())
  .then((response) => {
    for (let i = 0; i < 20; i++) {
      con.innerHTML += `<div class="d-flex justify-content-between m-2 w-100 shadow p-2 rounded">
  <span>${response[i].title}</span>
  <span class="rounded ${
    response[i].completed ? "bg-success" : "bg-warning"
  } p-1 text-light">${response[i].completed ? "completed" : "pending"}</span>
</div>`;
    }
  });
}

