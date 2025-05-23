import axios from 'axios';

interface MaterialGenerationFormData {
  topic: string;
  level: string;
  interests: string[];
}

export const generateMaterial = async (data: MaterialGenerationFormData, token: string) => {
  try {
    const response = await axios.post<string>(
      'http://localhost:8080/api/materiais/',
      data,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const text = response.data;
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const sentences = lines.map(line => line.replace(/^[0-9]+\.\s*/, '').trim());
    return sentences;
  } catch (error) {
    console.error('Error generating material:', error);
    throw error;
  }
};
