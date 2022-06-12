import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material';
import { styles } from './styles'
import { Stack } from '@mui/material';
import Logo from '../../assets/logo.png'
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Navbar from '../../components/navbar';
import Helmet from 'react-helmet';
import Footer from '../../components/footer';

const About = () => {
    const navigate = useNavigate()
    const story = "Sportswear has become a very important part in the fashion industry since more casual and sporty looks are also used in everyday life all around the world.\nNike has always been associated with female empowerment, and the brand wants women around the globe to identify with role models.\nTo do so, Nike relies on female athletes’ endorsements.\nPower and strength have always been the core aspects of Nike's storytelling, but among them, we also find the insecurities and the difficulties some of these women deal with.\nSome examples of the most successful international storytelling campaigns are the ones that involve Bebe Vio, the Italian Paralympic champion and the Boxeur Zeina Nassar who fought to 'rewrote the rules to allow women everywhere to box in hijabs.'\nI don’t know about you, but I fell some goosebumps here…"
    const aboutList = [
        {
            _id: 0,
            image: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
            title: 'All day, all new, all you',
            text: 'The new Coolzy was made for you. All. Day. Long. For the guy who… likes to experiment with different silhouettes and materials but does not want to deviate away from the dark.  All of our pieces, our fabrics, our designs are subtle but unique at the same time.'
        },
        {
            _id: 1,
            image: 'https://images.unsplash.com/photo-1531287333398-6d7bd77ef790?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
            title: 'Where All Athletes Belong',
            text: 'When you’re with us, you’re part of something bigger: a global community dedicated to bringing out the best in one another, with access to the most effective tools for the job, including Member-exclusive products, Coolzy customisation, and special offers. And it is all free.'
        },
        {
            _id: 2,
            image: 'https://images.unsplash.com/photo-1542596594-649edbc13630?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
            title: 'The fashion industry is unique',
            text: 'Even if we are likely to associate fashion firms with the glamorous catwalks and the eccentric personalities of fashion designers, behind the curtains, there is much more than meets the eye.'
        },
        {
            _id: 3,
            image: 'https://images.unsplash.com/photo-1496124134604-7493ec63de68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
            title: 'There is no business like fashion business',
            text: 'The starting point of our journey revolves around the definition of fashion. Despite being a concept we refer to daily, defining fashion can be challenging.'
        },
    ]
    return (

        <Stack direction="column">
            <Helmet>
                <title>About</title>
            </Helmet>
            <Navbar></Navbar>
            <Stack sx={{mt: 15}}>
                {
                    aboutList.map((aboutItem) => (
                        <AboutItemOdd item={aboutItem} />
                    ))
                }

                <Box style={{ marginLeft: 20, marginRight: 20, marginTop: 80, padding: 20, boxShadow: '1px 1px 10px rgb(70, 70, 70)', borderRadius: 5 }} textAlign="center">
                    <Typography variant="h3" style={{ textDecoration: 'underline', letterSpacing: 4 }}>OUR  STORIES</Typography>
                    <Typography variant="body1" style={{ color: '#000', marginTop: '16px', padding: 5 }}>{story}</Typography>
                    <iframe width="100%" height="500" style={{ marginTop: 20 }} frameborder="0" allowfullscreen src="https://www.youtube.com/embed/tbnGIh1aad0"></iframe>
                </Box>

                <Box style={{ backgroundColor: 'black', marginLeft: 20, marginRight: 20, marginTop: 80, height: 200, justifyContent: 'center', display: 'flex', flexDirection: 'column', boxShadow: '1px 1px 10px rgb(70, 70, 70)' }} textAlign="center" >

                    <Typography variant="h3" style={{ color: 'white', fontWeight: 'bold' }}>
                        Coolzy
                    </Typography>

                    <Typography variant="h5" style={{ color: '#bdbcb9' }}> is the best choice for you!</Typography>

                </Box>

                <Box style={{ marginLeft: 20, marginRight: 20, marginTop: 80 }}>
                    <Grid container spacing={10}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={4} >
                            <img src={Logo} style={{ backgroundSize: 'cover', backgroundPosition: 'center', width: 400 }} />
                        </Grid>

                        <Grid item xs={6}>
                            <CoolzyIntroduction />
                        </Grid>
                    </Grid>
                </Box>

                <Box textAlign="center" sx={{ marginTop: 10, mb: 5 }}>
                    <CustomFillButton onClick={() => navigate('/contact')}>Contact us now</CustomFillButton>
                </Box>

                <Footer/>
            </Stack>
        </Stack>

    )
}

const AboutItemOdd = ({ item }) => {

    return (
        <Box style={styles.itemBox}>
            {
                item._id % 2 == 0 ?

                    <Box style={styles.itemBox}>
                        <Grid container spacing={20} xs={12}>
                            <Grid item container xs={8}>
                                <Grid item xs={4}>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="h4" style={styles.itemTitleLeft}>{item.title}</Typography>
                                    <Typography variant="h6" style={styles.itemTextLeft}>{item.text}</Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={4}>
                                <img src={item.image} style={styles.itemImage} />
                            </Grid>
                        </Grid>
                    </Box>
                    :
                    <Grid item container spacing={20} xs={12}>
                        <Grid item xs={4}>
                            <img src={item.image} style={styles.itemImage} />
                        </Grid>
                        <Grid item container xs={8}>
                            <Grid item xs={8}>
                                <Typography variant="h4" style={styles.itemTitleRight}>{item.title}</Typography>
                                <Typography variant="h6" style={styles.itemTextRight}>{item.text}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                            </Grid>
                        </Grid>
                    </Grid>

            }
        </Box>
    )
}

const CoolzyIntroduction = () => {
    return (
        <Stack direction="column" style={{ marginTop: -20 }}>
            <Grid container spacing={2} style={styles.coolzyInformationItem}>
                <Grid item xs={1}>
                    <CheckroomIcon />
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="subtitle1" style={{ fontStyle: 'italic' }}>Diversity of products and models</Typography>
                </Grid>
            </Grid>

            <Grid container spacing={2} style={styles.coolzyInformationItem}>
                <Grid item xs={1}>
                    <LocalAtmIcon />
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="subtitle1" style={{ fontStyle: 'italic' }}>Affordable prices</Typography>
                </Grid>
            </Grid>

            <Grid container spacing={2} style={styles.coolzyInformationItem}>
                <Grid item xs={1}>
                    <ThumbUpIcon />
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="subtitle1" style={{ fontStyle: 'italic' }}>Quality comes first</Typography>
                </Grid>
            </Grid>

            <Grid container spacing={2} style={styles.coolzyInformationItem}>
                <Grid item xs={1}>
                    <FavoriteIcon />
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="subtitle1" style={{ fontStyle: 'italic' }}>Thoughtful and understanding</Typography>
                </Grid>
            </Grid>

            <Grid container spacing={2} style={styles.coolzyInformationItem}>
                <Grid item xs={1}>
                    <RocketLaunchIcon />
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="subtitle1" style={{ fontStyle: 'italic' }}>Great efforts for customer</Typography>
                </Grid>
            </Grid>

            <Grid container spacing={2} style={styles.coolzyInformationItem}>
                <Grid item xs={1}>
                    <LocalShippingIcon />
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="subtitle1" style={{ fontStyle: 'italic' }}>Shipping for 64 provinces</Typography>
                </Grid>
            </Grid>
        </Stack>
    )
}

export const CustomFillButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: '#000',
    '&:hover': {
        backgroundColor: grey[900],
    },
    padding: '6px 35px',
    marginLeft: '20px',
}));

export default About