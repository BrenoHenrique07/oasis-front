import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Paciente from './pages/Paciente';
import Frequencias from './pages/Frequencias';

function App(){
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/pacientes' element={<Paciente/>}></Route>
                    <Route path="/frequencias/:pacienteId" element={<Frequencias/>} />
                </Routes>
            </BrowserRouter>
            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
        </div>
    )
}

export default App;