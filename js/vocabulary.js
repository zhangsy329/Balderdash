// Default vocabulary data as fallback
const defaultVocabularyData = [
    {
        word: "一蘭拉麵",
        category: "日本餐厅",
        meaning: "日本著名拉面连锁店",
        suggestion: "可以谈谈独特的点单方式和隔板设计",
        difficulty: "简单"
    }
];

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function fetchVocabulary() {
    try {
        console.log('Starting data fetch...');
        const response = await fetch('https://zhangsy329.github.io/Balderdash/data/words.json');
        
        console.log('Response:', response);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const words = await response.json();
        
        // Shuffle the words array
        const shuffledWords = shuffleArray(words);
        console.log('Fetched and shuffled vocabulary data:', shuffledWords);
        return shuffledWords;
    } catch (error) {
        console.error('Error fetching vocabulary:', error);
        return defaultVocabularyData;
    }
}

// Initialize game with words
async function initializeGame() {
    const words = await fetchVocabulary();
    if (words && words.length > 0) {
        window.vocabularyData = words;
        const game = new VocabularyGame(words);
    } else {
        window.vocabularyData = defaultVocabularyData;
        const game = new VocabularyGame(defaultVocabularyData);
    }
}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', initializeGame);
