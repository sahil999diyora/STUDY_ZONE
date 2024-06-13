import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EastIcon from '@mui/icons-material/East';
import { Divider } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function MiddleUser() {

    useEffect(() => {
        AOS.init();
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} sx={{ alignItems: "center", justifyContent: "space-between" }}>
                <Grid item lg={6} xs={12} textAlign={{ lg: "left", xs: "center" }} margin={{ lg: "0px", xs: "30px 0px" }}>
                    <Box sx={{ padding: "0px 30px" }} data-aos="fade-right" data-aos-duration="1000">
                        <Typography variant="h2" color="#013289">
                            We offer modern solutions for growing your Career
                        </Typography>
                        <Typography variant='h5' sx={{ marginTop: "25px" }}>
                            We are team of talented Faculty making Your Interview Easy with Our Infotech .
                        </Typography>
                        <Box sx={{ marginTop: "30px" }}>
                            <Button variant="contained" sx={{ backgroundColor: "#013289", height: "55px", width: "200px", fontSize: "18px" }} >Get Started <EastIcon sx={{ marginLeft: "10px" }} /> </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item lg={6} xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                    <Box padding={{ lg: "90px 0px", xs: "0px" }} data-aos="fade-left" data-aos-duration="1000">
                        <img className='MidImageUser' style={{ width: "100%" }} src="https://img.freepik.com/free-vector/job-interview-conversation_74855-7566.jpg" alt="ERROR 404" />
                    </Box>
                </Grid>
            </Grid>
            <Divider sx={{ backgroundColor: "#013289" }} />
        </Box>
    )
}

export default MiddleUser;