import React, { useContext } from 'react';
import { clientContext } from '../context/ClientContext';

const Pagination = () => {

    const { postsPerPage, totalPosts, changePage } = useContext(clientContext)
    const pageNumber = []
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumber.push(i)
    }

    return (
        <div>
            <ul>
                {
                    pageNumber.map(item => (
                        <li onClick={() => {
                            changePage(item)
                            window.scrollTo(0, 0)
                        }} key={item} > {item}</li>
                    ))
                }
            </ul>

        </div>
    );
};

export default Pagination;