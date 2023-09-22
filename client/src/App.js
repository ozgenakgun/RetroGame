import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import ContactAdminPage from './pages/contactAdmin';
import LoginPage from './pages/login';
import MainPage from './pages/main';
import RegisterPage from './pages/register';
import SettingPage from './pages/setting';
import TaskListPage from './pages/taskList';
import TaskDetailPage from './pages/taskListDetail';
import WardrobePage from './pages/wardrobe';
import Alert from './pages/Alert';
import AdminPage from './pages/adminPage';
import AdminLogin from './pages/adminLogin';
import PrivateRoute from './pages/PrivateRoute';
import PrivateAdminRoute from './pages/PrivateAdminRoute';

//redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
    <Provider store={store}>
    <React.StrictMode>
        <BrowserRouter>
                <Alert />
                <Switch>
                    <Route exact path='/'>
                        <LoginPage />
                    </Route>
                    <Route path='/contactAdmin'>
                        <ContactAdminPage />
                    </Route>
                    <Route path='/register'>
                        <RegisterPage />
                    </Route>
                    <PrivateRoute path='/main' component={MainPage} />
                    <PrivateRoute path='/setting' component={SettingPage} />
                    <PrivateRoute path='/taskList' component={TaskListPage} />
                    <PrivateRoute path='/taskListDetail' component={TaskDetailPage} />
                    <PrivateRoute path='/wardrobe' component={WardrobePage} />
                    <Route path='/game'>
                        <Redirect push to={"questions.html"} />
                    </Route>
                    <PrivateAdminRoute path='/adminManage' component={AdminPage} />
                    <Route path='/adminLogin'>
                        <AdminLogin />
                    </Route>
                </Switch>
            </BrowserRouter>
    </React.StrictMode>
    </Provider>
    );
};

export default App;
