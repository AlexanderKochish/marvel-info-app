import AppHeader from "../appHeader/AppHeader";
import CharList from "../charList/CharList";
import { Component } from 'react';
import { Route, Routes } from "react-router-dom";
import ComicsList from '../comicsList/ComicsList'
import SingleComic from "../singleComic/SingleComic";
import CharPage from "../charPage/CharPage";

class App extends Component{

    state = {
        charId: 0,
        foundChar:null
    }

    getCharId = (id) => {
        this.setState({charId:id})
    }
    
    getCharForName = (name) => {
        this.setState({ foundChar: name })
    }

    render(){
        const { charId,foundChar } = this.state;
console.log(location.pathname);
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<CharList getCharId={this.getCharId} charId={charId} getCharForName={this.getCharForName}/>}/>
                        <Route path="/comics" element={<ComicsList/>}/>
                        <Route path={`/comics/:id`} element={<SingleComic />}/>
                        <Route path={`/character/:id`} element={<CharPage foundChar={foundChar}/>}/>
                    </Routes>
                </main>
            </div>
        )
    }   
}

export default App;