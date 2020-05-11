import React, { useEffect, useReducer, useCallback, useRef, useState } from 'react';
import axios from 'axios'

import { API_URL } from '../static/API'
import { housesReducer, apiPageReducer } from '../reducers/reducers'
import Card from './Card'
import Spinner from './Spinner'

import './Layout.css'

const Layout = () => {

    const [houses, housesDispatch] = useReducer(housesReducer, { houses: [], loading: true })
    const [apiPage, apiPageDispatch] = useReducer(apiPageReducer, { page: 0 })
    const [maxPage, setMaxPage] = useState(10);

    // make API calls
    useEffect(() => {
        housesDispatch({ type: 'IS_LOADING', loading: true })
        const fetchData = async () => {
            try {
                // Prevent default loading of two pages
                if (apiPage.page !== 0) {
                    const result = await axios.get(
                        `${API_URL}?page=${apiPage.page}&per_page=${maxPage}`,
                    );

                    const { data } = result;
                    const houses = data;
                    housesDispatch({ type: 'ADD_HOUSES', houses })
                    housesDispatch({ type: 'IS_LOADING', loading: false })
                }

            } catch (err) {
                if (err.response && err.response.status === 503) {
                    housesDispatch({ type: 'IS_LOADING', loading: true })
                    // Handle server error
                    fetchData();
                }
                console.error(err)
            }
        };

        fetchData();

    }, [housesDispatch, apiPage.page])

    // implement infinite scrolling with intersection observer
    // https://scotch.io/tutorials/infinite-scroll-in-react-using-intersection-observer
    let bottomBoundaryRef = useRef(null);
    const scrollObserver = useCallback(
        node => {
            new IntersectionObserver(entries => {
                entries.forEach(en => {
                    if (en.intersectionRatio > 0) {
                        apiPageDispatch({ type: 'NEXT_PAGE' });
                    }
                });
            }).observe(node);
        },
        [apiPageDispatch]
    );
    useEffect(() => {
        if (bottomBoundaryRef.current) {
            scrollObserver(bottomBoundaryRef.current);
        }
    }, [scrollObserver, bottomBoundaryRef]);


    let numberInput = React.createRef();
    const handleClick = () => {
        const value = numberInput.current.value;
        setMaxPage(value)
    }

    return (
        <div className="wrapper">
            <label htmlFor="pager" className="input-label">Change max numbers of houses per page (performance testing). Currently {maxPage}</label>
            <div className={'input__add-on'}>
                <input type="number" name="pager" ref={numberInput} className='input-field' />
                <button onClick={handleClick} className='btn-input'>Set</button>
            </div>
            <div className={`grid-container ${houses.loading ? 'is-loading' : ''}`}>
                {houses.houses.map((house, index) => <Card data={house} key={index} />)}
            </div>
            {houses.loading && (
                <Spinner />
            )}
            <div ref={bottomBoundaryRef}></div>
        </div>
    )
}

export default Layout;
