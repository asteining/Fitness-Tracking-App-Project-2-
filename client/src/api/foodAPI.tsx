import axios from 'axios';
import Auth from '../utils/auth';

/**
 * Search for a food by FDC ID.
 * @param query - The FDC ID of the food item to search for.
 * @returns The food data from the backend.
 */
export const searchFood = async (query: string) => {
  try {
    // Make a GET request to search for food by FDC ID
    const response = await axios.get(`/api/food/${query}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken() || ''}`, // Ensure token is included
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching food:', error);
    // Throw a user-friendly error message
    throw new Error('Failed to fetch food. Please try again later.');
  }
};

/**
 * Delete a food item by its ID.
 * @param id - The ID of the food item to delete.
 */
export const deleteFood = async (id: string) => {
  try {
    // Make a DELETE request to remove the food item
    await axios.delete(`/api/food/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken() || ''}`, // Ensure token is included
      },
    });
  } catch (error) {
    console.error('Error deleting food:', error);
    // Throw a user-friendly error message
    throw new Error('Failed to delete food. Please try again later.');
  }
};
