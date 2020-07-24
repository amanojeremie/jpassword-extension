import React from 'react';
import TextBox from './form/TextBox';
import endpoints from '../endpoints';
import fetch_json from '../js/fetch_json';

/**
 * Component for logging in or creating a new user
 */
class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            endpoint: '',
            // The API endpoint set by the user to point to their JPassword instance
            setEndpoint: '',
            username: '',
            setUsername: '',
            password: '',
            setPassword: '',
            error: ''
        }
    }

    handleInputChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
    }
    
    /**
     * Test the endpoint to check whether it is an endpoint for JPassword
     */
    handleEndpointSubmit = (event) => {
        fetch(this.state.endpoint)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                if(json && json.success === true) {
                    this.setState({
                        error: '',
                        setEndpoint: this.state.endpoint
                    })
                }
            })
            .catch((e) => {
                this.setState({
                    error: 'Error connecting to endpoint'
                });
            });
    }
    
    /**
     * Create a new User, "Sign-Up"
     */
    handleCreate = (event) => {
        console.log(this.state.setEndpoint + endpoints.CREATE);
        fetch_json(this.state.setEndpoint + endpoints.CREATE, {
            username: this.state.username,
            password: this.state.password
        }).then((json) => {
            if(json && json.credentials) {
                this.props.handleLogin(this.state.endpoint,
                    this.state.username,
                    this.state.password,
                    json.credentials);
            }
        }).catch((e) => {
            this.setState({
                error: 'Error creating user; Username may already exist'
            });
        });
    }

    /**
     * Attempt to login using the credentials provided
     */
    handleLogin = (event) => {
        fetch_json(this.state.setEndpoint + endpoints.LOGIN, {
            username: this.state.username,
            password: this.state.password
        }).then((json) => {
            if(json && json.credentials) {
                this.props.handleLogin(this.state.endpoint,
                    this.state.username,
                    this.state.password,
                    json.credentials);
            }
        }).catch((e) => {
            this.setState({
                error: 'Invalid Username or Password'
            });
        });
    }

    render() {
        const content = this.state.setEndpoint === '' ? 
            <div>
                <TextBox 
                    name='endpoint'
                    value={this.state.endpoint}
                    placeholder='JPassword URL'
                    onChange={this.handleInputChange} />
                <div>
                    <button onClick={this.handleEndpointSubmit}>Connect</button>
                </div>
            </div>
        :
            <div>
                <TextBox
                    name='username'
                    value={this.state.username}
                    placeholder='Username'
                    onChange={this.handleInputChange} />
                <TextBox
                    name='password'
                    value={this.state.password}
                    placeholder='Password'
                    password={true}
                    onChange={this.handleInputChange} />
                <div>
                    <button onClick={this.handleCreate}>Sign Up</button>
                    <button onClick={this.handleLogin}>Login</button>
                </div>
            </div>

        return (
            <div>
                {content}
                <div style={{color: 'red'}}>
                    {this.state.error}
                </div>
            </div>
        );
    }
}

export default Login;