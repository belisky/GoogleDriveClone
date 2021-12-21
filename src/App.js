import {
  Login,
  Profile,
  Register,
  ForgotPassword,
  UpdateProfile
} from './Pages/Authentication' 
import Dashboard from './Pages/google-drive/Dashboard'
import AuthProvider from "./Helper/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
 import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

function App() {

  return (
    <AuthProvider>     
      <Router>
        <Routes>
          <Route exact path="/" element={<PrivateRoute>
            <Dashboard />
          </PrivateRoute>} />
          {/*Profile */}
          <Route   path="/user" element={<PrivateRoute>
            <Profile />
          </PrivateRoute>} />
          <Route   path="/update-profile" element={<PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>} />


          {/*Auth */}
          <Route path="/signup" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
