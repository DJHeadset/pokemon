import "../App.css"

function Locations ({ cityList, selectCity}) {

    return (
      <>
      <div className='location-title'> Locations: </div>
      <div className='location-name'>
        {cityList.map((city, i) => (
          <h2
             key={i} onClick={() => selectCity(city)}>{city}
          </h2>
        ))}
      </div>
      </>
    )
  }
  
  export default Locations;