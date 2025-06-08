console.log("Let's wirte JavaScript for it.")
// This will be used to play the current song.
let currentSong = new Audio();
// This function will fetch the list of songs from the server.
async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/")
    let response = await a.text();
    // console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")

    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            // songs.push(element.href)
            songs.push(element.href.split("/songs/")[1])
        }
    }
    // console.log(songs)
    return songs
}

// This function will play the music.
/**
 * Plays the music track.
 * @param {string} track - The name of the track to play.
 */
const playMusic = (track, pause= false)=>{
    // let audio = new Audio("/songs/" +track)
    currentSong.src = "/songs/" +track
    if(!pause){
        currentSong.play()
        play.src = "/SvgImages/pauseButton.svg"
    }
    document.querySelector(".songInfo").innerHTML = decodeURI(track)
    document.querySelector(".songTime").innerHTML = "00:00 / 00:00"
    // document.querySelector(".songTime").innerHTML = currentSong.duration
}

// This function is to show time duration in this formate (00:00) by taking seconds.
function secondsToMinutesSeconds(seconds){
    if(isNaN(seconds) || seconds < 0){
        // return "Invalid input";
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function main() {

    // Get the list of all songs.
    let songs = await getSongs()

    playMusic(songs[0], true)

    for (let index = 0; index < songs.length; index++) {
        console.log(`Song ${index + 1}: ${songs[index]}`);
    }

    // // Play this first song.
    // var audio = new Audio(songs[2]);
    // audio.play();

    // audio.addEventListener("loadeddata", () => {
    //     let duration = audio.duration;
    //     // this duration variable holds the duration of audio clip (in seconds).
    //     console.log(audio.duration, audio.currentSrc, audio.currentTime)
    // });

    // Show all songs in the song list.
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
                <img width="18" src="/SvgImages/music.svg" alt="musicImage">
                <div class="info">
                    <div>${song.replaceAll("%20", " ")}</div>
                    <div>Ritik Babu</div>
                </div>
                <div class="playNow">
                    <span>Play Now</span>
                    <img width="28" src="SvgImages/playButton.svg" alt="playButtonImage">
                </div>
            </li>`;
    }

    // Attach an eventlistener to each event.
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        console.log(e)
        // console.log(e.querySelector(".info").firstElementChild.innerHTML)
        e.addEventListener("click", element=>{
            // This line of code will print current clicked song name.
            // console.log(e.querySelector(".info").firstElementChild.innerHTML)
            e.style.backgroundColor = "#121212";
            setTimeout(() => {
                e.style.backgroundColor = "#1f1f1f";
            }, 500);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })

    // Attach an event listener to play, next and previous buttons.
    play.addEventListener("click", ()=>{
        if(currentSong.paused){
            currentSong.play()
            play.src = "/SvgImages/playButton.svg"
        }else{
            currentSong.pause()
            play.src = "/SvgImages/pauseButton.svg"
        }
    })

    // Listen for time update event.
    currentSong.addEventListener("timeupdate", ()=>{
        console.log(currentSong.currentTime, currentSong.duration)
        document.querySelector(".songTime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`

        // coding for seekBar
        document.querySelector(".circle").style.left = ((currentSong.currentTime / currentSong.duration) * 100) + "%";
    })

    // aad an eventListener to seekBar.
    document.querySelector(".seekBar").addEventListener("click", e=>{
        // console.log(e.offsetX, e.offsetY)
        // console.log(e.target.getBoundingClientRect().width, e.offsetX)
        let percent = ((e.offsetX / e.target.getBoundingClientRect().width) * 100);
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (((currentSong.duration) * percent) / 100)

    })

    // Add an event listener for hamburger Menu.
    document.querySelector(".hamburger").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = "0"
    })

    // Add an event listener for close button.
    document.querySelector(".closeButton").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = "-120%"
    })


}

main()


