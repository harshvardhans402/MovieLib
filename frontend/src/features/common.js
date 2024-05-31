const serializeState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('reduxState', serializedState);
    } catch (err) {
        console.error('Error serializing state:', err);
    }
};

// Deserialize state from JSON including token
const deserializeState = () => {
    try {
        const serializedState = localStorage.getItem('reduxState');
        if (serializedState === null) {
            console.log('dsdkfl')

            return undefined; // If no state is stored, return undefined
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error('Error deserializing state:', err);
        return undefined; // Return undefined if deserialization fails
    }
};

export { serializeState, deserializeState }