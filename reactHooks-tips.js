////////////////////////////////////////////////////
////////////////////////////////////////////////////
//  react v16+ 
import React, { memo, useMemo, useCallback, createRef, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { store, view } from 'react-easy-state'

const initailState = { count: 0, step: 1 }
const reducer = (state, action) => {
  const { count, step } = state
  if (action.type === 'tick') return { count: count + step, step }
  if (action.type === 'step') return { count, step: action.step }
}

const Hello = () => {
  const [state, dispatch] = useReducer(reducer, initailState)
  const { count, step } = state

  useEffect(() => {
    const id = setInterval(() => dispatch({ type: 'tick' }), 1000)

    return () => clearInterval(id)

  }, [dispatch])


  return (
    <>
      <h1>{count}</h1>
      <input value={step} onChange={e => dispatch({ type: 'step', step: Number(e.target.value) })}/>
    </>
  )
}
const Hello = () => {
  const [renderIndex, setRenderIndex] = useState(1)
  const refFromUseRef = useRef()
  const refFromCreateRef = createRef()

  if (!refFromUseRef.current) {
    refFromUseRef.current = renderIndex
  }

  if (!refFromCreateRef.current) {
    refFromCreateRef.current = renderIndex
  }

  return (
    <>
      Current render index: {renderIndex}
      <br />
      CreateRef: {refFromCreateRef.current}
      <br />
      UseRef: {refFromUseRef.current}
      <br />
      <button onClick={() => setRenderIndex(prev => prev + 1)}>re-render</button>
    </>
  )
}
const counter = store({ num: 0 })
const increment = () => counter.num++
export default view(() => <button onClick={increment}>{counter.num}</button>)


const Hello = () => {
  const [count, setCount] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const words = ['hey', 'this', 'is', 'cool']
  const word = words[wordIndex]

  const computerLetterCount = word => word.length

  const letterCount = useMemo(() => computerLetterCount(word), [word])

  return (
    <>
      <h3>Compute number of letters (slow)</h3>
      <p>"{word}" has {letterCount} letters</p>
      <button onClick={() => {
        const next = wordIndex + 1 === words.length ? 0 : wordIndex + 1
        setWordIndex(next)
      }}>Next word
      </button>
      <h3>Increment a counter (fast)</h3>
      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  )
}

export default Hello

//////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////

import React, { memo, useMemo, createContext, useContext, useEffect, useState, useRef, useReducer } from 'react'
import axios from 'axios'
import './css/variables.css'
import './App.css'


const O = () => {
  const [name, setName] = useState({ f: '', l: '' })
  return (
    <div>
      <form action="">
        <input type="text" value={name.f} onChange={e => setName({ ...name, f: e.target.value })} />
        <input type="text" value={name.l} onChange={e => setName({ ...name, l: e.target.value })} />
        <h3>{name.f}</h3>
        <h3>{name.l}</h3>
      </form>
    </div>
  )
}

const A = () => {
  const [items, setItems] = useState([])
  const addItem = () => {
    setItems([...items, { id: items.length, value: Math.random() * 10 + 1 }])
  }

  return (
    <>
      <button onClick={addItem}>Add number</button>
      <ul>
        {items.map(item => <li key={item.id}>{item.value}</li>)}
      </ul>
    </>
  )
}

const E = () => {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const logPosition = e => {
    setX(e.clientX)
    setY(e.clientY)
  }

  useEffect(() => {
    window.addEventListener('mousemove', logPosition)
    return () => window.removeEventListener('mousemove', logPosition)
  }, [])

  return (
    <div>
      X:{x} - Y:{y}
    </div>
  )
}

const T = () => {
  const [count, setCount] = useState(0)
  const tick = () => {
    setCount(c => c + 1)
  }

  useEffect(() => {
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      {count}
    </div>
  )
}

const F = () => {
  const [posts, setPost] = useState({})
  const [id, setId] = useState(1)
  const [fromClick, setClick] = useState(1)

  const handleClick = () => {
    setClick(id)
  }

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${fromClick}`)
      .then(res => {
        setPost(res.data)
        console.log(res)
      })
      .catch(err => {
        console.error(err)
      })
  }, [fromClick])

  return (
    <>
      <input type="text" value={id} onChange={e => setId(e.target.value)} />
      <button type="button" onClick={handleClick}>Fetch data</button>
      <div>{posts.title}</div>
    </>
  )
}

const Username = React.createContext()
const C = () => {
  return (
    <div>
      <h3>Pass the context </h3>
      <C1 />
    </div>
  )
}
const C1 = () => {
  const u = useContext(Username)
  return <div>get the context{u}</div>
}


const initialState = {
  f: 0,
  s: 10,

}
const reducer = (state, action) => {
  switch (action.type) {
    case '+':
      return { f: state.f + action.value }
    case '-':
      return { f: state.f - action.value }
    case 'reset':
      return initialState
    default:
      return state

  }
}
const R = () => {
  const [count, dispatch] = useReducer(reducer, initialState)
  return (
    <div>
      <div>Count: {count.f}</div>
      <button onClick={() => dispatch({ value: 1, type: '+' })}>++</button>
      <button onClick={() => dispatch({ value: 1, type: '-' })}>--</button>
      <button onClick={() => dispatch({ value: 5, type: '+' })}>+5</button>
      <button onClick={() => dispatch({ value: 5, type: '-' })}>-5</button>
      <button onClick={() => dispatch({ value: 1, type: 'reset' })}>reset</button>
    </div>
  )
}


const m = 0
const mR = (state, action) => {
  switch (action) {
    case '+':
      return state + 1
    case '-':
      return state - 1
    case 'reset':
      return m
    default:
      return state
  }
}
const M = () => {
  const [c1, d1] = useReducer(mR, m)
  const [c2, d2] = useReducer(mR, m)


  return (
    <>
      <div>
        <div>Count: {c1}</div>
        <button onClick={() => d1('+')}>++</button>
        <button onClick={() => d1('-')}>--</button>
        <button onClick={() => d1('reset')}>reset</button>
      </div>
      <div>
        <div>Count: {c2}</div>
        <button onClick={() => d2('+')}>++</button>
        <button onClick={() => d2('-')}>--</button>
        <button onClick={() => d2('reset')}>reset</button>
      </div>
    </>
  )
}


const Rcc = React.createContext()
const RC1 = () => {
  const { countState, countDispatch } = useContext(Rcc)
  return (
    <div>
      <h4>Component A {countState}</h4>
      <button onClick={() => countDispatch('+')}>++</button>
      <button onClick={() => countDispatch('-')}>--</button>
      <button onClick={() => countDispatch('reset')}>reset</button>
    </div>
  )
}
const RC2 = () => {
  const cc = useContext(Rcc)
  return (
    <div>
      <h4>Component B</h4>
      <button onClick={() => cc.countDispatch('+')}>++</button>
      <button onClick={() => cc.countDispatch('-')}>--</button>
      <button onClick={() => cc.countDispatch('reset')}>reset</button>
    </div>
  )
}
const RC3 = () => {
  const cc = useContext(Rcc)
  return (
    <div>
      <h4>Component C</h4>
      <button onClick={() => cc.countDispatch('+')}>++</button>
      <button onClick={() => cc.countDispatch('-')}>--</button>
      <button onClick={() => cc.countDispatch('reset')}>reset</button>
    </div>
  )
}
const RC = () => (
  <>
    <RC1 />
    <RC2 />
    <RC3 />
  </>
)


const Rfetch = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [post, setPost] = useState({})

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
      .then(res => {
        setLoading(false)
        setPost(res.data)
        setError('')
      })
      .catch(err => {
        setLoading(false)
        setPost({})
        setError('Something went wrong!'+err)
      })
  }, [])

  return (
    <div>
      {loading ? 'loading' : post.title}
      {error ? error : null}
    </div>
  )
}

const App = () => {
  return (
    <div className="App">
      <Rfetch />
    </div>
  )
}

// const App = () => {
//   const [count, dispatch] = useReducer(mR, m)
//
//   return (
//     <Rcc.Provider
//       value={{ countState: count, countDispatch: dispatch }}
//     >
//       <div className="App">
//         Count: {count}
//         <RC />
//       </div>
//     </Rcc.Provider>
//   )
// }


export default App

/////// fetching data with useReducer
const initialState = {
  loading: true,
  error: '',
  post: {}
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'success':
      return {
        loading: false,
        error: '',
        post: action.payload,
      }
    case 'error':
      return {
        loading: false,
        error: action.payload,
        post: {}
      }
    default:
      return state
  }
}
const F = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { loading, error, post } = state

  useEffect(() => {

    axios.get('https://jsonplaceholder.typicode.com333/posts/1')
      .then(res => {
        dispatch({ type: 'success', payload: res.data })
      })
      .catch(err => {
        dispatch({ type: 'error', payload: err.message })
      })
  }, [])

  return (
    <>
      {loading ? 'loading' : post.title}
      {error ? error : null}
    </>
  )
}

const B = ({ click, children }) => {
  console.log(`rendering button - ${children}`)
  return <button onClick={click}>{children}</button>
}

const T = () => {
  console.log('rendering title')
  return <h2>useCallback Hook</h2>
}
const C = ({ text, count }) => {
  console.log(`rendering ${text}`)
  return <div>{text} - {count}</div>
}
const MT = memo(T)
const MB = memo(B)
const MC = memo(C)
const P = () => {
  const [age, setAge] = useState(25)
  const [salary, setSalary] = useState(50000)

  const incrementAge = useCallback(() => setAge(age + 1), [age])

  const incrementSalary = useCallback(() => setSalary(salary + 1000), [salary])

  return (
    <div>
      <MT />
      <MC text='age' count={age} />
      <MB click={incrementAge}>Increment Age</MB>
      <MC text='salary' count={salary} />
      <MB click={incrementSalary}>Increment Salary</MB>
    </div>
  )
}



////////////////////////////////////////////////
//  Call child method from parent
const { forwardRef, useRef, useImperativeHandle } = React;

// We need to wrap component in `forwardRef` in order to gain
// access to the ref object that is assigned using the `ref` prop.
// This ref is passed as the second parameter to the function component.
const Child = forwardRef((props, ref) => {

  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  useImperativeHandle(ref, () => ({

    getAlert() {
      alert("getAlert from Child");
    }

  }));

  return <h1>Hi</h1>;
});

const Parent = () => {
  // In order to gain access to the child component instance,
  // you need to assign it to a `ref`, so we call `useRef()` to get one
  const childRef = useRef();

  return (
    <div>
      <Child ref={childRef} />
      <button onClick={() => childRef.current.getAlert()}>Click</button>
    </div>
  );
};

ReactDOM.render(
  <Parent />,
  document.getElementById('root')
);


//  update state
//  useState  array or object
//  这点容易在开发的时候犯错

```js
const [theArray, setTheArray] = useState(initialArray);
const [theObject, setTheObject] = useState(initialObject);

// Push element at end of array
setTheArray(prevArray => [...prevArray, newValue])

// Push/update element at end of object
setTheObject(prevState => ({ ...prevState, currentOrNewKey: newValue}));

// Push/update element at end of array of objects
setTheArray(prevState => [...prevState, {currentOrNewKey: newValue}]);

// Push element at end of object of arrays
setTheObject(prevState => ({...prevState, currentKey: [...prevState.currentKey, newValue]}));

```




```js

import { useState } from 'react';

export default function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}


////
import React from 'react';
import ReactDOM from 'react-dom';
import useLocalStorage from './use-local-storage';

function App() {
  // Similar to useState but first arg is key to the value in local storage
  const [name, setName] = useLocalStorage('name', 'Bob');

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);


```


***** 下面的写法避免了每个页面引入的情况
```js

import React, { memo, Suspense, lazy, useCallback } from 'react'

const AsyncCompoennt = () => {
  const [page, setPage] = useState('Default')

  const Component = useCallback(
    lazy(() => import(`./Pages/${page}`)),
    [page]
  )
  
  return (
    <Suspense fallback={null}>
      <Component />
    </Suspense>
  )

}

```

