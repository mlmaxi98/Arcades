import React, { useEffect, useState } from 'react'
import styles from './Filters.module.scss'
import { getGames, cleanGames } from "../../../Redux/actions/index";
import { useDispatch } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const Filters = (props) => {
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState('')
    const [ordering, setOrdering] = useState('')
    const [page, setPage] = useState(1)
    const nextPage = () => { setPage(page + 1) }
    const prevPage = () => { page > 1 && setPage(page - 1) }
    const handleText = (e) => { setText(e.target.value) }
    const handleSearch = () => { setSearch(text) }
    const genres = [
        { id: 4, name: 'Action' },
        { id: 51, name: 'Indie' },
        { id: 3, name: 'Adventure' },
        { id: 5, name: 'RPG' },
        { id: 10, name: 'Strategy' },
        { id: 40, name: 'Casual' },
        { id: 14, name: 'Simulation' },
        { id: 7, name: 'Puzzle' },
        { id: 11, name: 'Arcade' },
        { id: 83, name: 'Platformer' },
        { id: 1, name: 'Racing' },
        { id: 59, name: 'Massively Multiplayer' },
        { id: 15, name: 'Sport' },
        { id: 6, name: 'Fighting' },
        { id: 19, name: 'Family' },
        { id: 28, name: 'Board Games' },
        { id: 34, name: 'Educational' },
        { id: 17, name: 'Card' },
    ]

    useEffect(() => {
        dispatch(cleanGames())
        dispatch(
            getGames(
                search, //nombre
                genre, //buscar por géneros
                "", //filtrar por plataformas
                ordering, //ordenar de diferentes formas
                "", //ordenar de diferentes formas
                page, //paginado
                null //cantidad de resultados
            )
        );
        //dispatch(getGenres())
        //dispatch(getPlatforms())
    }, [dispatch, search, ordering, genre, page]);
    return (
        <div className={props.dark ? styles.containerDark : styles.container}>
            <div className={styles.filters}>
                <div className={styles.title}>
                    <span>Arcades</span>
                </div>

                <div className={styles.search}>
                    <input type='search' value={text} onChange={handleText} placeholder='Search...' />
                    <button onClick={handleSearch}> <SearchIcon style={{ fontSize: '1.5rem' }} /> </button>
                </div>
                <select value={ordering}
                    onChange={(e) => { setOrdering(e.target.value) }}
                >
                    <option value="">Order by...</option>
                    <option value="name"> Name</option>
                    <option value="released"> Released</option>
                    <option value="added"> Added</option>
                    <option value="created"> Created</option>
                    <option value="updated"> Updated</option>
                    <option value="rating"> Rating</option>
                    <option value="metacritic"> Metacritic</option>
                </select>
                <select value={genre}
                    onChange={(e) => { setGenre(e.target.value) }}
                >
                    <option value="">Filter by Genre...</option>
                    {
                        genres.map((genre) => {
                            return <option value={genre.id}>{genre.name}</option>
                        })
                    }
                </select>
                {/* <select value={ordering} onChange={(e) => { setOrdering(e.target.value) }} >
                    <option value=""></option>
                    <option value="name"> Name </option>
                    <option value="released"> Released </option>
                    <option value="added"> Added </option>
                    <option value="rating">Rating </option>
                </select> */}

                {/* <button onClick={setOrdering(`-${ordering}`)} ></button> */}
                <div className={styles.pages}>
                    <button onClick={prevPage}>
                        <ArrowBackIcon />
                    </button>
                    <button onClick={nextPage}>
                        <ArrowForwardIcon />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Filters
