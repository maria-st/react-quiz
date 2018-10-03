import React, { Component } from 'react';
import './App.css';
import {getPropSafe} from './helpers.js';

class Nav extends Component {
	constructor(props){
		super(props);
		this.state = {header:'Furniture', home:'disabled'};
	};

	componentWillReceiveProps(props) {
		if (props.list){
			this.setState({header:'Furniture', home:'disabled'});
		} else {
			this.setState({header:props.item, home:''});
		}
	};

	handleClick(){
		this.props.handleList();
	};

	render(){
		return (
		<div className="nav">
			<div className="nav-header">{this.state.header}</div>
			<div className={`nav-home button no-border ${this.state.home}`} onClick={this.handleClick.bind(this)}><i className="material-icons">keyboard_arrow_left</i>home</div>
		</div>
		)
	}
}

class Item extends Component {

	render(){
		return ( 
		<div className="container item">
			<div className="card-item">
				<img src={this.props.data.image} alt={this.props.data.title}/><div className="like"><i className="material-icons">favorite_border</i></div>
			</div>
			<div className="title">
				<div className="header font18">{this.props.data.title}</div>
				<div className="price">{`Price: ${getPropSafe(this.props.data,'price','amounts','USD')}`}</div>
				<div className="measurements"><div>Measurements:</div><div>{getPropSafe(this.props.data,'measurements','display')}</div></div>
				<div className="offer"><div className="button">purchase</div><div className="button">offer</div></div>
			</div>
			<div className="desc"><div className="header">{this.props.data.description}</div><div className="created">{`Creator: ${this.props.data.creators}`}</div></div>
		</div>
		)
	}
}


class Card extends Component {
	handleClick(){
		this.props.handleItem(this.props.data);
	};

	render(){
		return (
			<div className="card" onClick={this.handleClick.bind(this)}>
				<div className="img"><img src={this.props.data.image} alt={this.props.data.title}/></div>
				<div className="desc">{getPropSafe(this.props.data,'price','amounts','USD')}<div className="like"><i className="material-icons">favorite_border</i></div></div>
			</div>
		);
	}
}


class List extends Component {

	cards(arr){
		let items = [];
		for (let i = 0; i < arr.length; i++){
			items.push(<Card key={i} data={arr[i]} handleItem={this.props.handleItem}/>);
		};
		return items;
	};

	render(){
		return <div className="container list">{this.cards(this.props.data)}</div>;
	}
}


class Footer extends Component {

	handleClick(){
		this.props.handleMore();
	};

	render(){
		return <div className="footer"><div className="load-more" onClick={this.handleClick.bind(this)}>load more</div></div>;
	}
}


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {err:null, list:true, items:[], itemdata:[]};
	};

	// on load
	componentDidMount() {
		fetch("/browse", {method:'GET'})
		.then(res => res.json())
		.then(
			(data) => {			
				//console.log('data',data);
				this.setState({items:data.items});
			}
		)
	};

	handleItem(data){
		fetch("/item/"+data.id, {method:'GET'})
		.then(res => res.json())
		.then(
			(data) => {			
				this.setState({list:false,itemdata:data});
			}
		);
	}

	handleList(){
		this.setState({list:true});
	}

	handleMore(){
		fetch("/browse", {method:'GET'})
		.then(res => res.json())
		.then(
			(data) => {			
				this.setState({items:this.state.items.concat(data.items)});
			}
		)
	}

	render() {
		var app = [<Nav key="nav" list={this.state.list} item={getPropSafe(this.state.itemdata,'seller','company')} handleList={this.handleList.bind(this)}/>];
		if (this.state.list){
			app.push(<List key="list" data={this.state.items} handleItem={this.handleItem.bind(this)} />);
			app.push(<Footer key="footer" handleMore={this.handleMore.bind(this)}/>);
		} else {
			app.push(<Item key="item" data={this.state.itemdata}/>);
		};
		return app;
	}
}

export default App;
