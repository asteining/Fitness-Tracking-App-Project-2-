import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config

const api_key = 'fOL9TmHn6ShQscBanrO1tUo7szJWSufyu1VszmXY';

export const searchFood = async (fdcid: number) => {
  try {
    // Make a GET request to search for food by FDC ID
    const response = await axios.get(`https://api.nal.usda.gov/fdc/v1/food/${fdcid}?api_key=${api_key}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching food:', error);
    // Throw a user-friendly error message
    throw new Error('Failed to fetch food. Please try again later.');
  }
};



