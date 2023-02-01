import './singleComic.scss';
import xMen from '../../resources/img/x-men.png';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_KEY, BASE_URL } from '../../service/MarvelSrvice';
import AppBanner from '../appBanner/AppBanner';

const SingleComic = () => {
    const[comics,setComics] = useState(null)
    const {id} = useParams()

    const getComics = async(id) => {
        try {
            const res = await fetch(`${BASE_URL}comics/${id}?${API_KEY}`)
            const {data} = await res.json()
            return setComics(data.results[0])
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        getComics(id)
    },[])

    const altTextDscription = !comics?.description? 'No description for this Comics' : comics.description;
    const altPrice = !comics?.prices[0].price? 'No price this comics' : comics?.prices[0].price;
    const altPage = !comics?.pageCount? 'No information for':comics?.pageCount;

    return (
    <>
    <AppBanner/>
        <div className="single-comic">
            <img src={`${comics?.thumbnail?.path}.${comics?.thumbnail?.extension}`} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{comics?.title}</h2>
                <p className="single-comic__descr">{altTextDscription}</p>
                <p className="single-comic__descr">{altPage} pages</p>
                <p className="single-comic__descr">Language: {comics?.textObjects[0].language}</p>
                <div className="single-comic__price">{altPrice}$</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </div>
    </>
    )
}

export default SingleComic;