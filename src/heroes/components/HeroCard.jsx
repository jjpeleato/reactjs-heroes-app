import { Link } from "react-router";

const CharactersByHero = ({ alterEgo, characters }) => {
  if (alterEgo === characters) return <></>;
  return <p className="card-text">{characters}</p>;
};

export const HeroCard = ({
  id,
  superhero,
  alterEgo,
  firstAppearance,
  characters,
}) => {
  return (
    <div className="col animate__animated animate__fadeIn">
      <div className="card">
        <div className="row no-gutters">
          <div className="col-4">
            <img
              src={`/assets/heroes/${id}.jpg`}
              className="card-img"
              alt={superhero}
            />
          </div>
          <div className="col-8">
            <div className="card-body">
              <h5 className="card-title">{superhero}</h5>
              <p className="card-text">{alterEgo}</p>
              <CharactersByHero alterEgo={alterEgo} characters={characters} />
              <p className="card-text">
                <small>{firstAppearance}</small>
              </p>
              <Link to={`/hero/${id}`}>More info</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
