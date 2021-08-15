import React, {useEffect, useState} from 'react';
import './App.css'; 
import Tmdb from './Tmdb';
import MoviewRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';
import Header from './components/Header';

// eslint-disable-next-line import/no-anonymous-default-export
export default () =>{

  const [movieList,setMovieList] = useState([]);
  const [featureData,setFeatureData] = useState(null);
  const [blackHeader,setBlackHeader] = useState(false);
  useEffect(()=>{
    const loadAll = async ()=>{
      // Pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list)
      //Pegando o filme em Destaque 
      let orignals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (orignals[0].items.results.length -1));
      let chosen = orignals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id,'tv');
      setFeatureData(chosenInfo);
    }

    
    
    loadAll()
  }, [])

  useEffect(()=>{
    const scrollListener = () =>{
        if(window.scrollY > 10){
          setBlackHeader(true)
        }else{
          setBlackHeader(false)
        }
    }
    window.addEventListener('scroll',scrollListener);
    return () =>{
      window.addEventListener('scroll',scrollListener);
    }
    
  },[])
  return (
   
    <div className="page">

      <Header black={blackHeader} />
      
      {featureData&&
        <FeatureMovie item={featureData} />
      }

     <section className="lists">
      {movieList.map((item,key)=>(
        <MoviewRow 
        key={key} 
        title={item.title}
        items={item.items}
        />
  ))}
     </section>

     <footer>
      Feito por Gustavo R. Maidana <br />
       Direitos de imagem para Netflix <br />
       Dados providos por TMDB
     </footer>
     {movieList.length <=0 && 
     <div className="loading">
       <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Loading" />
     </div>
     }
    </div>
  )
}