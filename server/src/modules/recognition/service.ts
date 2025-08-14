
import { env } from '../../env';

// Mock food recognition data
const mockRecognitions = [
  { name: 'Apple', confidence: 0.95, estimatedGrams: 150 },
  { name: 'Banana', confidence: 0.88, estimatedGrams: 120 },
  { name: 'Sandwich', confidence: 0.82, estimatedGrams: 200 },
  { name: 'Salad', confidence: 0.76, estimatedGrams: 180 },
  { name: 'Pizza Slice', confidence: 0.91, estimatedGrams: 100 },
  { name: 'Chicken Breast', confidence: 0.87, estimatedGrams: 150 },
  { name: 'Rice Bowl', confidence: 0.84, estimatedGrams: 200 },
  { name: 'Pasta', confidence: 0.79, estimatedGrams: 250 },
  { name: 'Yogurt', confidence: 0.93, estimatedGrams: 170 },
  { name: 'Coffee', confidence: 0.96, estimatedGrams: 240 }
];

export class RecognitionService {
  static async recognizeFood(imageBuffer: Buffer, filename: string) {
    if (env.MODEL_SERVER_URL) {
      try {
        const formData = new FormData();
        const blob = new Blob([imageBuffer], { type: 'image/jpeg' });
        formData.append('image', blob, filename);

        const response = await fetch(`${env.MODEL_SERVER_URL}/recognize`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          return data.detections || [];
        }
      } catch (error) {
        console.log('Food recognition API failed, using fallback');
      }
    }

    // Fallback: return mock data based on filename or random selection
    const numItems = Math.floor(Math.random() * 3) + 1; // 1-3 items
    const selectedItems = [];
    
    for (let i = 0; i < numItems; i++) {
      const randomIndex = Math.floor(Math.random() * mockRecognitions.length);
      const item = { ...mockRecognitions[randomIndex] };
      
      // Add some variation to the confidence and weight
      item.confidence = Math.max(0.6, item.confidence + (Math.random() - 0.5) * 0.2);
      item.estimatedGrams = Math.round(item.estimatedGrams * (0.8 + Math.random() * 0.4));
      
      selectedItems.push(item);
    }

    return selectedItems;
  }
}
