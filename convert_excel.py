import pandas as pd
import json

def convert_csv_to_json():
    try:
        # Read CSV file
        df = pd.read_csv('data/maindata.csv')
        
        # Print column names to verify
        print("Available columns:", df.columns.tolist())
        
        # Convert to list of dictionaries
        words = []
        for _, row in df.iterrows():
            word = {
                "word": str(row['名词']),
                "category": str(row['子类别']),
                "meaning": str(row['解释']),
                "suggestion": str(row['瞎掰建议']),
                "difficulty": str(row['难度'])
            }
            words.append(word)

        # Save as JSON
        with open('data/words.json', 'w', encoding='utf-8') as f:
            json.dump(words, f, ensure_ascii=False, indent=2)
            
        print(f"Successfully converted {len(words)} words to JSON")
        
    except Exception as e:
        print(f"Error during conversion: {e}")

if __name__ == "__main__":
    convert_csv_to_json()
    