document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem('seedError') == null){
        localStorage.setItem('seedError', 1)
    }

    if(localStorage.getItem('fertErrorStandard') == null)
        localStorage.setItem('fertErrorStandard', 1)

    if(localStorage.getItem('fertErrorOptional') == null){
        localStorage.setItem('fertErrorOptional', 1)
    }
})