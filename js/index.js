const findSeedPerGear = (motora, movida, hole, seedsPerHole) => {
    const perCombination = seedsTable.filter(line => line.motora == motora && line.movida == movida)
    const distribuiton = perCombination[0].distribuicao.filter(dis => dis.furos == hole && dis.sementesPorFuro == seedsPerHole)
    const seedPerMetter = distribuiton[0].sementesMetro
    return seedPerMetter
}

const findFertPerGear = (motora, movida, space, spring) => {
    if(spring == 2){
        const result = fertTableStandard.filter(line => line.motora == motora && line.movida == movida && line.espacamento_mm == space)
        return result[0].gramas_50m
    }
    else if(spring == 1){
        const result = fertTableOptional.filter(line => line.motora == motora && line.movida == movida && line.espacamento_mm == space)
        return result[0].gramas_50m
    }
}