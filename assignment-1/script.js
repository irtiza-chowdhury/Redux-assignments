const allMatch = document.querySelector(".all-matches");

const addBtn = document.querySelector(".lws-addMatch");

const resetBtn = document.querySelector(".lws-reset");



const INCREMENT = "count/increment";
const DECREMENT = "count/decrement";
const RESET = "count/reset";
const ADDMATCH = "count/addmatch";
const DELETE = "count/deletematch";



const nextCounterID =(counters)=> {
  const nextId = counters.reduce((nextId, counter)=> Math.max(nextId, counter.id), 1);
  return nextId+1;

}

const increment = (id, value) => {
  return {
    type: INCREMENT,
    payload: {id, value}
  };
  
};

const decrement = (payload) => {
  return {
    type: DECREMENT,
    payload,
  };
};

const reset=()=>{
  return {
    type: RESET
  };
}

const addmatch = ()=>{
  return {
    type: ADDMATCH
  };
}
const deletematch = (counterID)=>{
  return {
    type: DELETE,
    payload: counterID
  };
}

const initialState = [
  { 
    id:1,
    score: 0
}
];


function counterReducer(state = initialState, action) {
 
  if (action.type === INCREMENT){
   return state.map((counter)=>{
      if(counter.id !== action.payload.id){
        return {
          ...state,
          id:counter.id,
          score: counter.score
        }
      }
      if(counter.id=== action.payload.id){
        return{
          ...state,
          id: action.payload.id,
        score : counter.score + Number(action.payload.value) 
      }
      
      }
    })
  } else if (action.type === DECREMENT){
    return state.map((counter)=>{
      if(counter.id !== action.payload.id){
        return {
          ...state,
          id:counter.id,
          score: counter.score
        }
      }
      if(counter.id=== action.payload.id){
        if(counter.score < Number(action.payload.value)){
          return{
            ...state,
            id: action.payload.id,
          score : 0
        }
        }
        if(counter.score >= Number(action.payload.value)){
          return{
            ...state,
            id: action.payload.id,
          score : counter.score - Number(action.payload.value) 
        }
        }
    }
    }) 
  } else if(action.type === RESET){
    return state.map((item)=>({...item, score:0}));
  } else if(action.type === ADDMATCH){
    id= nextCounterID(state)
    return[...state, {id, score:0}] 
  
  } else if(action.type === DELETE){
    return state.filter((counter)=> counter.id !== action.payload)
  } else{
    return state
  }
 
}


const store = Redux.createStore(counterReducer);

const handleIncrement= (id, formEl) =>{

  const input = formEl.querySelector(".lws-increment")

  const value =  Number(input.value)
  if(value >0 ){
    store.dispatch(increment(id, value))
  }
}
const handleDecrement= (id, formElement) =>{

  const value =  Number(formElement.querySelector(".lws-decrement").value)
  if(value >0 ){
    store.dispatch(decrement({id, value}))
  }
}

const handleDelete = (couterID)=>{
  store.dispatch(deletematch(couterID))
}

addBtn.addEventListener('click',()=>{
  store.dispatch(addmatch())
})

resetBtn.addEventListener('click', ()=>{
  store.dispatch(reset())
})


const render =()=>{
  const state = store.getState();
  const allCounters = state.map((item)=>{
    return `
    <div class="match">
                    <div class="wrapper">
                        <button class="lws-delete" onclick="handleDelete(${item.id})">
                            <img src="./image/delete.svg" alt="" />
                        </button>
                        <h3 class="lws-matchName">Match ${item.id}</h3>
                    </div>
                    <div class="inc-dec">
                        <form class="incrementForm" onsubmit="event.preventDefault(); handleIncrement(${item.id},this)">
                            <h4>Increment</h4>
                            <input
                                type="number"
                                name="increment"
                                class="lws-increment"
                            />
                        </form>
                        <form class="decrementForm" onsubmit="event.preventDefault(); handleDecrement(${item.id},this)">
                            <h4>Decrement</h4>
                            <input
                                type="number"
                                name="decrement"
                                class="lws-decrement"
                            />
                        </form>
                    </div>
                    <div class="numbers">
                        <h2 class="lws-singleResult">${item.score}</h2>
                    </div>
                </div>
   `
  }).join("")

  allMatch.innerHTML= allCounters
}






render();

store.subscribe(render);




    