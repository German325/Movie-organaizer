import React, { Component } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';
import store from "../../redux/store"
import { connect } from "react-redux";


class Movies extends Component {
    state = { 
        movies: [],
    }

    addToListMovies=(movie)=>{
        store.dispatch({
            type:'ADD_TO_LIST',
            payload:{
                movie:movie,
            }
        
        })
    }

    componentDidMount(){
        store.subscribe(()=>{
            const result = store.getState()
            this.setState({movies:result.movies})
        })
    }
    

    render() { 
        return ( 
            <ul className="movies">
                {this.state.movies.map((movie) => (
                    <li className="movies__item" key={movie.imdbID}>
                        <MovieItem {...movie} addToListMovies={()=>this.addToListMovies(movie)}/>
                    </li>
                ))}
            </ul>
        );
    }
}

//const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);


export default Movies;