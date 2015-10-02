import React, {Component} from "react";

export default class A extends Component {
	createMarkup() { return {__html: "@HTMLMARKUP"}; };
	render() {
		<div dangerouslySetInnerHTML={createMarkup()} />
	}
}
