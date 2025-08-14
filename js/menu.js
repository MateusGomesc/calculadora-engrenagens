const queryString = window.location.search
const response = new URLSearchParams(queryString)
const params = Object.fromEntries(response.entries())

document.getElementById('title').innerHTML = params.id == 1 ? 'Semente' : 'Adubo'
document.getElementById('btnSeed').href = params.id == 1 ? 'calibrateSeed.html' : 'calibrateFert.html'
document.getElementById('btnFert').href = params.id == 1 ? 'calculateSeed.html' : 'calculateFert.html'
document.title = params.id == 1 ? 'Semente' : 'Adubo'