import "../App.css";

function Welcome() {

  const handleClick = async() => {
    fetch("/api/welcome")
    .then((res) => console.log(res))
  }

  return (
    <>
      <div>YO</div>
      <button onClick={handleClick}>WELCOME</button>
    </>
  );
}

export default Welcome