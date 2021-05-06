import {useState, useEffect} from "react";

export function ToggleTodos({ isCompletedAll, toggleAllTodos}) {

    const [checked, setChecked] = useState(isCompletedAll);

    useEffect(() => {
        setChecked(isCompletedAll)
    }, [isCompletedAll]);

    return (
        <>
            <input
                checked={checked}
                id="toggle-all"
                className="toggle-all"
                type="checkbox"
                onChange={(e) => setChecked(checked)}
            />
            <label
                htmlFor="toggle-all"
                onClick={toggleAllTodos}
            >
                Mark all as complete</label>
        </>
    );
}
