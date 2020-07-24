import React from 'react';

/**
 * A React component for a text input
 */
class TextBox extends React.Component {
	render() {
		return (
			<input
				className="TextBox"
				type={this.props.password ? "password" : "text"}
				name={this.props.name}
				value={this.props.value}
				placeholder={this.props.placeholder}
				onChange={event => this.props.onChange(event)}
			/>
		)
	}
}
export default TextBox;