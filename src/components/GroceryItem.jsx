/* eslint-disable react/prop-types */
const GroceryItem = ({ item }) => {
  return (
    <li className="flex justify-between  list-none py-1 w-[300px] m-3 border-solid border border-b-black">
      <div className="flex items-center">
        <input type="checkbox" className="mr-3" />
        <p className="capitalize ml-2 text-md">{item.name}</p>
      </div>
      <div>
        <button className="bg-transparent text-red-600 font-bold">X</button>
      </div>
    </li>
  )
}

export default GroceryItem
