import React from 'react';
import Credential from './Credential';
import CredentialView from './CredentialView';

export default class Credentials extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            createNew: false
        };
    }

    render() {
        let credentialComponents = [];
        for(let i = 0; i < this.props.credentials.length; i++) {
            credentialComponents.push(<Credential
                key={i}
                index={i}
                credential={this.props.credentials[i]}
                user={this.props.user}
                refreshCredentials={this.props.refreshCredentials}
            />);
        }
        return (
            <div>
                {credentialComponents}
                {this.state.createNew ? <CredentialView 
                    expanded={true} user={this.props.user} refreshCredentials={this.props.refreshCredentials} />
                    : <button onClick={() => {this.setState({createNew: true})}}>New</button>}
            </div>
        );
    }
}