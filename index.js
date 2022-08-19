// dom elements
const counterEl = document.getElementById("counter");
const incrementEl = document.getElementById("increment");
const decrementEl = document.getElementById("decrement");
const addCounter = document.getElementById("addCounter");

// initial state
const initialState = [
  {
    id: 0,
    value: 0,
  },
];

// reducer function
function counterReducer(state = initialState, action) {
  const { type, payload } = action;
  const states = [...state];
  const id = states.find((state) => state.id == payload?.id);
  const rest = states.filter((state) => state.id !== payload?.id);

  if (type === "increment") {
    const newState = {
      ...id,
      value: id.value + payload.value,
    };
    const final = [...rest, newState];
    let finalState = final.sort((a, b) => {
      return a.id - b.id;
    });
    return finalState;
  } else if (type === "decrement") {
    const newState = {
      ...id,
      value: id.value - payload.value,
    };
    const final = [...rest, newState];
    let finalState = final.sort((a, b) => {
      return a.id - b.id;
    });
    return finalState;
  } else if (type === "addCounter") {
    const newState = {
      id: payload.id,
      value: payload.value,
    };
    const final = [...rest, newState];
    return final;
  } else if (type === "reset") {
    const newArr = states.map((state) => {
      return { ...state, value: initialState[0].value };
    });
    return newArr;
  } else {
    return state;
  }
}

// store
const store = Redux.createStore(counterReducer);
const render = () => {
  const state = store.getState();

  const counterValues = document.getElementsByClassName("counterValue");
  for (let i = 0; i < counterValues.length; i++) {
    counterValues[i].innerText = state[i].value;
  }
};

// updating UI
render();

store.subscribe(render);

// initial button click listeners
incrementEl.addEventListener("click", () => {
  store.dispatch({
    type: "increment",
    payload: { id: 0, value: 3 },
  });
});

decrementEl.addEventListener("click", () => {
  store.dispatch({
    type: "decrement",
    payload: { id: 0, value: 1 },
  });
});

function addCounters() {
  const container = document.getElementById("container");
  const state = store.getState();
  const i = state.length;
  const node = document.createElement("div");
  const inner = `
  <div class="counterValue text-2xl font-semibold text-center py-3"></div>
  <button class="increment bg-indigo-400 text-white px-3 py-2 rounded shadow" onclick="increase(${i})"> 
    Increment
  </button>
  <button  class="decrement bg-red-400 text-white px-3 py-2 rounded shadow mx-1" onclick="decrease(${i})"  >
    Decrement
  </button>
`;
  node.innerHTML = inner;
  container.appendChild(node);

  store.dispatch({
    type: "addCounter",
    payload: {
      id: store.getState().length,
      value: 0,
    },
  });
}

// dynamic button click listeners
function increase(id) {
  store.dispatch({
    type: "increment",
    payload: { id: id, value: id + 2 },
  });
}
// dynamic button click listeners
function decrease(id) {
  store.dispatch({
    type: "decrement",
    payload: { id: id, value: id },
  });
}
//reset button
function reset() {
  store.dispatch({
    type: "reset",
  });
}
