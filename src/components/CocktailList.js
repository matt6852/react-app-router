import React from 'react'
import Cocktail from './Cocktail'
import Loading from './Loading'
import { useGlobalContext } from '../context'

const CocktailList = () => {
  const {cocktails,loading} =useGlobalContext()

  if(loading ){
    return <Loading/>
  }
  if(cocktails.length<1){
    return (
      <h2 className="section-title lower">
        <span role ="img" aria-label ="cry"> 😢</span> No cocktails found <span role ="img" aria-label ="drink">🍹</span>
      </h2>
    );
  }
  return (
    <section className ="section">
      <h2 className ="section-title">Cocktails</h2>
      <div className ="cocktails-center">
        {cocktails.map((item)=>{
          return <Cocktail key ={item.id} {...item}/>
        })}
      </div>
    </section>
  )
}

export default CocktailList
