////////////////////////////////////////////////////
////////////////////////////////////////////////////
//  react v16+ 
import React, { createRef, useEffect, useMemo, useReducer, useRef, useState } from 'react'
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

import React, { createContext, useContext, useEffect, useState, useRef, useReducer } from 'react'
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
