function loadHTML(url, elementId) {
  fetch(url) //busca el archivo
    .then((response) => response.text()) //obtiente el html
    .then((data) => {
      document.getElementById(elementId).innerHTML = data; //devuelve lo q tenga en el html q se lo llame
    });
}

loadHTML("/components/header.html", "header");

loadHTML("/components/footer.html", "footer");
