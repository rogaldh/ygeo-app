'use strict';
import React from 'react';
import Action from '../../actions/appViewActions.js';
import BannerStore from '../../stores/bannerStore.js';
import './banner.styl';

import 'react/addons';
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class Promo extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			image: '',
			text: '',
			title: '',
			visibility: true
		};
	}

	componentDidMount() {
		Action.getActualBanner(this.context.router.getCurrentParams());

		setInterval(function(){
			Action.getActualBanner(this.context.router.getCurrentParams());
		}.bind(this), 10000);
	}

	componentWillMount() {
		BannerStore.addChangeListener(this.onChange.bind(this));
	}

	componentWillUnmount() {
		BannerStore.removeChangeListener(this.onChange.bind(this));
	}

	onChange(){
		this.setState(BannerStore.getState());
	}

	handlecloseBanner(){
		this.setState({visibility: false});
	}

	render(){
		var className = '';
		if(!this.state.visibility){
			className += ' off';
		}

    return <section className={'promo' + className}>
			<div className="promo__close" onClick={this.handlecloseBanner.bind(this)}></div>
			<a href="javascript:void(0)">
				<img src={this.state.image} className={className} />
				<div className="promo__text">
					<h2>{this.state.title}</h2>
					<p>{this.state.text}</p>
				</div>
			</a>
		</section>;
  }
}

Promo.contextTypes = {
  router: React.PropTypes.func
};
