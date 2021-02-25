import React, { Component } from 'react';
import './MovieItem.css';
import { connect } from "react-redux";
import store from "../../redux/store"


class MovieItem extends Component {
    
    render() {
        const { Title, Year, Poster, addToListMovies } = this.props;
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button type="button" className="movie-item__add-button" onClick={addToListMovies}>Добавить в список</button>
                </div>
            </article>
        );
    }
}

//const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

 
export default MovieItem;