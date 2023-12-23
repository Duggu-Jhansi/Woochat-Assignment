const { Component, useState } = React;
const { render } = ReactDOM;

// Counter Component
function Counter({ value, onIncrement, onDecrement }) {
  return (
    <div className="counter">
      <b>{value}</b>
      <div className="counter-controls">
        <button className="button is-danger is-small" onClick={() => onDecrement(1)}>-</button>
        <button className="button is-success is-small" onClick={() => onIncrement(1)}>+</button>
      </div>
    </div>
  );
}

// Total Component
function Total({ total }) {
  return (
    <div>
      <p>Total: {total}</p>
    </div>
  );
}

function App() {
  // Step 1: Move the global data array to the component state
  const [counters, setCounters] = useState([
    { id: 1, value: 0 },
    { id: 2, value: 0 },
    { id: 3, value: 0 },
    { id: 4, value: 0 } // Step 3: Render a fourth Counter component
  ]);

  // Step 2: Define callbacks to update counter values
  const handleIncrement = (id, amount) => {
    setCounters(prevCounters => {
      return prevCounters.map(counter => {
        if (counter.id === id) {
          return { ...counter, value: counter.value + amount };
        }
        return counter;
      });
    });
  };

  const handleDecrement = (id, amount) => {
    setCounters(prevCounters => {
      return prevCounters.map(counter => {
        if (counter.id === id) {
          return { ...counter, value: counter.value - amount };
        }
        return counter;
      });
    });
  };

  // Extra Credit: Calculate the running total
  const total = counters.reduce((acc, counter) => acc + counter.value, 0);

  return (
    <div>
      {/* Step 3: Render three Counter components */}
      {counters.map((counter) => (
        <Counter
          key={counter.id}
          value={counter.value}
          onIncrement={(amount) => handleIncrement(counter.id, amount)}
          onDecrement={(amount) => handleDecrement(counter.id, amount)}
        />
      ))}

      {/* Extra Credit: Render the Total component */}
      <Total total={total} />
    </div>
  );
}

render(<App />, document.querySelector("#root"));
