import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_KEY, BASE_URL } from '../../service/MarvelSrvice'
import './searchCharForm.scss'

const SearchCharForm = ({getCharForName}) => {
    const[charName,setCharName] = useState('')
    const[foundChar,setFoundChar] = useState(null)
    const[notFound,setNotFound] = useState('')

    const handleSub = (data) => getCharForName(data)

    const searchChar = async(e) => {
        e.preventDefault()
        if(charName.trim().length === 0) return setNotFound('This field is required')
        try {
            const res = await fetch(`${BASE_URL}characters?name=${charName}&${API_KEY}`)
            const {data} = await res.json()
            if(!data.results.length) return setNotFound('The character was not found. Check the name and try again')
            handleSub(data.results[0])
            setFoundChar(data.results[0])
        } catch (error) {
            console.log(error.message);
        }  
    }

    const content = <div className='char__form-bottom__block'>
        <p>There is! Visit {foundChar?.name} page?</p>
        <Link to={`/character/${foundChar?.id}`}>
        <button className="button button__secondary">
            <div className="inner">TO PAGE</div>
        </button>
        </Link>
    </div>

    const notFoundSearch = <div className='char__form-notfound'>{notFound}</div>
  return (
    <form onSubmit={searchChar} className='char__form'>
        <label>Or find a character by name:</label>
        <input 
            value={charName} 
            onChange={(e) => setCharName(e.target.value)} 
            type="text" 
            placeholder='Enter name'
        />
        <button className="button button__main">
            <div className="inner">find</div>
        </button>
        {!foundChar? notFoundSearch : content}
    </form>
  )
}

export default SearchCharForm