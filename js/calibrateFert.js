document.getElementById('calibrateForm').addEventListener('submit', function handleSubmit(event){
    event.preventDefault()
    
    const btn = document.getElementById('btnSave')
    btn.disabled = true

    const motora = parseInt(document.getElementById('motora').value)
    const movida = parseInt(document.getElementById('movida').value)
    const realValue = parseInt(document.getElementById('realFert').value)
    const space = parseInt(document.getElementById('space').value)
    const spring = parseInt(document.getElementById('spring').value)
    const tableValue = findFertPerGear(motora, movida, space, spring)
    
    const error = realValue / tableValue

    if(spring == 2){
        localStorage.setItem('fertErrorStandard', error)
    }
    else if(spring == 1){
        localStorage.setItem('fertErrorOptional', error)
    }

    alert('Calibragem feita com sucesso!')
    document.getElementById('calibrateForm').reset()
    btn.disabled = false
})
