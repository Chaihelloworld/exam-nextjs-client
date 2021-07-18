
import styles from '../styles/Home.module.scss'
import { Icon } from 'react-icons-kit'
import { ic_people_outline } from 'react-icons-kit/md/ic_people_outline'
import { ic_assignment } from 'react-icons-kit/md/ic_assignment'
import { ic_developer_board } from 'react-icons-kit/md/ic_developer_board'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import User from './user'
import Pagination from './helpful/pagination'
import Image from 'next/image'

const Home = ({ data, itemsPerPage, startFrom }) => {
    const [hasError, setErrors] = useState(false);
    const [user, setUsers] = useState([]);
    const [userAll, setUsersAll] = useState([]);

    const [cal, setCal] = useState([]);
    const [loading, setLoading] = useState(false);
    const [leaghtall, setLeaghtall] = useState([]);
    const [leaght, setLeaght] = useState([]);
    const [leaght02, setLeaght02] = useState([]);
    const [leaght03, setLeaght03] = useState([]);
    const [leaght04, setLeaght04] = useState([]);
    const [leaght05, setLeaght05] = useState([]);
    const [toggleState, setToggleState] = useState("");

    const [runFirstOnly, setRunFirstOnlyt] = useState(true)

    const [q, setQ] = useState("")

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    const [search, setSearch] = useState();
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [Money, setMoney] = useState('0.00')

    // async function fetchData() {
    //     setLoading(true);
    //     const res = await axios.get(`${process.env.NEXT_PUBLIC_API}user`)
    //         .then(res => {
    //             setUsers(res.data)
    //         })
    //         .catch(err => setError(err));
    //     setLoading(false)
    // }
    function separator(numb) {
        var str = numb.toString().split(".");
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return str.join(".");
    }
    

    function calculate() {
        let cal_money = 0
        if(user.length > 0) {
            
            user.forEach(e => {
                cal_money += e.Payment
            });
        }
        let add_comma = separator(cal_money)
        setMoney(add_comma)
    }

    async function fetchLeaght(toggleState) {
        setLoading(true);
        console.log('toggleState', toggleState)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API}user?${toggleState}`)
            .then( async res => {
                // setUsers(res.data)
                setUsers(res.data)
                setUsersAll(res.data)
                setCal(res)
            })
            .catch(err => setError(err));
        const res0 = await axios.get(`${process.env.NEXT_PUBLIC_API}user?`)
            .then(res0 => {
                // setUsers(res.data)
                setLeaghtall(res0.data)
            })
            .catch(err => setError(err));
        const res01 = await axios.get(`${process.env.NEXT_PUBLIC_API}user?Status=01`)
            .then(res01 => {
                // setUsers(res.data)
                setLeaght(res01.data)
            })
            .catch(err => setError(err));
        const res02 = await axios.get(`${process.env.NEXT_PUBLIC_API}user?Status=02`)
            .then(res02 => {
                // setUsers(res.data)
                setLeaght02(res02.data)
            })
            .catch(err => setError(err));
        const res03 = await axios.get(`${process.env.NEXT_PUBLIC_API}user?Status=03`)
            .then(res03 => {
                // setUsers(res.data)
                setLeaght03(res03.data)
            })
            .catch(err => setError(err));
        const res04 = await axios.get(`${process.env.NEXT_PUBLIC_API}user?Status=04`)
            .then(res04 => {
                // setUsers(res.data)
                setLeaght04(res04.data)
            })
            .catch(err => setError(err));
        const res05 = await axios.get(`${process.env.NEXT_PUBLIC_API}user?Status=05`)
            .then(res05 => {
                // setUsers(res.data)
                setLeaght05(res05.data)
            })
            .catch(err => setError(err));
        setLoading(false)

    }

    useEffect(() => {
        calculate()
    }, [user])

    // useEffect(() => {
    //     // fetchData();
    //     fetchLeaght();
    // }, [])

    function handleChange(e) {
        setPostsPerPage(e.target.value);
    }

    const indexOfLastUser = currentPage * postsPerPage;
    const indexOfFirstUser = indexOfLastUser - postsPerPage;
    const currentUser = user.slice(indexOfFirstUser, indexOfLastUser);
    //change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    function searchs(rows) {
        const columns = rows[0] && Object.keys(rows[0])

        let data = userAll.filter(
            (row) => row.Status.toLowerCase().indexOf(q) > -1 ||
                row.Code.toLowerCase().indexOf(q) > -1 ||
                row.Projectname.toLowerCase().indexOf(q) > -1 ||
                row.Costomer.toLowerCase().indexOf(q) > -1
        );
        if(data.length !== user.length){
            setUsers(data)

        }
        data = data.slice(indexOfFirstUser, indexOfLastUser)
        return data
    }

    const toggleTab = (index) => {
        setToggleState(index);
        fetchLeaght(index);
        setCurrentPage(1)
    };

 
    useEffect(() => {
        if (runFirstOnly) {
            fetchLeaght('');
            calculate()
            setRunFirstOnlyt(false);
        }
    })


    return (
        <div className={styles.container}>

            <div className={styles.container_menu}>

                <div className={styles.title}>NVSL - IMS</div>
                <div className={styles.nav}>
                    <div className={styles.item}>
                        <div className={styles.out_top}>
                        </div>
                        <div className={styles.out_bottom}>
                        </div>
                        <div className={styles.list}><Icon size={28} icon={ic_developer_board} /> Dashboard</div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.list}>
                            <div className={styles.out_top}>
                            </div>
                            <div className={styles.out_bottom}>
                            </div><Icon size={28} icon={ic_people_outline} /> Partner</div></div>
                    <div className={styles.item + " " + styles.active} >
                        <div className={styles.out_top}>
                        </div>
                        <div className={styles.out_bottom}>
                        </div>
                        <div className={styles.list} ><Icon size={28} icon={ic_assignment} /> Invoice</div>
                    </div>
                </div>
            </div>
            <div className={styles.container_main}>
                <div className={styles.displaycard2}>
                    <div className={styles.filter}>
                        <div className={styles.inputsize}>
                            <input className={styles.inputs} placeholder='search' value={q} onChange={(e) => setQ(e.target.value)}
                            />
                            <div className={styles.tableStyle2}>
                                <a>Project management </a>  {'>'}  <a>Invoice</a>
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.user_contaimer}>
                            <Image className={styles.user_img} src='/image.jpg' alt="Picture of the author" width={50} height={50}/>
                                {/* <img src='/image.jpg' /> */}
                            </div>
                            <div className={styles.displaycard}>
                                <div className={styles.text}>
                                    accounting Manager
                                </div>
                                <div className={styles.texttwo}>
                                    Gong Yoo
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.displaycard3}>
                        <p className={styles.textthree}>Invoice</p>  <p className={styles.textthree1}>(ใบแจ้งหนี้)</p>
                    </div>
                    <div className={styles.tableStyle}>
                        <div className={styles.headfilter + " " + styles.tab}>
                            {/* className={styles.card1ctn + " " + styles.activectn} */}
                            <button
                                className={toggleState === "" ? styles.card1ctn : styles.activectn} onClick={() => toggleTab("")} >
                                <div className={styles.card1} > ทั้งหมด ({leaghtall.length})</div>
                            </button>
                            <button className={toggleState === 'Status=01' ? styles.card1ctn : styles.activectn} onClick={() => toggleTab('Status=01')}>
                                <div className={styles.card2} >รอชำระเงิน ({leaght.length})</div>
                            </button>
                            <button className={toggleState === 'Status=02' ? styles.card1ctn : styles.activectn} onClick={() => toggleTab('Status=02')} >
                                <div className={styles.card3} >รอตรวจสอบ ({leaght02.length})</div>
                            </button>
                            <button className={toggleState === 'Status=03' ? styles.card1ctn : styles.activectn} onClick={() => toggleTab('Status=03')}>
                                <div className={styles.card4} >จ่ายแล้ว ({leaght03.length})</div>
                            </button>
                            <button className={toggleState === 'Status=04' ? styles.card1ctn : styles.activectn} onClick={() => toggleTab('Status=04')}>
                                <div className={styles.card5} >ไม่สำเร็จ ({leaght04.length})</div>
                            </button>
                            <button className={toggleState === 'Status=05' ? styles.card1ctn : styles.activectn} onClick={() => toggleTab('Status=05')}>
                                <div className={styles.card6} >ยกเลิก ({leaght05.length})</div>
                            </button>

                        </div>
                        <div id="S01" className={styles.displays}>
                            <h2>1</h2>
                            <p>1</p>
                        </div>
                        <div id="S02" className={styles.displays}>
                            <h2>2</h2>
                            <p>2</p>
                        </div>
                        {/* </div> */}

                        <div className={styles.containerText}>
                            <div className={styles.text_1}>
                                <p>ยอดชำระทั้งหมด</p>
                            </div>
                            <div className={styles.text_2}>
                                <p>{Money}</p>
                            </div>
                            <div className={styles.text_3}>
                                <p>บาท</p>
                            </div>
                        </div>

                        <div className={styles.displaycard4}>

                            <div className={styles.displaycard4_1}>
                                <p className={styles.fontzisehead}>Show</p>
                                <select
                                    className={styles.inputselect}
                                    onChange={handleChange}
                                >
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                </select>
                                <p className={styles.fontzisehead}> Entries</p>

                            </div>

                            <div className={styles.displaycard4_2}>
                                <table >
                                    <thead className={styles.stylecolor}>
                                        <tr className={styles.styleth}>
                                            <th>NO. </th>
                                            <th>Code </th>
                                            <th>Project Name</th>
                                            <th>Date</th>
                                            <th>Costomer Name</th>
                                            <th>Payment Amount</th>
                                            <th>Slip</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className={styles.styletd}>
                                    {searchs(currentUser).length > 0 ? searchs(currentUser).map(
                                       (e, index) =>  <User key={e.id} prod={e} loading={loading} index={index} currentPage={currentPage} />
                                    ) : ''}
                                   </tbody>
                                </table>
                                <div>
                                    <Pagination postsPerPage={postsPerPage}
                                        totalPosts={user.length}
                                        paginate={paginate}
                                        currentPage={currentPage} />
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home;
