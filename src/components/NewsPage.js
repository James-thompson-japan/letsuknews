import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import NoImage from '../assets/noimage.png'

const NewsPage = ({setShow}) => {

  const [newscategories, setNewscategories] = useState(JSON.parse(localStorage.getItem('categoriestoread')))
  const [index, setIndex] = useState(0)
  const [newstoshow, setNewstoshow] = useState()
  const [isloading, setIsloading] = useState(true)
  let color

  const Editcategories = () => {
    setShow("selectionpage")
  }

  const updateindex = (category) =>{
    setIndex(newscategories.indexOf(category))
  }

  useEffect(() => {
    const fetchitems = async () => {
      const result = await Axios (`https://content.guardianapis.com/search?q=${newscategories[index]}&show-fields=headline,thumbnail,short-url&order-by=relevance&api-key=fd0e09dc-65b5-411d-b073-1a61c531d6c5`)
      setNewstoshow(result.data.response.results)
      console.log(newstoshow)
      setIsloading(false)
    }
    newscategories !== null && fetchitems()
  },[isloading,index])

  return (
    <div className = "max-w-4xl mx-auto ">
      <button onClick = {() => Editcategories()} className = " text-center text-lg bg-blue-100 p-3 rounded-full m-5 w-40">Edit Categories</button>

      <div className=" my-5 flex flex-wrap justify-evenly md:justify-start">
        {newscategories !== null && newscategories.map(category => {
          
          newscategories.indexOf(category) === index ? color = "bg-blue-100" : color = "bg-gray-100"
          return(
         <div key={category} 
              onClick = {() => updateindex(category)}
              className = {`${color} p-2 rounded-full m-2 w-40 cursor-pointer text-center`}>
          {category}
         </div>
         )} )}
      </div>

      <div>
           {isloading ? "Loading...." : 
           localStorage.getItem('categoriestoread') === "[]" ? 
           
           <div className = "text-center text-xl">
           Add some Categories
           </div>
            :
           newstoshow.map(news => 
           <a target="_blank" key={news.webTitle} href={news.webUrl}>
           <div className = "flex items-center bg-gray-100 shadow-2xl m-3 p-2 rounded-lg">
              <img className="w-40 h-20 object-cover m-5" src={news.fields.thumbnail === null ? NoImage : news.fields.thumbnail}/>
              <p>{news.webTitle}</p>
           </div>
           </a>
           )}   
      </div>      




    </div>
  )
}

export default NewsPage
