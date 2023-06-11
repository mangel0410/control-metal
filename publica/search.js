function buscar() { 
    let inputext= document.getElementById("search").value.toString().toLowerCase();
    let tablebody=document.getElementById("tbody");
    let tablerows=tablebody.getElementsByTagName("tr");
    for(let i= 0; i < tablerows.length; i++){
      let textconsulta = tablerows[i].cells[3].textContent.toString().toLowerCase();
      if (textconsulta.indexOf(inputext)===-1) {
        tablerows[i].style.visibility="collapse"
      }
      else{
        tablerows[i].style.visibility=""
      }
    }
  };
