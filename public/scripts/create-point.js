
function PopulateUfs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then( states => {
        // console.log(states)
        states.forEach((state) => {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        })
        // for(const state in states){
        //     // console.log(state)
        //     ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        // }

    })
}

PopulateUfs()

function getCities(){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = ""
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json())
    .then( cities => {

        cities.forEach((city) => {
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        })
        // for(const city in cities){
        //     citySelect.innerHTML += `<option value="${city}">${city}</option>`
        // }

        citySelect.disabled = false

    })


}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event){
    console.log(event.target)
    const itemLi = event.target

    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // verificar se existem itens selecionados
    // se sim, pegá-los
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId // boolean
        return itemFound
    })

    //se já estiver selecionado,
    if(alreadySelected >= 0){
        //tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    }
    else {
        // se não estiver selecionado
        // adicionar a seleção
        selectedItems.push(itemId)
    }
    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems  
}