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

async function fetchVocabulary() {
    try {
        console.log('Starting data fetch...');
        // Using GitHub Pages URL
        const response = await fetch('/data/words.json');
        
        console.log('Response:', response);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const words = await response.json();
        console.log('Fetched vocabulary data:', words);
        return words;
    } catch (error) {
        console.error('Error fetching vocabulary:', error);
        console.error('Full error:', error.message);
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
