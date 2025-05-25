// Default vocabulary data as fallback
const defaultVocabularyData = [
    {
        word: "一蘭拉麵",
        category: "日本餐厅",
        meaning: "日本著名拉面连锁店",
        suggestion: "独特的点单方式和隔板设计",
        difficulty: "简单"
    }
];

async function fetchVocabulary() {
    try {
        // Replace 'shuyazhang' with your actual GitHub username
        const response = await fetch('https://raw.githubusercontent.com/zhangsy329/Balderdash/main/data/words.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const words = await response.json();
        console.log('Fetched words:', words); // Debug log
        return words;
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
