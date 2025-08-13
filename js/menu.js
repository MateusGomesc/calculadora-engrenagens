const queryString = window.location.search
const response = new URLSearchParams(queryString)
const params = Object.fromEntries(response.entries())

document.getElementById('title').innerHTML = params.id == 1 ? 'Semente' : 'Adubo'
document.getElementById('btnSeed').href = 'calibrate.html?id=' + params.id
document.getElementById('btnFert').href = 'calculate.html?id=' + params.id
document.title = params.id == 1 ? 'Semente' : 'Adubo'