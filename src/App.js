import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Login from './Login';
import Register from './Register';
import { BrowserRouter as Router, Route, Switch ,Redirect} from "react-router-dom";
import Forgot from './Forgot';
import Table from './Table';
import Add from './Add'
import Edit from './Edit';
import Menu from './Menu';
import User from './User'
import L from './L'
import Profile from './Profile';
import Logout from './Logout';
const currentUserSubject = localStorage.getItem('token');

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      currentUserSubject ? (
        <Component {...props} />
      ) : (
        <Redirect
          from=''
          to={{
            pathname: "/"
          }}
          noThrow
        />
      )
    }
  />
);

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      currentUserSubject === null ? (
        <Component {...props} />
      ) : (
        <Redirect
          from=''
          to={{
            pathname: "/Table"
          }}
          noThrow
        />
      )
    }
  />
);
function App() {
  return (
    <div className="App">
      <Router>
        {/* <L/> */}
        <Menu/>
        <Switch>
          {/* <Route exact path='/' component={Login}/> */}
          <PublicRoute exact path="/" component={Login} />
          <PublicRoute  path="/Register" component={Register} />
          <PublicRoute  path="/forget" component={Forgot} />
          <PrivateRoute exact path="/Logout" component={Logout} />
           <PrivateRoute path="/Table" component={Table} />
          <PrivateRoute  path="/add" component={Add} />
          <PrivateRoute  path="/User" component={User} />
          <PrivateRoute  path="/Profile" component={Profile} />
          {/* <PrivateRoute  path="/Logout" component={Logout} /> */}
          {/* <PrivateRoute exact path="/" component={Login} /> */}

          {/* <Route exact  path='/Register' component={Register}/> */}
          {/* <Route exact  path='/forget' component={Forgot}/> */}
          {/* <Route exact  path='/Table' component={Table}/> */}
          {/* <Route exact  path='/add' component={Add}/> */}
           {/* <Route exact  path='/e/:id' component={Edit}/>  */}
          {/* <Route exact  path='/User' component={User}/> */}
          {/* <Route exact  path='/User' component={Material}/> */}
          {/* <Route exact  path='/Profile' component={Profile}/>  */}
          {/* <Route exact  path='/Logout' component={Logout}/>  */}


        </Switch>
      </Router>
    </div>
  );
}

export default App;
