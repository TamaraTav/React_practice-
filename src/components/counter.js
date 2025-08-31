import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(3);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className="counter-cont">
      <button onClick={increment}>გაზრდა</button>
      <div className="count">{count}</div>
      <button onClick={decrement}>კლება</button>
    </div>
  );
}

export default Counter;
