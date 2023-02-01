import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import { Component } from "react";
import { API_KEY, BASE_URL } from "../../service/MarvelSrvice";
import Spinner from "../spinner/Spinner";

class RandomChar extends Component {
  state = {
    randomChar: null,
    loading: true,
    error: false,
  };

  onLoading = () => {
    this.setState({ loading: true });
  };

  getRandomChar = async () => {
    this.onLoading();
    let id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    try {
      const res = await fetch(`${BASE_URL}characters/${id}?${API_KEY}`);
      const {data} = await res.json();
      return this.setState({
        randomChar: data.results[0],
        loading: false,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  componentDidMount() {
    this.getRandomChar();
  }

  render() {
    const { randomChar, loading, error } = this.state;

    const spinner = loading ? <Spinner /> : null;
    const err = error ? "Error Service" : null;
    const cardRandomChar = !(loading || error) ? (
      <RandomCard randomChar={randomChar} />
    ) : null;

    return (
      <div className="randomchar">
        {spinner}
        {err}
        {cardRandomChar}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button onClick={this.getRandomChar} className="button button__main">
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

const RandomCard = ({ randomChar }) => {
  
  const altDescriptionText = !randomChar?.description
    ? "Not description this Character"
    : randomChar?.description;

  return (
    <div className="randomchar__block">
      <img
        src={`${randomChar?.thumbnail.path}.${randomChar?.thumbnail.extension}`}
        alt="Random character"
        className="randomchar__img"
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{randomChar?.name}</p>
        <p className="randomchar__descr">{altDescriptionText}</p>
        <div className="randomchar__btns">
          <a href={randomChar?.urls[0].url} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a
            href={randomChar?.urls[1].url}
            className="button button__secondary"
          >
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
