import React, { Component } from "react";
import "./charList.scss";
import { BASE_URL, API_KEY } from "../../service/MarvelSrvice";
import Spinner from "../spinner/Spinner";
import CharInfo from "../charInfo/CharInfo";
import RandomChar from "../randomChar/RandomChar";

class CharList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charList: [],
      loading: false,
      error: false,
      offset: 0,
      total: 1,
    };
    this.myRef = React.createRef();
  }

  onLoading = () => {
    this.setState({ loading: true });
  };

  getAllCharacters = async () => {
    this.onLoading();
    try {
      await Promise.all([
        // get first 9 characters and get anothers characters on scroll...
        fetch(
          `${BASE_URL}characters?limit=9&offset=${this.state.offset}&${API_KEY}`
        )
          .then((res) => res.json())
          .then(({ data }) =>
            this.setState(({ charList }) => ({
              charList: [...charList, ...data.results],
              loading:false
            }))
          ),
        // get total number characters
        fetch(`${BASE_URL}characters?${API_KEY}`)
          .then((res) => res.json())
          .then(({ data }) => this.setState({ total: data.total })),
      ]);
    } catch (error) {
      console.log(error.message);
    }
  };

  setLimitChars = () => {
    this.onLoading();
    this.setState(({ offset }) => ({ offset: offset + 9, loading: false }));
  };

  componentDidMount() {
    let callback = (entries) => {
      if (entries[0].isIntersecting && this.state.offset < this.state.total) {
        this.setLimitChars();
      }
    };

    let observer = new IntersectionObserver(callback);
    observer.observe(this.myRef.current);
    if(this.state.offset >= this.state.total) observer.disconnect()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.offset !== this.state.offset) {
      this.getAllCharacters();
    }
  }

  render() {
    const { charList, error, loading } = this.state;
    const { getCharId,charId,getCharForName } = this.props;
   
    const spinner = loading ? <Spinner /> : null;
    const err = error ? "Something wrong" : null;
    const content = !error ? (
      <ListItems charList={charList} getCharId={getCharId} charId={charId}/>
    ) : null;
    return (
      <div className="char__wrapper">
        <RandomChar/>
        <div className="char__content">
            <div className="char__list">
              {err}
              {content}
              {spinner}
              <div ref={this.myRef}></div>
            </div>
          <CharInfo charId={charId} getCharForName={getCharForName}/>
        </div>
      </div>
    );
  }
}

const ListItems = ({ charList, getCharId }) => {


  const handleSelect = (index,id) => {
    let list = document.querySelectorAll('.char__item')
    list.forEach(item => item.classList.remove('char__item_selected'))
    list[index].classList.add('char__item_selected')
    getCharId(id)
  }
    
  return (
    <ul className="char__grid">
      {charList.map(({ id, name, thumbnail },index) =>( 
        <li onClick={()=>handleSelect(index,id)} key={id} className='char__item'>
          <img
            src={`${thumbnail.path}.${thumbnail.extension}`}
            alt="character"
          />
          <div className="char__name">{name}</div>
        </li>))}
    </ul>
  );
};
export default CharList;
