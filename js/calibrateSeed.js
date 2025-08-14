document.getElementById('calibrateForm').addEventListener('submit', function handleSubmit(event){
    event.preventDefault()
    
    const btn = document.getElementById('btnSave')
    btn.disabled = true

    const motora = parseInt(document.getElementById('motora').value)
    const movida = parseInt(document.getElementById('movida').value)
    const realValue = parseFloat(document.getElementById('realSeed').value)
    const holes = parseInt(document.getElementById('holes').value)
    const seedsPerHole = parseInt(document.getElementById('seedsPerHole').value)
    const tableValue = findSeedPerGear(motora, movida, holes, seedsPerHole)
    
    const error = realValue / tableValue

    localStorage.setItem('seedError', error)

    alert('Calibragem feita com sucesso!')
    document.getElementById('calibrateForm').reset()
    btn.disabled = false
})
