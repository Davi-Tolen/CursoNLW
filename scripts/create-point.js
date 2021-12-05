
function PopulateUfs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then( states => {

        for(const state in states){
            ufSelect.innerHTML += `<option value="${state}">${state}</option>`
        }

    })
}

PopulateUfs()

function getCities(){
    const citySelect = document.querySelector("select[name=city]")
    const ufValue = event.target.value

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
    .then( res => res.json())
    .then( cities => {

        for(const city in cities){
            citySelect.innerHTML += `<option value="${city}">${city}</option>`
        }

        citySelect.disabled = false

    })


}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", () => {
        console.log("mudei")
    })