import { BrowserRouter, Route, Routes} from 'react-router-dom'
import ProtectedRoute from '../src/Components/ProtectedRoute'
import Register from "../src/Components/Register"
import Transition from "../src/Components/Transition"
import AddTransition from "../src/Components/AddTransition"
import Login from "../src/Components/Login"

const App = ()=><div>
    <BrowserRouter>
    <Routes>
    <Route  path = "/login" element= {<Login/>}/> 
      <Route  path = "/" element= {<ProtectedRoute><Transition/></ProtectedRoute>} />
      <Route path = "/addtransition" element= {<ProtectedRoute><AddTransition/></ProtectedRoute>}/>
      <Route path = "/register" element ={<ProtectedRoute><Register/></ProtectedRoute>}/>
    </Routes>
    </BrowserRouter>
</div>

export default App