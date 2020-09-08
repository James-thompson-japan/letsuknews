import React, { useState, useEffect } from 'react'

const SelectionPage = ({setShow}) => {

const [startingcategorylist, setStartingcategorylist] = useState([])
const [categoriestoread, setCategoriestoread] = useState([])

useEffect(() => {
  localStorage.getItem('categorylist') === null && localStorage.setItem('categorylist',JSON.stringify(["Business", "Entertainment", "Health", "Science", "Sports", "Technology"]))
  localStorage.getItem('categoriestoread') === null && localStorage.setItem('categoriestoread',JSON.stringify([]))
},[categoriestoread,startingcategorylist])


useEffect(() => {
  setStartingcategorylist(JSON.parse(localStorage.getItem('categorylist')))
  setCategoriestoread(JSON.parse(localStorage.getItem('categoriestoread')))
},[])


const addtoToread = (category) => {
  let array =  JSON.parse(localStorage.getItem('categorylist'))
  let newarray = array.filter(cat => cat !== category)
  localStorage.setItem('categorylist', JSON.stringify(newarray))
  setStartingcategorylist(newarray)
  let toread = JSON.parse(localStorage.getItem('categoriestoread'))
  toread.push(category)
  localStorage.setItem('categoriestoread',JSON.stringify(toread))
  setCategoriestoread(toread)
}

const removefromToread = (category) => {
  let toreadarray = JSON.parse(localStorage.getItem('categoriestoread'))
  let newtoreadarray = toreadarray.filter(cat => cat !== category)
  localStorage.setItem('categoriestoread',JSON.stringify(newtoreadarray))
  setCategoriestoread(newtoreadarray)
  let newcategoryarray = JSON.parse(localStorage.getItem('categorylist'))
  newcategoryarray.push(category)
  localStorage.setItem('categorylist',JSON.stringify(newcategoryarray))
  setStartingcategorylist(newcategoryarray)
}

const Continue = () => {
  localStorage.setItem('selectionpage',"no")
  setShow("newspage")
}



  return (

    <div className = "max-w-3xl mx-auto text-center">



      <h1 className="text-2xl my-10">What do you want to read about ?</h1>
        <div className=" my-5 flex flex-wrap justify-evenly md:justify-start">

          {startingcategorylist !== null &&
          startingcategorylist.map(category => 
          <button 
          onClick = {() => addtoToread(category)}
          key = {category}
          className = "bg-gray-100 p-2 rounded-full m-2 w-40 "
          >
            {category}
            <i className="far fa-plus-square self-center ml-2"></i>
          </button>
          )}
        </div>      




      <h1 className="text-2xl text-center ">I want to read about</h1>
      <div className=" my-5 flex flex-wrap justify-evenly md:justify-start">

          {categoriestoread !== null &&
          categoriestoread.map(category => 
          <button 
          onClick = {() => removefromToread(category)}
          key = {category}
          className = "bg-gray-100 p-2 rounded-full m-2 w-40"
          >
            {category}
            <i className="far fa-minus-square self-center ml-2"></i>
          </button>
          )}
          </div>   

          <button onClick = {() => Continue()} className = "text-lg bg-blue-100 p-3 rounded-full m-5 mt-20 w-40">Continue</button>

    </div>
  )
}

export default SelectionPage
