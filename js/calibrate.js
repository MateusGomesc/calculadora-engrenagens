const queryString = window.location.search
const response = new URLSearchParams(queryString)
const params = Object.fromEntries(response.entries())

document.getElementById('title').innerHTML = params.id == 1 ? 'Calibragem de Semente' : 'Calibragem de Adubo'
