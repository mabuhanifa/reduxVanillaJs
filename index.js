// select dom elements
const counterEl = document.getElementById("counter");
const incrementEl = document.getElementById("increment");
const decrementEl = document.getElementById("decrement");
const addCounter = document.getElementById("addCounter");
const classd = "increment bg-indigo-400 text-white px-3 py-2 rounded shadow";
// initial state
const initialState = [
  {
    id: 0,
    value: 0,
  },
  {
    id: 1,
    value: 2,
  },
  {
    id: 2,
    value: 5,
  },
  {
    id: 3,
    value: 8,
  },
  {
    id: 4,
    value: 9,
  },
  {
    id: 5,
    value: 12,
  },
];

// create reducer function
function counterReducer(state = initialState, action) {
  const { type, payload } = action;
  const states = [...state];
  const modify = states.find((state) => state.id == payload?.id);
  const rest = states.filter((state) => state.id !== payload?.id);
  // const copiedState = state.map((s) => ({
  //   ...s,
  // }));

  //console.log(type, payload);
  if (type === "increment") {
    //return [...state,state[id].value = state[id].value + payload];
    //return [...state, [(state[id].value = state[id].value + payload)]];

    // const newState = [
    //   {
    //     ...copiedState.state[index],
    //     value: copiedState.state[index].value + payload.value,
    //   },
    // ];
    // const index = state.findIndex((el) => el.id === payload.id);
    // const newState = [
    //   ...state,
    //   (state[index] = {
    //     ...state[index],
    //     value: state[index].value + payload.value,
    //   }),
    // ];
    // console.log(newState,index);
    // return newState;
    const newState = {
      ...modify,
      value: modify.value + payload.value,
    };
    const final = [...rest, newState];
    let finalState = final.sort((a, b) => {
      return a.id - b.id;
    });
    return final;
  } else if (type === "decrement") {
    const index = state.findIndex((el) => el.id === payload.id);
    const newState = [
      ...state,
      {
        ...state[index],
        value: state[index].value - payload.value,
      },
    ];
    return newState;
  } else if (type === "addCounter") {
    const counterState = [...state, payload];
    return counterState;
  } else {
    return state;
  }
}

// create store
const store = Redux.createStore(counterReducer);
const render = () => {
  const state = store.getState();
  //counterEl.innerText = state[0].value.toString();
  const counterValues = document.getElementsByClassName("counterValue");
  for (let i = 0; i < counterValues.length; i++) {
    counterValues[i].innerText = state[i].value;
    //console.log(counterValues, state[i].value.toString());
  }
  console.log(state);
};

// update UI initially
render();

store.subscribe(render);

// button click listeners
incrementEl.addEventListener("click", () => {
  store.dispatch({
    type: "increment",
    payload: { id: 0, value: 5 },
  });
});

decrementEl.addEventListener("click", () => {
  store.dispatch({
    type: "decrement",
    payload: { id: 0, value: 5 },
  });
});

function myFunction() {
  const container = document.getElementById("container");
  const state = store.getState();
  for(let i = 0; i < state.length; i++) {
    const node = document.createElement("div");
    const inner = `
  <div class="text-2xl font-semibold"></div>
  <div class="counterValue"></div>
  <button class="${classd}" onclick="incre(${i})"> 
    Increment
  </button>
  <button onclick="loadP()"  class="decrement bg-red-400 text-white px-3 py-2 rounded shadow" >
    Decrement
  </button>
`;
    node.innerHTML = inner;
    container.appendChild(node);
  };

  store.dispatch({
    type: "addCounter",
    payload: {
      id: store.getState().length,
      value: store.getState().length + 2,
    },
  });
}

function addItem() {
  // const counters = document.getElementsByClassName("increment");
  // let arrayOfElements = Array.from(counters);
  // console.log(arrayOfElements);
}
function incre(id) {
  store.dispatch({
    type: "increment",
    payload: { id: id+1, value: 5 },
  });
}
function loadP() {}
