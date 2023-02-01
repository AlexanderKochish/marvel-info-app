import './charInfo.scss';
import MySkeleton from '../skeleton/MySkeleton';
import { Component } from 'react';
import { API_KEY, BASE_URL } from '../../service/MarvelSrvice';
import Spinner from '../spinner/Spinner';
import SearchCharForm from '../searchForm/SearchCharForm';

class CharInfo extends Component{

    state = {
        char: null,
        loading: false,
        error: false
    }

    onLoading = () => {
        this.setState({ loading: true})
    }

    getChar = async()=>{
        const {charId} = this.props;
        if(!charId) return;
        this.onLoading()
        try {
            const res = await fetch(`${BASE_URL}characters/${charId}?${API_KEY}`)
            const {data} = await res.json()
            return this.setState({char: data.results[0],loading:false})
        } catch (error) {
           console.log(error.message) 
        }
    }

    componentDidUpdate(prevProps,prevState){
       if(this.props.charId !== prevProps.charId){
        this.getChar()
       }
    }
    render(){
        const {char,loading,error} = this.state
        const { getCharForName } = this.props
        const skeleton = char || loading || error? null : <MySkeleton/>
        const spinner = loading? <Spinner/>:null;
        const err = error? 'Something wrong':null;
        const content = !(loading || error || !char)?  <CardInfo char={char}/> : null;
        return (
            <div className='char__info-wrapper'>
            {skeleton}
            {spinner}
            {err}
            {content}
            <SearchCharForm getCharForName={getCharForName}/>
            </div>
        )
    }
}

const CardInfo = ({char}) => {
    const altDescriptionText = !char.description? 'No description this Character': char.description;

    return(
        <div className="char__info">
                <div className="char__basics">
                    <img src={`${char.thumbnail.path}.${char.thumbnail.extension}`} alt="character"/>
                    <div>
                        <div className="char__info-name">{char.name}</div>
                        <div className="char__btns">
                            <a href={char.urls[0].url} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={char.urls[1].url} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {altDescriptionText}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    
                    {!char.comics.items.length? 
                    'No comics this Character' 
                    : char.comics.items.map((item,index)=>{
                        if(index >= 10) return
                        return(
                        <li key={index} className="char__comics-item">
                            {item.name}
                        </li>
                    )})}
                </ul>
            </div>
    )
}
export default CharInfo;