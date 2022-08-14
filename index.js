// select dom elements
const counterEl = document.getElementById("counter");
const incrementEl = document.getElementById("increment");
const decrementEl = document.getElementById("decrement");
const addCounter = document.getElementById("addCounter");
const inner = `
            <button
              id="increment${1}"
              class="bg-indigo-400 text-white px-3 py-2 rounded shadow"
              id="increment"
            >
              Increment
            </button>
            <button
              id="decrement${1}"
              class="bg-red-400 text-white px-3 py-2 rounded shadow"
              id="decrement"
            >
              Decrement
            </button>
`;
newCounter.innerHTML = inner;

// initial state
const initialState = {
  value: 0,
};

// create reducer function
function counterReducer(state = initialState, action) {
  if (action.type === "increment") {
    return {
      ...state,
      value: state.value + 1,
    };
  } else if (action.type === "decrement") {
    return {
      ...state,
      value: state.value - 1,
    };
  } else {
    return state;
  }
}

// create store
const store = Redux.createStore(counterReducer);

const render = () => {
  const state = store.getState();
  counterEl.innerText = state.value.toString();
};

// update UI initially
render();

store.subscribe(render);

// button click listeners
incrementEl.addEventListener("click", () => {
  store.dispatch({
    type: "increment",
  });
  console.log("first");
});

decrementEl.addEventListener("click", () => {
  store.dispatch({
    type: "decrement",
  });
});

function myFunction() {
  const node = document.createElement("div");

  node.innerHTML = inner;

  document.getElementById("container").appendChild(node);
}
