fetch("games.json")
    .then(r => r.json())
    .then(games => {
        // Trending = random
        createSection(games.sort(() => 0.5 - Math.random()).slice(0, 12), "trending");

        // Latest = highest ID
        const latest = [...games].sort((a, b) => Number(b.id) - Number(a.id));
        createSection(latest.slice(0, 12), "latest");

        // Popular = most liked (localStorage)
        const popular = games
            .map(g => {
                g.score = Number(localStorage.getItem("likes_" + g.id) || 0);
                return g;
            })
            .sort((a, b) => b.score - a.score);

        createSection(popular.slice(0, 12), "popular");
    });

function createSection(games, id) {
    const div = document.getElementById(id);
    games.forEach(g => {
        div.innerHTML += `
        <div class="game-card" onclick="location.href='game.html?id=${g.id}'">
            <img src="${g.thumb}">
            <p>${g.title}</p>
        </div>`;
    });
}
