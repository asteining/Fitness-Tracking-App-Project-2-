import { Outlet } from 'react-router-dom';
import FoodPage from './pages/FoodPage';

import Navbar from './components/Navbar';
import ExercisePage from './pages/ExercisePage';

function App() {
  return (
    <div>
      <Navbar />
      <FoodPage />
      <ExercisePage />
      <main className='container pt-5'>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
