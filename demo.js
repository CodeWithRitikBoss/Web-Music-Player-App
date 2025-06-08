// Function to repeat cards.
function repeatCards() {
    let card = document.querySelector(".cardContainer")
    console.log(card)
    for (let index = 0; index < 6; index++) {
        card.innerHTML = card.innerHTML + `<div class="card rounded">
                        <div class="playButton">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="#000000"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 20V4L19 12L5 20Z" stroke="#000000" stroke-width="1.8"
                                    stroke-linejoin="round" />
                            </svg>
                        </div>
                        <img class="roundedd" src="PlaylistImages/thumbnailImage${index+1}.jpeg" alt="Playlist Image 5">
                        <h2>Apna Bits</h2>
                        <p>Hits to boost your mood and fill you with happiness!</p>
                    </div>`
    }
}

repeatCards();
repeatCards();
repeatCards();
repeatCards();
repeatCards();
