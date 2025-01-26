import { ApiMessage } from "../interfaces/ApiMessage";
import { ExerciseData } from "../interfaces/ExerciseData";

const retrieveExercises = async () => {
  try {
    const response = await fetch('/api/exercises', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid exercise API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from data retrieval:', err);
    return [];
  }  
};

const retrieveExercise = async (id: number | null): Promise<ExerciseData> => {
  try {
    const response = await fetch(`/api/exercises/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();
    if(!response.ok) {
      throw new Error('invalid exercise API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from data retrieval:', err);
    return Promise.reject('Could not fetch exercise');
  }
};

const createExercise = async (body: ExerciseData): Promise<ExerciseData> => {
  try {
    const response = await fetch(
      '/api/exercises/', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(body)
      }

    )
    const data = response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;

  } catch (err) {
    console.log('Error from Exercise Creation: ', err);
    return Promise.reject('Could not create Exercise');
  }
};

const updateExercises = async (id: number, body: ExerciseData): Promise<ExerciseData> => {
  try {
    const response = await fetch(
      `/api/exercises/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }
    )
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.error('Update did not work', err);
    return Promise.reject('Update did not work');
  }
};

const deleteExercise = async (id: number): Promise<ApiMessage> => {
  try {
    const response = await fetch(
      `/api/exercises/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.error('Error in deleting exercise', err);
    return Promise.reject('Could not delete exercise');
  }
};

export { retrieveExercises, retrieveExercise, createExercise, updateExercises, deleteExercise };