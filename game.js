const params = new URLSearchParams(location.search);
const gameId = params.get("id");

fetch("games.json")
    .then(r => r.json())
    .then(games => {
        const game = games.find(g => g.id === gameId);

        // Main game details
        document.getElementById("game-title").innerText = game.title;
        document.getElementById("game-category").innerText = game.category;
        document.getElementById("game-description").innerText = game.description;
        document.getElementById("game-instructions").innerText = game.instructions;
        document.getElementById("game-tags").innerText = game.tags;
        document.getElementById("game-icon").src = game.thumb;

        const iframe = document.getElementById("game-frame");
        iframe.src = game.url;
        iframe.style.height = (game.height || 600) + "px";
        iframe.style.width  = "100%";

        loadLikes(gameId);
        loadRecommended(games, gameId);
    });

function loadRecommended(games, excludeId) {
    const list = document.getElementById("rec-list");

    games
        .filter(g => g.id !== excludeId)
        .forEach(g => {
            const div = document.createElement("div");
            div.className = "rec-card";

            div.innerHTML = `
                <img src="${g.thumb}">
                <div class="rec-title">${g.title}</div>
            `;

            div.onclick = () => { location.href = `game.html?id=${g.id}`; };

            list.appendChild(div);
        });
}

// ---- Likes / Dislikes ----
function loadLikes(id) {
    const likeBtn = document.querySelector(".like-btn");
    const dislikeBtn = document.querySelector(".dislike-btn");

    const saved = localStorage.getItem("rating_" + id);

    if (saved === "like") likeBtn.classList.add("active");
    if (saved === "dislike") dislikeBtn.classList.add("active");

    likeBtn.onclick = () => setRating(id, "like");
    dislikeBtn.onclick = () => setRating(id, "dislike");
}

function setRating(id, status) {
    localStorage.setItem("rating_" + id, status);

    document.querySelector(".like-btn").classList.toggle("active", status === "like");
    document.querySelector(".dislike-btn").classList.toggle("active", status === "dislike");
}
