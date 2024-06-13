import React, { useEffect, useState } from 'react';
import SideNavBar from '../SideNavBar';
import Box from '@mui/material/Box';
import NavBarAdmin from '../NavBarAdmin';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import CountUp from 'react-countup';

function Dashbord() {

    let HISTORY = useHistory();

    let [CategoriesCount, SetCategoriesCount] = useState([])
    let [SubCategoriesCount, SetSubCategoriesCount] = useState([])
    let [QuestionAnswerCount, SetQuestionAnswerCount] = useState([])


    let CATEGORIES = () => {
        axios.get("http://localhost:5500/catagory/", {
            headers: {
                Authorization: localStorage.getItem("ADMIN_TOKEN")
            }
        })
            .then((res) => {
                SetCategoriesCount(res.data.data);

            })
            .catch((err) => {
                console.log(err);
            })
    }


    let SUB_CATEGORIES = () => {
        axios.get("http://localhost:5500/subcatagory/", {
            headers: {
                Authorization: localStorage.getItem("ADMIN_TOKEN")
            }
        })
            .then((res) => {
                SetSubCategoriesCount(res.data.data);

            })
            .catch((err) => {
                console.log(err);
            })
    }

    let QUESTION_ANSWER = () => {
        axios.get("http://localhost:5500/questions/", {
            headers: {
                Authorization: localStorage.getItem("ADMIN_TOKEN")
            }
        })
            .then((res) => {
                SetQuestionAnswerCount(res.data.data)

            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {

        let ADMIN_TOKEN = localStorage.getItem("ADMIN_TOKEN");

        if (!ADMIN_TOKEN) {
            HISTORY.push('/admin/login')
        }

        AOS.init();

        CATEGORIES();
        SUB_CATEGORIES();
        QUESTION_ANSWER();

    }, [])


    return (
        <div style={{ marginTop: "65px" }}>
            <NavBarAdmin />
            <Box sx={{ display: 'flex' }}>

                <SideNavBar />

                <Container data-aos="fade-up" data-aos-duration="1000">
                    <Box sx={{ marginTop: "30px" }}> <Typography variant="h4" color="initial"> DASHBORD </Typography> </Box>
                    <Box sx={{ width: '100%' }}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid xs={4}>
                                <Box sx={{ marginTop: "50px" }}>
                                    <Card sx={{ maxWidth: 350, backgroundColor: "#1976d2", margin: "30px", opacity: "0.9" }}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography variant="body1" color="white" sx={{ textAlign: "center" }}> <FolderCopyIcon sx={{ fontSize: "25px" }} /> </Typography>

                                                <Typography color="white" gutterBottom variant="h6" component="div" sx={{ textAlign: "center" }}>
                                                    CATEGORIES
                                                </Typography>
                                                <Divider sx={{ backgroundColor: "white" }} />
                                                <Typography sx={{ textAlign: "center" }} variant="h3" color="white">
                                                    <CountUp start={0} duration={1} end={CategoriesCount.length} />
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Box>
                            </Grid>

                            <Grid xs={4}>
                                <Box sx={{ marginTop: "50px" }}>
                                    <Card sx={{ maxWidth: 350, backgroundColor: "#1976d2", margin: "30px", opacity: "0.9" }}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography variant="body1" color="white" sx={{ textAlign: "center" }} > <InsertDriveFileIcon sx={{ fontSize: "25px" }} /> </Typography>
                                                <Typography color="white" gutterBottom variant="h6" component="div" sx={{ textAlign: "center" }}>
                                                    SUB CATEGORIES
                                                </Typography>
                                                <Divider sx={{ backgroundColor: "white" }} />
                                                <Typography sx={{ textAlign: "center" }} variant="h3" color="white">
                                                    <CountUp start={0} duration={1} end={SubCategoriesCount.length} />
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Box>
                            </Grid>
                            <Grid xs={4}>
                                <Box sx={{ marginTop: "50px" }}>
                                    <Card sx={{ maxWidth: 350, backgroundColor: "#1976d2", margin: "30px", opacity: "0.9" }}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography variant="body1" color="white" sx={{ textAlign: "center" }}> <QuestionAnswerIcon sx={{ fontSize: "25px" }} /> </Typography>
                                                <Typography color="white" gutterBottom variant="h6" component="div" sx={{ textAlign: "center" }}>
                                                    QUESTIONS
                                                </Typography>
                                                <Divider sx={{ backgroundColor: "white" }} />
                                                <Typography sx={{ textAlign: "center" }} variant="h3" color="white">
                                                    <CountUp start={0} duration={1} end={QuestionAnswerCount.length} />
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Box>
                            </Grid>

                        </Grid>
                    </Box>
                </Container>
            </Box>
        </div>
    )
}

export default Dashbord;