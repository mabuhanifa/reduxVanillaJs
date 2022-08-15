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
];

// create reducer function
function counterReducer(state = initialState, action) {
  const { type, id, payload } = action;
  if (type === "increment") {
    return [...state, (state[id].value = state[id].value + payload)];
  } else if (type === "decrement") {
    return [...state, (state[id].value = state[id].value - payload)];
  } else if (type === "addCounter") {
    return [...state, payload];
  } else {
    return state;
  }
}

// create store
const store = Redux.createStore(counterReducer);

const render = () => {
  const state = store.getState();
  counterEl.innerText = state[0].value.toString();
  console.log(state);
};

// update UI initially
render();

store.subscribe(render);

// button click listeners
incrementEl.addEventListener("click", () => {
  store.dispatch({
    type: "increment",
    id: 0,
    payload: 5,
  });
  console.log("first");
});

decrementEl.addEventListener("click", () => {
  store.dispatch({
    type: "decrement",
    id: 0,
    payload: 2,
  });
});

function myFunction() {
  const node = document.createElement("div");
  const state = store.getState();
  const inner = `
  <div class="text-2xl font-semibold"></div>
  <h2>${state[0].value}</h2>
  <button class="${classd}" > 
    Increment
  </button>
  <button onclick="loadP()"  class="decrement bg-red-400 text-white px-3 py-2 rounded shadow" >
    Decrement
  </button>
`;
  node.innerHTML = inner;

  document.getElementById("container").appendChild(node);
  store.dispatch({
    type: "addCounter",
    payload: {
      id: store.getState().length,
      value: 0,
    },
  });
}

function addItem() {
  // const counters = document.getElementsByClassName("increment");
  // let arrayOfElements = Array.from(counters);
  // console.log(arrayOfElements);
}

function loadP() {}
