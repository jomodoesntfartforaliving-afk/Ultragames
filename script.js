fetch("games.json")
    .then(r => r.json())
    .then(games => {
        const grid = document.getElementById("game-grid");

        games.forEach(g => {
            const card = document.createElement("div");
            card.className = "game-card";

            card.innerHTML = `
                <img src="${g.icon}">
                <div class="game-card-title">${g.title}</div>
            `;

            card.onclick = () => {
                location.href = `game.html?id=${g.id}`;
            };

            grid.appendChild(card);
        });
    });
