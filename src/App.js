import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { AuthProvider } from "./Helper/AuthContext";
import { BrowerRouter as Router, Switch,Route } from 'react-router-dom'
import PrivateRoute from './Components/PrivateRoute/PrivateRoute'


function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard}/>
          <Route path="/signup" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
     </AuthProvider>
    </Router>
  );
}

export default App;
