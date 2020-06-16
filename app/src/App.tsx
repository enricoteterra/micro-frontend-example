import React, {useEffect, useState} from 'react';

declare global {
  interface Window { 
    component?: {
      default: any // type module exports here
    }; 
  }
}

function App() {
  const [state, setState] = useState({
    loaded: false,
    error: false,
  });

  const onScriptLoad = () => setState({loaded: true, error: false});
  const onScriptError = () => setState({loaded: true, error: true});

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'http://localhost:3001/component.umd.development.js';
    document.body.appendChild(script);

    script.addEventListener('load', onScriptLoad);
    script.addEventListener('error', onScriptError);

    return () => {
      script.removeEventListener('load', onScriptLoad);
      script.removeEventListener('error', onScriptError);
    };
  }, []);

  // note: component namespace not available immediately
  const ExternalComponent = window.component?.default;

  return (
    <div className="App">
      <header className="App-header">
        {JSON.stringify(state)}
        {state.loaded && !state.error ? (
          <ExternalComponent />
        ) : (
          <b>Something went wrong!</b>
        )}
      </header>
    </div>
  );
}

export default App;
