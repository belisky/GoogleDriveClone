import Register from "./Pages/Register/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { AuthProvider } from "./Helper/AuthContext";
import { BrowerRouter as Router, Switch,Route } from 'react-router-dom'


function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Dashboard}/>
          <Route path="/signup" component={Register} />
        </Switch>
     </AuthProvider>
    </Router>
  );
}

export default App;
