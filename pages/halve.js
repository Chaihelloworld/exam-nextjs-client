import React, { useState, useEffect } from "react";

const Index = ({ List }) => {
    const [hasError, setErrors] = useState(false);
    const [user, setUsers] = useState({});
    const [loading, setLoading] = useState(false);

    async function fetchData() {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/user/`);
        setLoading(false);
            // console.log(user.data[0].id)
            res
            .json()
            // .then(response => response.json())

            // .then(json => {
            //     // console.log(json);
            //     setUsers([json]);
            // })
            .then(res => setUsers(res))
            .catch(err => setError(err));
    }
    useEffect(() => {
        fetchData();
    }, [])
    console.log((user.data))

    return (
        <tr key={item.id} xs={12} className='mb-3'>
            <td>{item.id}</td>
            <td>{item.Code}</td>
            <td>{item.Projectname}</td>
            <td>{item.Date}</td>
            <td>{item.Costomer}</td>
            <td className={styles.colortext}>{item.Payment}</td>
            <td>{item.Slip}</td>
            <td>{item.Status}</td>
        </tr>
    )
};
export default Index;