import React, { useState, useEffect } from 'react'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import { styled } from '@mui/material/styles';
import "swiper/css";
import { grey } from '@mui/material/colors';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import style from './style'
import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useDispatch } from 'react-redux';
import { addSlidedata } from '../../redux/slices/slidedataSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import cloudinaryApi from '../../api/cloudinaryAPI';
import clothesApi from './../../api/clothesAPI';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import homePageAssetApi from '../../api/homePageAssetAPI';
import { updateHomePageAsset } from '../../redux/slices/homepageAssetSlice';
import { Error, Success } from '../../components/alert/alert';

const filter = createFilterOptions();

export const HomePageAssets = () => {

    const data = [
        {
            id: '0',
            title: 'Lorem Ipsum',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
            background: 'https://images.unsplash.com/photo-1503342331296-c8ca3b8dd0a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            poster: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
        },
        {
            id: '1',
            title: 'Lorem Ipsum',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
            background: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
            poster: 'https://images.unsplash.com/photo-1531287333398-6d7bd77ef790?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
        },
        {
            id: '2',
            title: 'Lorem Ipsum',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
            background: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            poster: 'https://images.unsplash.com/photo-1542596594-649edbc13630?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
        },
        {
            id: '3',
            title: 'Lorem Ipsum',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
            background: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            poster: 'https://images.unsplash.com/photo-1496124134604-7493ec63de68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
        },
    ]

    const dispatch = useDispatch()

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    const [slideNumber, setSlideNumber] = useState(0)
    const [index, setIndex] = useState(1)
    const [listSlide, setListSlide] = useState([])
    const [slide, setSlide] = useState({
        title: '',
        description: '',
        background: [],
        poster: []
    })
    const [displaySlideNumber, setDisplaySlideNumber] = useState('hidden')
    const [cannotNext, setCannotNext] = useState(false)

    const handleChangeSlideNumber = () => {
        setDisplaySlideNumber('visible')
        setCannotNext(false)
        setIndex(1)
    }

    const handlePickPoster = (e) => {
        if (e.target.files) {
            const listFile = []
            for (let i = 0; i < e.target.files.length; i++) {
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[i])
                reader.onloadend = () => {
                    listFile.push(reader.result);
                    if (i == e.target.files.length - 1) {
                        let temp = slide.poster.concat(listFile)
                        setSlide({ ...slide, poster: temp })
                    }
                }
            }
        }
    }

    const handlePickBackground = (e) => {
        if (e.target.files) {
            const listFile = []
            for (let i = 0; i < e.target.files.length; i++) {
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[i])
                reader.onloadend = () => {
                    listFile.push(reader.result);
                    if (i == e.target.files.length - 1) {
                        let temp = slide.background.concat(listFile)
                        setSlide({ ...slide, background: temp })
                    }
                }
            }
        }
    }

    const handleNext = () => {
        let temp = listSlide
        if (index >= slideNumber) {
            temp.push(slide)
            setSlide({
                title: '',
                description: '',
                background: [],
                poster: []
            })
            setCannotNext(true)
            console.log(listSlide)
        } else {
            temp.push(slide)
            setSlide({
                title: '',
                description: '',
                background: [],
                poster: []
            })
            let i = index + 1
            setIndex(i)
            console.log(listSlide)
        }
    }
    const [trySlideList, setTrySlideList] = useState(data)

    const handleTry = () => {
        let temp = []
        listSlide.map(i => {
            temp.push(i)
        })
        setTrySlideList(temp)
    }

    const handleRefreshSlider = () => {
        setTrySlideList(data)
        setListSlide([])
        setSlideNumber(0)
        setIndex(1)
        setSlide({
            title: '',
            description: '',
            background: [],
            poster: []
        })
        setDisplaySlideNumber('hidden')
    }

    const [listIDSlide, setListIDSlide] = useState([])
    const [openSnackbarSuc, setOpenSnackbarSuc] = useState(false)
    const [openSnackbarErr, setOpenSnackbarErr] = useState(false)
    const [message, setMessage] = useState('')

    const handleSave = async () => {
        //Update slide
        // let tempID = listSlide[0].poster
        // console.log(tempID)
        // cloudinaryApi.upload(JSON.stringify({ data: tempID }))
        //     .then(res => {
        //         console.log(res.data)
        //     }).catch(err => console.log(err))
        setOpenSnackbarErr(false)
        setOpenSnackbarSuc(false)
        if (listOutStanding.length > 2 || listOutStanding.length <= 1) {
            setMessage("Featured Product can be only 2 for display")
            setOpenSnackbarErr(true)
        } else {
            if (listDisplay.length < 3) {
                setMessage("Please choose more for displaying")
                setOpenSnackbarErr(true)
            } else {
                setOpen(true)
                let tempListDisplay = []
                let tempListOutStanding = []
                listDisplay.map(i => {
                    tempListDisplay.push(i._id)
                })
                listOutStanding.map(i => {
                    tempListOutStanding.push(i._id)
                })
                let data = {
                    _id: homePageAsset._id,
                    listProduct: tempListDisplay,
                    listOutStanding: tempListOutStanding
                }
                // homePageAssetApi.update(data)
                try {
                    const resultAction = await dispatch(updateHomePageAsset(data))
                    const originalPromiseResult = unwrapResult(resultAction)
                    console.log(originalPromiseResult)
                    setListOutStanding([])
                    setListDisplay([])
                    setOpen(false)
                    setMessage("Update home page asset success")
                    setOpenSnackbarSuc(true)
                } catch (rejectedValueOrSerializedError) {
                    return rejectedValueOrSerializedError
                }
            }
        }
    }

    const [listOutStanding, setListOutStanding] = useState([])
    const [listClothes, setListClothes] = useState([])

    const [listDisplay, setListDisplay] = useState([])

    const [homePageAsset, setHomePageAsset] = useState([])

    useEffect(() => {
        const fetchClothes = async () => {
            await clothesApi.getAll()
                .then(res => setListClothes(res.data))
                .catch(err => console.log(err))
        }

        if (listClothes.length === 0) {
            fetchClothes()
        }
    }, [])

    useEffect(() => {
        const fetchHomePageAsset = async () => {
            await homePageAssetApi.getAll()
                .then(res => setHomePageAsset(res.data))
                .catch(err => console.log(err))
        }

        if (homePageAsset.length === 0) {
            fetchHomePageAsset()
        }
    }, [])

    const handleDeleteClick = (value) => {
        var index = listOutStanding.indexOf(value)
        setListOutStanding([
            ...listOutStanding.slice(0, index),
            ...listOutStanding.slice(index + 1, listOutStanding.length)
        ]);
    }

    const handleDeleteClick2 = (value) => {
        var index = listDisplay.indexOf(value)
        setListDisplay([
            ...listDisplay.slice(0, index),
            ...listDisplay.slice(index + 1, listDisplay.length)
        ]);
    }

    return (
        <Grid container spacing={3} className={style.container}>
            <Grid item xs={7}>
                <Slider data={trySlideList} />
            </Grid>

            <Grid item xs={5}>
                <Stack direction="column" spacing={2}>
                    <Stack direction="column" spacing={1.5}>
                        <Typography className={style.boxTitle}>🖊️ Edit Slider</Typography>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                variant="standard"
                                placeholder="Number of slide"
                                value={slideNumber}
                                onChange={e => setSlideNumber(e.target.value)}
                            />
                            <Box>
                                <CustomFillButton onClick={handleChangeSlideNumber}>Go</CustomFillButton>
                            </Box>
                        </Stack>
                        <Typography
                            sx={{
                                visibility: `${displaySlideNumber}`,
                                color: 'gray',
                            }}
                        >
                            {index}/{slideNumber}
                        </Typography>
                        <TextField
                            variant="standard"
                            placeholder="Title"
                            value={slide.title}
                            onChange={e => setSlide({ ...slide, title: e.target.value })}
                        />
                        <TextareaAutosize
                            maxRows={4}
                            maxLength={100}
                            aria-label="maximum height"
                            placeholder="Description"
                            value={slide.description}
                            style={{ minWidth: 400, maxWidth: 400, maxHeight: 100, minHeight: 100, padding: 5 }}
                            onChange={e => setSlide({ ...slide, description: e.target.value })}
                        />
                        <input type="file" name="file" onChange={handlePickPoster} />
                        <input type="file" name="file" onChange={handlePickBackground} />
                        <IconButton disabled={cannotNext} onClick={handleNext} sx={{ width: 50, alignSelf: 'center' }}>
                            <NavigateNextIcon />
                        </IconButton>
                        <Stack direction="row" sx={{ justifyContent: 'center' }} spacing={2}>
                            <CustomFillButton onClick={handleTry} sx={{ alignSelf: 'center' }} >Try to apply</CustomFillButton>
                            <CustomFillButton onClick={handleRefreshSlider} sx={{ alignSelf: 'center' }} >Refresh</CustomFillButton>
                        </Stack>
                        <br style={{ width: '100%', height: '1px', backgroundColor: 'black' }}></br>

                        <Typography className={style.boxTitle}>🖊️ Set outstanding products</Typography>
                        <Autocomplete
                            onChange={(event, newValue) => {
                                if (typeof newValue === 'string') {
                                    return newValue
                                } else if (newValue && newValue.inputValue) {
                                    return newValue.inputValue;
                                } else {
                                    setListOutStanding([...listOutStanding, newValue])
                                }
                            }}
                            filterOptions={(options, params) => {
                                const filtered = filter(options, params);
                                const { inputValue } = params;
                                const isExisting = options.some((option) => inputValue === option.name);
                                if (inputValue !== '' && !isExisting) {
                                    return filtered;
                                }
                                return filtered;
                            }}
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            id="free-solo-with-text-demo"
                            options={listClothes}
                            getOptionLabel={(option) => {
                                if (typeof option === 'string') {
                                    return option;
                                }
                                if (option.inputValue) {
                                    return option.inputValue;
                                }
                                return option.name;
                            }}
                            renderOption={(props, option) => <li {...props}>{option.name}</li>}
                            sx={{ width: 250 }}
                            freeSolo
                            renderInput={(params) => (
                                <TextField {...params} label="Search clothes" />
                            )}
                        />
                        {listOutStanding.length != 0 ?
                            (
                                <Stack direction="row" spacing={1.5}>
                                    {listOutStanding.map(i =>
                                        <ProductInOutStanding key={i._id} item={i} deleteClickHandle={handleDeleteClick} />
                                    )}
                                </Stack>
                            ) :
                            null
                        }

                        <br style={{ width: '100%', height: '1px', backgroundColor: 'black' }}></br>
                        <Typography className={style.boxTitle}>🖊️ Set displaying products</Typography>
                        <Autocomplete
                            onChange={(event, newValue) => {
                                if (typeof newValue === 'string') {
                                    return newValue
                                } else if (newValue && newValue.inputValue) {
                                    return newValue.inputValue;
                                } else {
                                    setListDisplay([...listDisplay, newValue])
                                }
                            }}
                            filterOptions={(options, params) => {
                                const filtered = filter(options, params);
                                const { inputValue } = params;
                                const isExisting = options.some((option) => inputValue === option.name);
                                if (inputValue !== '' && !isExisting) {
                                    return filtered;
                                }
                                return filtered;
                            }}
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            id="free-solo-with-text-demo"
                            options={listClothes}
                            getOptionLabel={(option) => {
                                if (typeof option === 'string') {
                                    return option;
                                }
                                if (option.inputValue) {
                                    return option.inputValue;
                                }
                                return option.name;
                            }}
                            renderOption={(props, option) => <li {...props}>{option.name}</li>}
                            sx={{ width: 250 }}
                            freeSolo
                            renderInput={(params) => (
                                <TextField {...params} label="Search clothes" />
                            )}
                        />
                        {listDisplay.length != 0 ?
                            (
                                <Stack direction="row" spacing={1.5}>
                                    {listDisplay.map(i =>
                                        <ProductInOutStanding key={i._id} item={i} deleteClickHandle={handleDeleteClick2} />
                                    )}
                                </Stack>
                            ) :
                            null
                        }
                        <br style={{ width: '100%', height: '1px', backgroundColor: 'black' }}></br>

                        <CustomFillButton sx={{ width: 'auto', alignSelf: 'center' }} onClick={handleSave}>Save</CustomFillButton>
                    </Stack>
                </Stack>
            </Grid>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Success message={message} status={openSnackbarSuc} />
            <Error message={message} status={openSnackbarErr} />
        </Grid>
    )
}

