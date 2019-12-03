// URLs
const API_ENDPOINT = "http://localhost:3000"
const URL_COMPOSITIONS = `${API_ENDPOINT}/compositions`
const URL_SOUNDS = `${API_ENDPOINT}/sounds`

// DOM ELEMENTS
const soundContainer = document.querySelector("#sound-container")
const soundList = document.querySelector("#sound-list")
const compositionList = document.querySelector("#composition-list")
const compSoundContainer = document.querySelector("#composition-sound-container")
const compForm = document.querySelector(".form")


// EVENT LISTENERS
compForm.addEventListener("submit", (event) => {
    submitHandler(event)
})

// EVENT HANDLER
const addHandler = (event, sound) => {
    renderSoundCard(sound)
}

const delCompHandler = (event, composition) => {
    console.log('delete')
    //renderSoundCard(sound)
}

const loadCompHandler = (event, composition) =>{
    renderCompositionSounds(composition.sounds)
}

const submitHandler = (event) => {
    event.preventDefault()
    const name = compForm.querySelector("input[name=name]")
    const soundCardNodes = compSoundContainer.childNodes
    let soundCards = []

    for(let i = 1; i < soundCardNodes.length; i++) {
        soundCards[i] = soundCardNodes[i]
        // console.log(soundCardNodes[i])
    }

    const data = []

    soundCards.forEach((soundCard) => {
        data << extractData(soundCard)
    })
    
    createComposition(data)
}


// API
const apiHeaders = {
    "Content-Type": "application/json",
    "Accept": "application/json"
}

const get = (url) => {
    return fetch(url)
        .then(response => response.json())
        //.then(json => console.log(json))
}

const post = (url, data) => {
    const confiObject = {
        method: "POST",
        headers: apiHeaders,
        body: JSON.stringify(data)
        }
    return fetch(url, confiObject)
        .then(response => response.json())
        //.then(json => console.log(json))
}

const patch = (instance_url, data) => {
    const confiObject = {
        method: "PATCH",
        headers: apiHeaders,
        body: JSON.stringify(data)
        }
    return fetch(instance_url,confiObject)
        .then(response => response.json())
        //.then(json => console.log(json))
}

const destroy = (instance_url) => {
    const configObject = {
        method: "DELETE"
      }
    return fetch(instance_url, configObject)
        .then(response => response.json())
        //.then(json => console.log(json))
}


//DATA HANDLING
//DATA FUNCTIONS

const extractData = (soundCard) => {
    const volume = soundCard.querySelector("audio").volume
    const id = parseInt(soundCard.id)
    console.log({id: id, volume: volume})
    return {id: id, volume: volume}
}

const getSounds = () => {
    let url = URL_SOUNDS
    return get(url)
}

const getCompositions = () => {
    let url = URL_COMPOSITIONS
    return get(url)
}

const createComposition = (data) => {
    console.log(data)
}

// SITE INITIALIZATION
getSounds().then(data => renderSoundList(data))
getCompositions().then(data => renderCompositionList(data))

// RENDER SOUNDS
const renderCompositionSounds = (soundArray) => {
    while (compSoundContainer.firstChild) compSoundContainer.removeChild(compSoundContainer.firstChild);
    return soundArray.forEach((sound) => {
        renderSoundCard(sound)
    })
}

const renderSoundList = (soundArray) => {
    // while (compSoundContainer.firstChild) compSoundContainer.removeChild(compSoundContainer.firstChild);
    return soundArray.forEach((sound) => {
        renderSoundElement(sound)
    })
}


const renderSoundElement = (sound) => {
    //console.log(sound)
    const li = document.createElement("li")
    li.innerText = sound.name

    const addBtn = document.createElement("button")
    addBtn.innerText = "+"
    addBtn.addEventListener("click", () => addHandler(event, sound))
    
    li.append(addBtn)
    soundList.append(li)
}

const renderSoundCard = (sound) => {
    const soundName = document.createElement("h2");
    soundName.innerText = sound.name;
    
    const soundDesc = document.createElement("p")
    soundDesc.innerText = sound.description

    const soundImg = document.createElement("img");
    soundImg.setAttribute("class", "sound-img");
    soundImg.src = sound.image_url;  

    const soundDiv = document.createElement("div");
    soundDiv.setAttribute("class", "sound-card");
    soundDiv.setAttribute("id", `${sound.id}`);
    soundDiv.append(soundName, soundDesc, soundImg, renderAudioPlayer(sound))
    compSoundContainer.append(soundDiv);
}


// renderCompositionSounds = (compositon) => {
//     sounds = []
//     sounds << composition.sounds
//     return sounds.forEach(sound =>{
//         renderSoundCard(sound)
//     })
// }

const renderCompositionList = (compositions) =>{
    // console.log(compositions)
        compositions.forEach(composition =>{
            renderComposition(composition)
        })

}

const renderComposition = (composition) => {
    // console.log(composition)
    
    const li = document.createElement("li")
    li.innerText = composition.name

    const loadBtn = document.createElement("button")
    loadBtn.innerText = "Load"
    loadBtn.addEventListener("click", () => loadCompHandler(event, composition))
    
    const delBtn = document.createElement("button")
    delBtn.innerText = "Delete"
    delBtn.addEventListener("click", () => delCompHandler(event, composition))


    li.append(loadBtn,delBtn)
    compositionList.append(li)
}

// RENDER AUDIO PLAYER
const renderAudioPlayer = (sound) => {
    const soundPlayer = document.createElement("audio")
    soundPlayer.src = sound.sound_url
    soundPlayer.className = "player"
    soundPlayer.setAttribute("controls", "")
    soundPlayer.setAttribute("controlsList", "nodownload")
    soundPlayer.setAttribute("loop", "")

    return soundPlayer
}

