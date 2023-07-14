import {BrowserRouter, Route, Routes} from "react-router-dom";
import Users from "./components/Users.jsx";
import UserDetails from "./components/UserDetails.jsx";
import './App.css'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Users/>}/>
                <Route path='/users/add' element={<UserDetails/>}/>
                <Route path='/users/:userId' element={<UserDetails/>}/>
            </Routes>
        </BrowserRouter>
    )
}