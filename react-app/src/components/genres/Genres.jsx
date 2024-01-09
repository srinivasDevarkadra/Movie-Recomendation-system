import React from 'react';
import "./style.scss";

const Genres = ({ genres }) => {
    // Assuming genres is now an array of strings passed as a prop
    return (
      <div className='genres'>
          {genres?.map((genreName) => (
              <div key={genreName} className="genre">
                  {genreName}
              </div>
          ))}
      </div>
    )
  }
  

export default Genres