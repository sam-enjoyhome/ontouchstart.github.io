function repl(el) {
  var input = document.createElement('input');
  input.style.width = "90%";
  input.style.margin = "auto";
  input.style.display = "block";

  var output = document.createElement('pre');
  output.style.width = "90%";
  output.style.margin = "auto";

  input.onchange = function () { 
    try { 
      output.innerText += eval(input.value) + '\n';
    } catch (e) { 
      alert('Error: ' + e.message); 
    } 
    input.value = ''; 
  };
  el.appendChild(input);
  el.appendChild(output);
}
