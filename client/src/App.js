import {BrowserRouter as Router} from "react-router-dom";
import AppRouter from "./router/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {check} from "./http/userAPI";
import Loader from "./components/UI/Loader";

const App = observer(() => {
  const {user} = useContext(Context)
  const [isLoading, setLoading ] = useState(true)

  useEffect(() => {
    check().then(data => {
      user.setIsAuth(true)
      user.setUser(data)
    }).finally(() => setLoading(false))
  }, [])

  if (isLoading) {
    return <Loader/>
  }

  return (
    <Router>
      <NavBar/>
      <AppRouter/>
    </Router>
  );
})

export default App;
