import React, { useEffect, useState } from 'react';
import categoryApi from '../../api/categoryAPI';
import './styles.css'
import { useNavigate, useParams } from 'react-router-dom';

const LitsBrand = () => {
    const [data, setData] = useState()
    let navigate = useNavigate();
    const { categoryId } = useParams();

    useEffect(() => {
        categoryApi.getAll().then(res => {
            if (res.status == 200) {
                setData(res.data)
            }
        })
    }, [])

    return (
        <div className='listBrand'>
            <p style={categoryId == 'all' ? { cursor: 'pointer', textDecoration: 'underline' } : { cursor: 'pointer' }} onClick={() => navigate(`/manager/product/all`)}>All</p>
            {data &&
                data.map((item, i) => (
                    <p key={i} style={categoryId == item._id ? { cursor: 'pointer', textDecoration: 'underline' } : { cursor: 'pointer' }} onClick={() => navigate(`/manager/product/${item._id}`)}>
                        {item.name}
                    </p>
                ))
            }
        </div>
    )
}

export default LitsBrand
