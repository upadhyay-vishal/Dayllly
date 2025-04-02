import { useState } from "react";

export default function CounterButton() {
    const [count, setCount] = useState(0);

    return (
        <div className="flex flex-col items-center">
            <button onClick={() => setCount(count + 1)} className="btn btn-info">
                Increment
            </button>
        </div>
    );
}
