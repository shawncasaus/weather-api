const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#messageUn');
const messageTwo = document.querySelector('#messageDeux');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Chargement...';
    messageTwo.textContent = '';

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                messageOne.textContent = data.error;
            } else {
                console.log(data);
                messageOne.textContent = '';
                // messageTwo.textContent = "La Météo en " + data.location + " est de " + data.forcast.summary + ".";
                messageTwo.innerHTML = "<p>La Météo en " + data.location + " est de " + data.forcast.summary + " et la température est de " + data.forcast.temperature + " C°.</p>"
                + "<a href=\"/weather/get-json\" target=\"_blank\" ><button class=\"jsonButton\">Voir l'Objet</button></a>"
            }
        });
    });
});