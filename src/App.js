import React from 'react';
import './css/App.css';
import Login from './components/Login';
import Credentials from './components/Credentials';
import endpoints from './endpoints';
import fetch_json from './js/fetch_json';
import browser from 'webextension-polyfill';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            user: {
                endpoint: '',
                username: '',
                password: ''
            },
            credentials: []
        }
    }

    /**
     * Stores the login of the user of browser storage
     * @param {*} endpoint The API endpoint of JPassword
     * @param {*} username The user's username
     * @param {*} password The user's password
     * @param {*} credentials The credentials returned by JPassword
     */
    login = (endpoint, username, password, credentials) => {
        browser.storage.local.set({user: {
            endpoint: endpoint,
            username: username,
            password: password
        }});

        this.setState({
            loggedIn: true,
            user: {
                endpoint: endpoint,
                username: username,
                password: password,
            },
            credentials: credentials
        });
    }

    /**
     * Clears the browser storage of the logged in user
     */
    logout = () => {
        browser.storage.local.remove('user').then(() => {
            this.setState({
                loggedIn: false,
                user: {
                    endpoint: '',
                    username: '',
                    password: ''
                },
                credentials: []
            });
        });
    }

    componentDidMount() {
        browser.storage.local.get('user').then((userObj) => {
            console.log(userObj);
            if(userObj.user !== undefined) {
                const user = userObj.user;
                fetch_json(user.endpoint + endpoints.LOGIN, {
                    username: user.username,
                    password: user.password
                }).then((json) => {
                    if(json && json.credentials) {
                        this.login(user.endpoint,
                            user.username,
                            user.password,
                            json.credentials);
                    }
                });
            }
        });
    }

    refreshCredentials = (credentials) => {
        this.setState({credentials});
    }

    render() {
        const content = this.state.loggedIn ?
            <div>
                <button onClick={this.logout} style={{position: 'fixed', top: 0, right: 0}}>Log Out</button>
                <Credentials 
                    credentials={this.state.credentials}
                    user={this.state.user}
                    refreshCredentials={this.refreshCredentials}
                    />
            </div>
        :
            <Login
                handleLogin={this.login}
            />
            
        return (
            <div className="App">
                {content}
            </div>
        );
    }
}

export default App;
