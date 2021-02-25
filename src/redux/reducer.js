const initialState = {
   list:[],
   movies:[],
   searchResult:''
}

export function reducer(state = initialState, action){
    switch(action.type){
        case 'SEARCH_BY_TITLE':{
            
            return{
                searchResult: action.payload.title,
                movies:action.payload.movies.Search,
                list:state.list
            }
            
        }
        case 'ADD_TO_LIST':{
            for(let i=0; i< state.list.length; i++){
                if(state.list[i].imdbID === action.payload.movie.imdbID){
                    return state
                }
            }
            const item = action.payload.movie
            return{
                ...state,
                list:[
                    ...state.list,
                    {...item}
                ]
            }
        }
        case 'DELETE_ELEMENT':{
            const newList = state.list.filter((movie)=>{
                if(movie.imdbID == action.payload.imdbID){
                    return false
                } else {
                    return true
                }
                
            })
            return{
                ...state,
                list:newList
            }
        }
        
        default:
            return state;
    }
   
}

