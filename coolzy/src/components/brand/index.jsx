import { React } from 'react';
import './styles.css'

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';

const Branch = () => {

    const data = [
        {
            id: 0,
            title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            overview: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
            detail: ['There are many variations of passages of Lorem Ipsum available', 'When an unknown printer took a galley of type and scrambled it to make a type specimen book.'],
            img: 'https://product.hstatic.net/1000378196/product/z3098049749288_41a68ec3868ae439ad8d04d5e4d4d1c0_564acd452775436e8ddf45206585f0bb_master.jpg'

        },
        {
            id: 1,
            title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            overview: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
            detail: ['There are many variations of passages of Lorem Ipsum available', 'When an unknown printer took a galley of type and scrambled it to make a type specimen book.'],
            img: 'https://product.hstatic.net/1000378196/product/z3103604695773_21eb1c870b49c5bcf1d1a6d50e082a63_5362313b9adf4b989d7483416f892a8e_master.jpg'

        },
        {
            id: 2,
            title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            overview: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. ',
            detail: ['There are many variations of passages of Lorem Ipsum available', 'When an unknown printer took a galley of type and scrambled it to make a type specimen book.'],
            img: 'https://product.hstatic.net/1000378196/product/z3120288098003_f0080c3e1096c636e04af28ee35112b9_13b82b44878d4cf4a3e2d3e006b605c7_master.jpg'

        },
    ]

    return (
        <div className="branch__container">
            {data.map((item, i) => (
                <BranchItem key={i} item={item} />
            ))}
        </div>
    )
}

const CustomButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[900],
    '&:hover': {
        backgroundColor: grey[700],
    },
    padding: '6px 50px',
    margin: '15px 0px',
    borderRadius: '10px'

}));

const BranchItem = props => {
    const item = props.item
    return (
        <div>
            {item.id % 2 == 0 ?
                <div className='branch__item__container'>
                    <img className='branch__item__content__poster' src={item.img} alt='' />

                    <div className='branch__item__content__info'>
                        <h2>{item.title}</h2>
                        <p>{item.overview}</p>

                        <ul>
                            {
                                item.detail.map((txt, i) => (
                                    <li key={i}>{txt}</li>
                                ))
                            }

                        </ul>

                        <CustomButton > Detail</CustomButton>
                    </div>
                </div>
                :
                <div className='branch__item__container'>
                    <div className='branch__item__content__info'>
                        <h2>{item.title}</h2>
                        <p>{item.overview}</p>

                        <ul>
                            {
                                item.detail.map((txt, i) => (
                                    <li key={i}>{txt}</li>
                                ))
                            }

                        </ul>

                        <CustomButton > Detail</CustomButton>
                    </div>

                    <img className='branch__item__content__poster' src={item.img} alt='' />

                </div>
            }
        </div>


    )
}
export default Branch
