import React from 'react';
import CredentialView from './CredentialView';
import browser from 'webextension-polyfill';

/**
 * Single Credential view
 */
export default class Credential extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // Expanded view
            expanded: false
        };
    }

    /** 
     * Toggles the view
    */
    toggleExpand = () => {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    /**
     * Fills the crendtial on the current tab
     */
    onFill = () => {
        browser.tabs.query({active: true}).then((tabs) => {
            browser.tabs.sendMessage(tabs[0].id, {
                username: this.props.credential.username,
                password: this.props.credential.password
            });
        })
    }

    render() {
        return (
            <div>
                <div style={{position: 'relative'}}>
                    {this.props.credential.name}
                    <span style={{position: 'absolute', right: 0}}>
                        <button onClick={this.onFill}>Fill</button>
                        <button onClick={this.toggleExpand}>Edit</button>
                    </span>
                </div>
                <CredentialView
                    index={this.props.index}
                    user={this.props.user}
                    credential={this.props.credential}
                    refreshCredentials={this.props.refreshCredentials}
                    expanded={this.state.expanded} />
            </div>
        );
    }
} 