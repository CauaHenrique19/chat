import './style.css'

const SearchFriends = ({ onClose }) => {
    return (
        <div className="search-friends-container">
            <div className="header-search-friends-container">
                <input type="text" placeholder="Pesquisar usuários" />
                <ion-icon name="search-outline"></ion-icon>
                <button onClick={onClose} ><ion-icon name="close-outline"></ion-icon></button>
            </div>      
        </div>
    )
}

export default SearchFriends