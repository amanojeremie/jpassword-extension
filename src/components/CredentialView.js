import React from 'react';
import TextBox from './form/TextBox';
import endpoints from '../endpoints';
import fetch_json from '../js/fetch_json';

export default class CredentialView extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props.credential !== undefined ? {
            name: this.props.credential.name,
            url: this.props.credential.url,
            username: this.props.credential.username,
            password: this.props.credential.password
        }
        : {
            name: '',
            url: '',
            username:  '',
            password: ''
        };
    }

    handleInputChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
    }

    handleSubmit = () => {
        if(this.props.index !== undefined) {
            fetch_json(this.props.user.endpoint + endpoints.CREDENTIAL + '/' + this.props.index, {
                user: this.props.user,
                credential: this.state
            }, 'PUT').then((json) => {
                if(json && json.credentials) {
                    this.props.refreshCredentials(json.credentials);
                }
            });
        }
        else {
            fetch_json(this.props.user.endpoint + endpoints.CREDENTIAL, {
                user: this.props.user,
                credential: this.state
            }).then((json) => {
                if(json && json.credentials) {
                    this.props.refreshCredentials(json.credentials);
                }
            });
        }
    }

    handleDelete = () => {
        fetch_json(this.props.user.endpoint + endpoints.CREDENTIAL + '/' + this.props.index, this.props.user
            , 'DELETE').then((json) => {
                if(json && json.credentials) {
                    this.props.refreshCredentials(json.credentials);
                }
            });
    }

    render() {
        if(!this.props.expanded) {
            return null;
        }
        return (
            <div>
                <TextBox
                    name='name'
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.handleInputChange}/>
                <TextBox
                    name='url'
                    value={this.state.url}
                    placeholder="URL"
                    onChange={this.handleInputChange}/>
                <TextBox
                    name='username'
                    value={this.state.username}
                    placeholder="Username"
                    onChange={this.handleInputChange}/>
                <TextBox
                    name='password'
                    value={this.state.password}
                    placeholder="Password"
                    password={true}
                    onChange={this.handleInputChange}/>
                <button onClick={this.handleSubmit}>{this.props.index !== undefined ? 'Update' : 'Create'}</button>
                {this.props.index !== undefined ? <button onClick={this.handleDelete}>Delete</button> : ''}
            </div>
        )
    }
}