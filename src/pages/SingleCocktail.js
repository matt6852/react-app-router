import React from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [cockatail, setCocktail] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    async function getCoctail() {
      try {
        const resp = await fetch(`${url}${id}`);
        const data = await resp.json();
        const { drinks } = data;
        if (drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = drinks[0];
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];
          const newCocktail = {
            name,
            image,
            info,
            category,
            instructions,
            ingredients,
            glass
          };
          setCocktail(newCocktail)
          setLoading(false)
          
        } else {
          setCocktail(null);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getCoctail();
  }, [id]);
  if(loading){
    return<Loading/>

  }
  if(!cockatail){

    return <h2 className = "">somting bad happend ((</h2>
  }
  const {name,image,category,info,glass,instructions,ingredients}= cockatail
  return (
    <section className ="section cocktail-section">
      <h2 className ="section-title">{name}</h2>
      <div className ="drink">
        <img src={image} alt={name}/>
        <div className ="drink-info">
          <p>
            <span className ="drink-data">name: </span>
            {name}
          </p>
          <p>
            <span className ="drink-data">category: </span>
            {category}
          </p>
          <p>
            <span className ="drink-data">info: </span>
            {info}
          </p>
          <p>
            <span className ="drink-data">glass: </span>
            {glass}
          </p>
          
          <p>
            <span className ="drink-data">isntruction: </span>
            {instructions}
          </p>
          <p>
            <span className ="drink-data">ingredients: </span>
            {ingredients.map((item,index)=>{
              return item ? <span key={index}>{item}</span>: null
            })}
          </p>

        </div>
      </div>
     
      <Link to ="/" className ="btn-primary">Back Home</Link>
    </section>
  );
};

export default SingleCocktail;
