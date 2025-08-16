const findGearsPerFert = (spring, space, fert) => {
    const table = spring == 2 ? fertTableStandard : fertTableOptional

    const spacesInTable = [...new Set(table.map(item => item.espacamento_mm))]

    const spaceProx = spacesInTable.reduce((prev, curr) => {
        return (Math.abs(curr - space) < Math.abs(prev - space) ? curr : prev)
    })

    const optionsInSpace = table.filter(line => line.espacamento_mm === spaceProx)

    if(optionsInSpace.length === 0){
        return {
            espacamentoUtilizado: spaceProx,
            melhorOpcao: null,
            opcaoAbaixo: null,
            opcaoAcima: null
        }
    }

    const beforeOption = optionsInSpace.filter(option => option.gramas_50m <= fert).sort((a, b) => b.gramas_50m - a.gramas_50m)
    const afterOption = optionsInSpace.filter(option => option.gramas_50m >= fert).sort((a, b) => a.gramas_50m - b.gramas_50m)
    optionsInSpace.forEach(option => {
        option.diferenca = Math.abs(option.gramas_50m - fert)
    })
    const bestOption = optionsInSpace.sort((a, b) => a.diferenca - b.diferenca)

    return{
        espacamentoUtilizado: spaceProx,
        melhorOpcao: bestOption[0] || null,
        opcaoAbaixo: (beforeOption[0] == bestOption[0] ? beforeOption[1] : beforeOption[0]) || null,
        opcaoAcima: (afterOption[0] == bestOption[0] ? afterOption[1] : afterOption[0]) || null
    }
}

const form = document.getElementById('calculateForm')
form.addEventListener('submit', (event) => {
    event.preventDefault()

    const btn = document.getElementById('btnSave')
    btn.disabled = true

    const spring = parseInt(document.getElementById("spring").value)
    const space = parseInt(document.getElementById("space").value)
    const fert = parseInt(document.getElementById("fertPerMeter").value)

    const error = spring == 2 ? parseFloat(localStorage.getItem("fertErrorStandard")) : parseFloat(localStorage.getItem("fertErrorOptional"))

    const correctFert = fert / error

    const res = findGearsPerFert(spring, space, correctFert)

    const container = document.getElementById('resultContainer')
    container.innerHTML = ''
    document.getElementById("settingValue").innerHTML = "Valor ajustado: " + correctFert.toFixed(2) + "g / 50m"
    document.getElementById("spaceProx").innerHTML = "Espaçamento ajustado: " + res.espacamentoUtilizado + " mm"

    let spanAfter = document.createElement('span')
    spanAfter.innerHTML = '⬆️ ' + res.opcaoAcima.motora + ' x ' + res.opcaoAcima.movida + ' (' + res.opcaoAcima.gramas_50m + 'g / 50m)'

    let spanBest = document.createElement('span')
    spanBest.innerHTML = '⭐ ' + res.melhorOpcao.motora + ' x ' + res.melhorOpcao.movida + ' (' + res.melhorOpcao.gramas_50m + 'g / 50m)'

    let spanBefore = document.createElement('span')
    spanBefore.innerHTML = '⬇️ ' + res.opcaoAbaixo.motora + ' x ' + res.opcaoAbaixo.movida + ' (' + res.opcaoAbaixo.gramas_50m + 'g / 50m)'

    container.appendChild(spanAfter)
    container.appendChild(spanBest)
    container.appendChild(spanBefore)

    form.reset()
    btn.disabled = false

    container.scrollIntoView({
    behavior: 'smooth'
    })
})
