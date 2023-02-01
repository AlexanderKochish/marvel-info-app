import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_KEY, BASE_URL } from '../../service/MarvelSrvice'
import './searchCharForm.scss'

const SearchCharForm = ({getCharForName}) => {
    const[charName,setCharName] = useState('')
    const[foundChar,setFoundChar] = useState(null)

    const handleSub = (data) => getCharForName(data)

    const searchChar = async(e) => {
        e.preventDefault()
        if(!charName.trim().length)  return 'This field is required'
        try {
            const res = await fetch(`${BASE_URL}characters?name=${charName}&${API_KEY}`)
            const {data} = await res.json()
            handleSub(data.results[0])
            return setFoundChar(data.results[0])
        } catch (error) {
            console.log(error.message);
            return 'The character was not found. Check the name and try again'
        }  
    }

    const content = <div className='char__form-bottom__block'>
        <p >There is! Visit {foundChar?.name} page?</p>
        <Link to={`/character/${foundChar?.id}`}>
        <button className="button button__secondary">
            <div className="inner">TO PAGE</div>
        </button>
        </Link>
    </div>
    
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
        {!foundChar? '' : content}
    </form>
  )
}

export default SearchCharForm