import { useCallback, useEffect, useState, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef is used to get the reference of the input element
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback( () => {

    let pwd = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let nos = "0123456789";
    let chars = "!@#$%^&*()_+~`|}{[]\:;?><,./-="
    if(numberAllowed) str += "0123456789";
    if(characterAllowed) str += "!@#$%^&*()_+~`|}{[]\:;?><,./-=";

    for (let i = 1; i<= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pwd += str.charAt(char);
    }

    setPassword(pwd);


  }, [length, numberAllowed, characterAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,21)
    window.navigator.clipboard.writeText(password)}, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, characterAllowed, setPassword])


  return (
   <>
    <h1 className='text-4xl text-center my-5'> password generator</h1>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      {/* <h1 className='text-white text-center my-3'>Password generator</h1> */}
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
        />
        {/* <button
            onClick={passwordGenerator}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4"
            >copy</button> */}
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>

    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input
        type='range'
        min={6}
        max={20}
        value={length}
        className='cursor-pointer'
        onChange={(e) => setLength(e.target.value)}
         />
         <label>length: {length}</label>
      </div>

      <div className='flex items-center gap-x-1'>
        <input
        type='checkbox'
        defaultChecked={numberAllowed}
        id='numberInput'
        onChange={() => {setNumberAllowed((prev) => !prev);}
        }
        />
        <label htmlFor='numberInput'>numbers</label>
      </div>

      <div className='flex items-center gap-x-1'>
        <input
        type='checkbox'
        defaultChecked={characterAllowed}
        id='characterInput'
        onChange={() => {setCharacterAllowed((prev) => !prev);}
        }
        />
        <label htmlFor='characterInput'>characters</label>
      </div>

    </div>
    
   </div>
   </>
  )
}

export default App
