import './comicsList.scss';
import React, { Component } from 'react';
import { API_KEY, BASE_URL } from '../../service/MarvelSrvice';
import Spinner from '../spinner/Spinner';
import { Link } from "react-router-dom";
import AppBanner from '../appBanner/AppBanner';

class ComicsList extends Component{
    constructor(props){
        super(props)
        this.state = {
            comicsList: [],
            loading: true,
            error: false,
            offset:0,
            total:1
        }
        this.myRef = React.createRef()
    }

    onLoading = () => {
        this.setState({ loading: true })
    }

    getAllComics = async() => {
        this.onLoading()
        try {
            await Promise.all([
                fetch(`${BASE_URL}comics?limit=6&offset=${this.state.offset}&${API_KEY}`)
                .then((res) => res.json())
                .then(({data}) => this.setState(({comicsList})=>({
                    comicsList:[...comicsList,...data.results],
                    loading: false
                })),
    
                fetch(`${BASE_URL}comics?${API_KEY}`)
                .then((res) => res.json())
                .then(({data}) => this.setState({
                    total:data.total,
                }))),
            ]);   
        } catch (error) {
           console.log(error.message) 
        } 
    }

    setOffsetComics = () => {
        this.onLoading();
        this.setState(({offset})=>({offset: offset + 3}))
    }
    componentDidMount(){
        let callback = (entries) => {
            if (entries[0].isIntersecting && this.state.offset < this.state.total) {
              this.setOffsetComics();
            }
          };
      
          let observer = new IntersectionObserver(callback);
          observer.observe(this.myRef.current);
          if(this.state.offset >= this.state.total) observer.disconnect()
    }
    
    componentDidUpdate(prevProps,prevState){
        if(prevState.offset !== this.state.offset){
            this.getAllComics()
        }
    }
    render(){
        const { loading,comicsList,error } = this.state;

        const spinner = loading? <Spinner/> : null;
        const err = error? 'Something wrong': null;
        const content = !error? <ListItems comicsList={comicsList}/> : null;

        return (
            <div className="comics__list">
                <AppBanner/>
                {content}
                {err}
                <div ref={this.myRef}></div>
                <div className='comics__spinner'>
                {spinner}
                </div>
            </div>
        )
    }  
}

const ListItems = ({comicsList}) =>{
    return (
        <ul className="comics__grid">
            {comicsList.map(({title,id,prices,thumbnail})=>( 
            <li key={id} className="comics__item">
                <Link  to={`/comics/${id}`}>
                    <img  
                        src={`${thumbnail.path}.${thumbnail.extension}`} 
                        alt="ultimate war" 
                        className="comics__item-img"
                    />
                    <div className="comics__item-name">{title}</div>
                    <div className="comics__item-price">{prices.prise}</div>
                </Link>
            </li>))}
        </ul>
    )
}

export default ComicsList;