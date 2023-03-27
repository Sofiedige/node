import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import {Container} from "react-bootstrap";
import {Route, Routes} from 'react-router-dom'
import Home from './Pages/Home';
import {Checkout} from "./Pages/Checkout"

export default function App() {
    return (
        <Container>
            <Routes>
                <Route path = "/" element={<Home/>} />
                <Route path = "/Checkout" element={<Checkout/>} />
            </Routes>
        </Container>
    )
}
