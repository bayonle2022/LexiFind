const search = document.querySelector("#search");
const searchBtn = document.querySelector("#search-icon");
const results = document.querySelector("#result");
const meaning = document.querySelector("#meaning1");
const meaning2 = document.querySelector("#meaning2");
const meaning3 = document.querySelector("#meaning3");
const figureOfSpeech = document.querySelector("#figure-Of-Speech");
const phonetic = document.querySelector("#phonetic");
const definition = document.querySelector(".defi");
const list = document.querySelector("li");
const synonyms = document.querySelector("#synonyms");
const playAudioBtn = document.querySelector(".play-audio");
let audio = null;




const searchWords = async function(){
    try{
        const word = search.value;
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
         results.textContent = data[0].word;
         definition.classList.remove("defi");
        
        meaning.textContent = data[0].meanings[0].definitions[0].definition;
        meaning2.textContent = data[0].meanings[0].definitions[1].definition;
        meaning3.textContent = data[0].meanings[0].definitions[2].definition;
        phonetic.textContent = data[0].phonetics[0].text;
        playAudioBtn.classList.remove("play-audio");
        playAudioBtn.style.width = "40px";
        playAudioBtn.style.height = "40px";
        playAudioBtn.style.borderRadius = "50%";
        playAudioBtn.style.margin =" 20px 0px 20px 0px";
        // Get audio URL
const audioUrl = data[0].phonetics.find(p => p.audio)?.audio;

if (audioUrl) {
    audio = new Audio(audioUrl);
   
} else {
    audio = null;
   
}


     

    } catch (error) {
        console.error(error);
        results.innerHTML = "An error occurred while fetching the data.";
    }
}
searchBtn.addEventListener("click", searchWords);
search.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchWords();
    }
});
playAudioBtn.addEventListener("click", function () {
    if (audio) {
        audio.play();
    }
});


const toggleBtn = document.getElementById("mode-toggle");

toggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        toggleBtn.textContent = "☀️";
    } else {
        toggleBtn.textContent = "🌙";
    }

    // Save preference
    localStorage.setItem("mode", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

// Load mode on startup
window.addEventListener("DOMContentLoaded", () => {
    const savedMode = localStorage.getItem("mode");
    if (savedMode === "dark") {
        document.body.classList.add("dark-mode");
        toggleBtn.textContent = "☀️";
    } else {
        toggleBtn.textContent = "🌙";
    }
});
