import React from 'react'
import styles from '../../styles/Home.module.scss'

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage}) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    // console.log(currentPage)
    return (
            <nav className={styles.navpage}>
                <ul  className={styles.pagination}>
                    {pageNumbers.map(number => (
                        <div key={number}  className={currentPage===number ? styles.circle + ' ' +styles.active : styles.circle + ''}  >
                            <a className={styles.buttonpage } onClick={() => paginate(number)} href="#">  
                              {number} 
                            </a>
                        </div>
                    ))}
                </ul>
            </nav>

    )
}
export default Pagination