export const ProductInOutStanding = (props) => {
    return (
        <Stack direction="column" spacing={1.5} sx={{ height: '100px', width: '80px' }}>
            <img style={{ height: '100px', width: '70px', borderRadius: '15px' }} src={props.item.images[0]} />
            <IconButton onClick={() => props.deleteClickHandle(props.item)} style={{ width: '70px' }}>
                <HighlightOffIcon />
            </IconButton>
        </Stack>
    )
}

export const CustomFillButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[900],
    '&:hover': {
        backgroundColor: grey[700],
    },
    padding: '6px 35px',
    marginLeft: '20px',
    borderRadius: '10px'

}));

export const Slider = (props) => {
    SwiperCore.use([Autoplay]);
    return (
        <div className="slide__container">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
            >
                {
                    props.data.map((item, i) => (
                        <SwiperSlide key={i}>
                            <SlideItem item={item} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>

        </div>
    )
}

const SlideItem = props => {
    const item = props.item

    return (
        <div className="slide__item"
            style={{ backgroundImage: `url(${item.background})` }}
        >

            <div className="slide__item__contain">
                {/* <div className="login__color__gradient" /> */}
                <div className="slide__item__content__info">
                    <h2 className="slide__item__content__info__title">{item.title}</h2>
                    <p className="slide__item__content__info__overview">{item.description}</p>
                </div>

                <img className="slider__item__content__poster" src={item.poster} alt="" />

            </div>
        </div>
    )
}