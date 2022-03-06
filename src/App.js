import './App.css';
import { Route, Switch } from 'react-router';
import Home from './container/Home';
import Signin from './container/Signin';
import Signup from './container/Signup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { isUserLoggeIn } from './action';
import { PrivateRoute } from './components/PrivateRoute';
import Products from './container/Products';
import Category from './container/Category';
import Newpage from './container/NewPage';

function App() {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    useEffect(() => {
      if(!auth.authenticate){
        dispatch(isUserLoggeIn())
      }
    }, [])

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/page" component={Newpage} />
        <PrivateRoute path="/products"component={Products} />
        <PrivateRoute path="/category" component={Category} />


        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} /> 
      </Switch>
    </div>
  );
}

export default App;
