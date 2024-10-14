import groceryCartImage from './assets/grocery-cart.png'
import { useEffect, useState } from 'react'
// import GroceryItem from './components/GroceryItem'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [groceryItems, setGroceryItems] = useState([])
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    determinedCompletedStatus()
  }, [groceryItems])

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const determinedCompletedStatus = () => {
    let isCompleted = true
    groceryItems.forEach((item) => {
      if (!item.completed) {
        isCompleted = false
      }
    })
    setIsCompleted(isCompleted)
  }

  const handelItemEnter = (e) => {
    if (e.key === 'Enter') {
      if (inputValue) {
        const updatedGroceryItem = [...groceryItems]

        const itemIndex = updatedGroceryItem.findIndex(
          (item) => item.name === inputValue
        )

        if (itemIndex === -1) {
          updatedGroceryItem.push({
            name: inputValue,
            quantity: 1,
            completed: false,
          })
        } else {
          updatedGroceryItem[itemIndex].quantity++
        }

        setGroceryItems(updatedGroceryItem)
        setInputValue('')
      }
    }
  }

  const handleClick = (name) => {
    const updatedGroceryItem = groceryItems.filter((item) => item.name !== name)
    setGroceryItems(updatedGroceryItem)
  }

  const handleCompletedStatus = (status, index) => {
    const updatedGroceryItem = [...groceryItems]
    updatedGroceryItem[index].completed = status
    setGroceryItems(updatedGroceryItem)
  }

  return (
    <main className="flex  justify-center items-center w-[100vw] h-[100vh] mx-auto">
      <div>
        <div>
          {isCompleted && (
            <h4 className="text-center text-2xl font-bold text-green-300 mb-1">
              You are Done
            </h4>
          )}
          <div className="flex flex-col items-center text-center">
            <h1 className="font-bold text-2xl">Shopping List</h1>
            <img
              src={groceryCartImage}
              alt="GroceryImage"
              className="w-[150px] my-5 "
            />
            <input
              type="text"
              placeholder="Add Item"
              onChange={handleChange}
              onKeyDown={handelItemEnter}
              value={inputValue}
              className="border-solid border-b-2 border-b-black bg-transparent p-2 outline-none border w-[300px]"
            />
          </div>
        </div>

        <ul className="m-0">
          {groceryItems.map((item, index) => (
            <li
              className="flex justify-between  list-none py-1 w-[300px] m-3 border-solid border border-b-black"
              key={item.name}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-3"
                  onChange={(e) => {
                    handleCompletedStatus(e.target.checked, index)
                  }}
                  value={item.completed}
                  checked={item.checked}
                />
                <p className="capitalize ml-2 text-md">
                  {item.name}{' '}
                  {item.quantity > 1 && (
                    <span className="text-[12px] font-bold">
                      x{item.quantity}
                    </span>
                  )}
                </p>
              </div>
              <div>
                <button
                  className="bg-transparent text-red-600 font-bold"
                  onClick={() => {
                    handleClick(item.name)
                  }}
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export default App
