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
  const { type, payload } = action;
  const states = [...state];
  const modify = states.find((state) => state.id == payload?.id);
  const rest = states.filter((state) => state.id !== payload?.id);
  console.log(type, payload);
  if (type === "increment") {
    const newState = {
      ...modify,
      value: modify.value + payload.value,
    };
    const final = [...rest, newState];
    let finalState = final.sort((a, b) => {
      return a.id - b.id;
    });
    return finalState;
  } else if (type === "decrement") {
    const newState = {
      ...modify,
      value: modify.value - payload.value,
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
      return { ...state, value: 0 };
    });
    return newArr;
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
  for (let i = 0; i < state.length; i++) {
    const node = document.createElement("div");
    const inner = `
  <div class="text-2xl font-semibold"></div>
  <div class="counterValue"></div>
  <button class="${classd}" onclick="incre(${i})"> 
    Increment
  </button>
  <button  class="decrement bg-red-400 text-white px-3 py-2 rounded shadow" onclick="decre(${i})"  >
    Decrement
  </button>
`;
    node.innerHTML = inner;
    container.appendChild(node);
  }

  store.dispatch({
    type: "addCounter",
    payload: {
      id: store.getState().length,
      value: store.getState().length + 2,
    },
  });
}

function decre(id) {
  store.dispatch({
    type: "decrement",
    payload: { id: id + 1, value: id + 2 },
  });
}
function incre(id) {
  store.dispatch({
    type: "increment",
    payload: { id: id + 1, value: id + 3 },
  });
}
function reset(id) {
  store.dispatch({
    type: "reset",
  });
}
