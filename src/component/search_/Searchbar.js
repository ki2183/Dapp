import './Searchbar.css';
 
function Serchbar() {
  return (
    <div className="container_search">
      <h2>어디로 배달해드릴까요?</h2>
      <form className='form-search-form'>
        <button><span className="material-symbols-outlined">search</span></button>
        <input type="text" placeholder='주소를 입력하세요'></input>
      </form>
    </div>
  );
}

export default Serchbar;