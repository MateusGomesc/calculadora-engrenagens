const findGearsPerSeed = (holes, seedsPerHoles, seeds) => {

  const alloptions = seedsTable.flatMap(combinations =>
    combinations.distribuicao.map(dist => ({
      motora: combinations.motora,
      movida: combinations.movida,
      furos: dist.furos,
      sementesPorFuro: dist.sementesPorFuro,
      sementesMetro: dist.sementesMetro
    }))
  )

  const optionsWithHole = alloptions.filter(option => option.furos == holes && option.sementesPorFuro == seedsPerHoles)
  
  if(optionsWithHole.kength === 0){
    return {
      melhorOpcao: null,
      opcaoAbaixo: null,
      opcaoAcima: null
    }
  }

  const beforeOptions = optionsWithHole.filter(option => option.sementesMetro <= seeds).sort((a, b) => b.sementesMetro - a.sementesMetro)
  const afterOptions = optionsWithHole.filter(option => option.sementesMetro >= seeds).sort((a, b) => a.sementesMetro - b.sementesMetro)
  optionsWithHole.forEach(option => {
    option.diferenca = Math.abs(option.sementesMetro - seeds)
  })
  const bestOption = optionsWithHole.sort((a, b) => a.diferenca - b.diferenca)

  return{
    melhorOpcao: bestOption[0] || null,
    opcaoAbaixo: (beforeOptions[0] == bestOption[0] ? beforeOptions[1] : beforeOptions[0]) || null,
    opcaoAcima: (afterOptions[0] == bestOption[0] ? afterOptions[1] : afterOptions[0]) || null
  }
}

const form = document.getElementById('calculateForm')
form.addEventListener('submit', (event) => {
  event.preventDefault()

  const btn = document.getElementById('btnSave')
  btn.disabled = true

  const error = parseFloat(localStorage.getItem('seedError'))
  const seeds = parseFloat(document.getElementById('seedsPerMeter').value)
  const holes = parseInt(document.getElementById('hole').value)
  const seedsPerHoles = parseInt(document.getElementById('quantPerHole').value)

  const correctSeed = seeds / error

  const res = findGearsPerSeed(holes, seedsPerHoles, correctSeed)

  const container = document.getElementById('resultContainer')
  container.innerHTML = ''
  document.getElementById("settingValue").innerHTML = "Valor ajustado: " + correctSeed.toFixed(2) + " p/ metro linear"

  let spanAfter = document.createElement('span')
  spanAfter.innerHTML = '⬆️ ' + res.opcaoAcima.motora + ' x ' + res.opcaoAcima.movida + " (" + res.opcaoAcima.sementesMetro + ")"
  
  let spanBest = document.createElement('span')
  spanBest.innerHTML = '⭐ ' + res.melhorOpcao.motora + ' x ' + res.melhorOpcao.movida + " (" + res.melhorOpcao.sementesMetro + ")"
  
  let spanBefore = document.createElement('span')
  spanBefore.innerHTML = '⬇️ ' + res.opcaoAbaixo.motora + ' x ' + res.opcaoAbaixo.movida + " (" + res.opcaoAbaixo.sementesMetro + ")"

  container.appendChild(spanAfter)
  container.appendChild(spanBest)
  container.appendChild(spanBefore)

  form.reset()
  btn.disabled = false

  container.scrollIntoView({
    behavior: 'smooth'
  })
})
