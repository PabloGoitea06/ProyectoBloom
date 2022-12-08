document.getElementById("formulario").onsubmit = function(e) {
    e.preventDefault();
    const subject = document.getElementById("subject").value
    const body = document.getElementById("areadetexto").value

    window.open('mailto:pablogoitea@hotmail.com?subject='+ subject +'&body='+body );
}