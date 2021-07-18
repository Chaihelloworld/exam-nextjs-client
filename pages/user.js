import React, { useState, useEffect } from 'react'
import styles from '../styles/Home.module.scss'
import { fileTextO } from 'react-icons-kit/fa/fileTextO'
import { Icon } from 'react-icons-kit'

const User = ({ prod, loading, currentPage,index }) => {
    const num = [];
    // if(loading) {
    //     return <h2>Loading...</h2>;
    // }
    const formatToCurrency = amount => {
        return "" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    };

    return <tr key={prod.id} xs={20} className={styles.fontzise} >
                <td>{currentPage == 1 ? (index+1) : (index+1) + ((currentPage - 1) * 10) }</td>
                <td>{prod.Code}</td>
                <td>{prod.Projectname}</td>
                <td>{prod.Date}</td>
                <td>{prod.Costomer}</td>
                <td>{formatToCurrency(prod.Payment)}</td>
                {/* <td>{prod.Slip}</td> */}
                <td><button className={styles.btnfile}><Icon size={20} icon={fileTextO} className={styles.colorfile} /></button></td>
                <td>
                    {prod.Status == "01" ? ((
                        <div className={styles.stylestatus}>
                            <div className={styles.statusA}>รอชำระเงิน</div>
                            <div >-</div>
                        </div>
                    )) : prod.Status == "02" ? ((
                        <div className={styles.stylestatus}>
                            <div className={styles.statusB}>รอตรวจสอบ</div>
                            <div >-</div>
                        </div>
                    )) : prod.Status == "03" ? ((
                        <div className={styles.stylestatus}>
                            <div className={styles.statusC}>จ่ายแล้ว</div>
                            <div >-</div>
                        </div>
                    )) :
                        prod.Status == "04" ? ((
                            <div className={styles.stylestatus}>
                                <div className={styles.statusD}>ไม่สำเร็จ</div>
                                <div >-</div>
                            </div>
                        )) : prod.Status == "05" ? ((
                            <div className={styles.stylestatus}>
                                <div className={styles.statusE}>ยกเลิก</div>
                                <div >-</div>
                            </div>
                        )) : (<div>error</div>)
                    }
                </td>
                {/* <td>{TotalCurrency(prod.Payment)}</td> */}
                {/* <td  className={styles.status}>{prod.Status}</td> */}
            </tr>
}
export default User;
