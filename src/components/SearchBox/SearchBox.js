import React, { Component } from 'react';
import './SearchBox.css';
import store from "../../redux/store"
import { connect } from "react-redux";


class SearchBox extends Component {
    state = {
        searchLine: '',
        data:[]
    }
    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
        
    }
    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        const search = this.state.searchLine
        const key = 'b14e7045'
        fetch(`http://www.omdbapi.com/?s=${search}&apikey=${key}`)
        .then((res)=>res.json())
        .then((data)=>{
            store.dispatch({
                type: 'SEARCH_BY_TITLE',
                    payload:{
                        title:this.state.searchLine,
                        movies:data
                    }
                })
                
            this.setState({data:data})
        })
       
    }

    componentDidMount(){
        // store.subscribe(() => {
            
        // }) 
    }

    render() {
        const { searchLine } = this.state;

        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Искать фильм по названию:
                        <input
                            value={searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            onChange={this.searchLineChangeHandler}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!searchLine}
                    >
                        Искать
                    </button>
                </form>
            </div>
        );
    }
}

// const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

 
export default SearchBox;