import Register from "./Pages/Register/Register";
import {AuthProvider} from "./Helper/AuthContext"

function App() {
  return (
    <AuthProvider>
      <Register/>
     </AuthProvider>
  );
}

export default App;
