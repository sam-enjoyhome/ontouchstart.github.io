function repl(el) {
  var input = document.createElement('input');
  input.style.width = "90%";
  input.style.margin = "auto";
  input.style.display = "block";

  var output = document.createElement('pre');
  output.style.width = "90%";
  output.style.margin = "auto";

  console.log = function (message) {
    output.innerText += message + '\n';
  }

  input.onchange = function () { 
    try { 
      eval(input.value); 
    } catch (e) { 
      alert('Error: ' + e.message); 
    } 
    input.value = ''; 
  };
  el.appendChild(input);
  el.appendChild(output);
}
