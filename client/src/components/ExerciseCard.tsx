import { Link } from "react-router-dom";
import {ApiMessage } from '../interfaces/ApiMessage'
import { MouseEventHandler } from "react";

interface ExerciseCardProps {
  id: number | null,
  name: string | null,
  deleteIndvExercise: (ticketId: number) => Promise<ApiMessage>
}

const ExerciseCard = ({id, name, deleteIndvExercise}:ExerciseCardProps) => {

  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const exerciseId = Number(event.currentTarget.value);
    if (!isNaN(exerciseId)) {
      try {
        const data = await deleteIndvExercise(exerciseId);
        return data;
      } catch (error) {
        console.error('Failed to delete ticket:', error);
      }
    }
  };

  return (
    <div className='v-card'>
      <h3>Exercise ID: {id} </h3>
      <h4>Exercise Name: {name}</h4>
      <button>
        <Link to="/edit-exercise" state={{id: id}}>Edit</Link>
      </button>
      <button value={String(id)} onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ExerciseCard;