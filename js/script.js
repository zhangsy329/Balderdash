class VocabularyGame {
    constructor(data) {
        this.data = data;
        this.currentIndex = 0;
        this.scores = {};
        this.playerCount = 5;
        this.setupEventListeners();
        this.displayCard();
        this.createPlayerButtons();
    }

    displayCard() {
        const container = document.getElementById('card-container');
        const currentWord = this.data[this.currentIndex];
        
        container.innerHTML = `
            <div class="card">
                <div class="card-inner">
                    <div class="card-front">
                        <h2>${currentWord.word}</h2>
                    </div>
                    <div class="card-back">
                        <p class="meaning">${currentWord.meaning}</p>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('difficulty-text').textContent = currentWord.difficulty;
        document.getElementById('suggestion-text').textContent = currentWord.suggestion;

        const card = container.querySelector('.card');
        if (card) {
            card.addEventListener('click', () => this.flipCard());
        }

        document.getElementById('progress-text').textContent = `${this.currentIndex + 1}/${this.data.length}`;
    }

    flipCard() {
        const card = document.querySelector('.card');
        if (card) {
            card.classList.toggle('flipped');
        }
    }

    nextCard() {
        if (this.currentIndex < this.data.length - 1) {
            this.currentIndex++;
            this.displayCard();
        }
    }

    prevCard() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.displayCard();
        }
    }

    createPlayerButtons() {
        const container = document.getElementById('players-buttons');
        container.innerHTML = '';
        
        for (let i = 1; i <= this.playerCount; i++) {
            const button = document.createElement('button');
            button.textContent = `玩家 ${i}`;
            button.className = 'player-button';
            button.addEventListener('click', () => this.addScore(i));
            container.appendChild(button);
            
            // Initialize score for this player
            if (!this.scores[i]) {
                this.scores[i] = 0;
            }
        }
        
        this.updateScoresDisplay();
    }

    addScore(playerNumber) {
        this.scores[playerNumber] = (this.scores[playerNumber] || 0) + 1;
        this.updateScoresDisplay();
        this.nextCard();
    }

    updateScoresDisplay() {
        const container = document.getElementById('scores-display');
        container.innerHTML = '<h3>得分:</h3>';
        
        for (let player in this.scores) {
            container.innerHTML += `<p>玩家 ${player}: ${this.scores[player]}</p>`;
        }
    }

    setupEventListeners() {
        document.getElementById('prev-btn').addEventListener('click', () => this.prevCard());
        document.getElementById('know-btn').addEventListener('click', () => this.nextCard());
        
        document.getElementById('updatePlayers').addEventListener('click', () => {
            const input = document.getElementById('playerCount');
            const newCount = parseInt(input.value);
            if (newCount >= 2 && newCount <= 10) {
                this.playerCount = newCount;
                this.scores = {};  // Reset scores
                this.createPlayerButtons();
            }
        });
    }
}
