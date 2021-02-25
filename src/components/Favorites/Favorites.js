import React, { Component } from 'react';
import './Favorites.css';
import { connect } from "react-redux";
import store from "../../redux/store"
import { Link } from 'react-router-dom';


class Favorites extends Component {
    state = {
        title: 'Новый список',
        isTitle:false,
        list:[],
        id:[]
    }

    changeTitleHandler = (e) => {
        this.setState({title:e.target.value})
    }

    componentDidMount(){
        store.subscribe(()=>{
        const state = store.getState();
        this.setState({list:state.list})
        console.log(state.list)
        let idTemper = []
        if(this.state.list.length > 0){
            for(let i = 0; i < this.state.list.length; i++){
                idTemper.push(this.state.list[i].imdbID);
            }
        }
        this.setState({id:idTemper},()=> this.getPostFetch())
        })
        

    }

    getPostFetch(){
        const newList = {
            title:this.state.title,
            movies:this.state.id
        }
        fetch('https://acb-api.algoritmika.org/api/movies/list', {
        method:"POST",
        headers:{
            "Content-type":"aplication/json"
        },
        body: JSON.stringify(newList)
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data) 
        })
    }

    clickHandlerDelete=(imdbID)=>{
        store.dispatch({
            type: "DELETE_ELEMENT",
            payload: {
                imdbID:imdbID
            },
          });
        //  console.log(imdbID)
        
    }

    clickHandlerSave=()=>{
        this.setState({isTitle:true})
    }

    render() { 
        return (
            <div className="favorites">
                <input disabled={this.state.isTitle} value={this.state.title} className="favorites__name" onChange={(e)=>this.changeTitleHandler(e)} />
                <ul className="favorites__list">
                    {this.state.list.map((item) => {
                        return <li key={item.id}>{item.Title} ({item.Year})<button onClick={()=>this.clickHandlerDelete(item.imdbID)}>Удалить</button></li>;
                    })}
                </ul>
                {this.state.isTitle ? <Link>Ссылка</Link> : <button type="button" className="favorites__save" onClick={()=>this.clickHandlerSave()}>Сохранить список</button>}
            </div>
        );
    }
}

//const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

 
export default Favorites;