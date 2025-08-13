const queryString = window.location.search
const response = new URLSearchParams(queryString)
const params = Object.fromEntries(response.entries())

titles = {
    1: 'Calibragem de Semente',
    2: 'Calibragem de Adubos'
}

document.getElementById('title').innerHTML = titles[params.id] || ''
