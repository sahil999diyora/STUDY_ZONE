import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { Box, Container, TextField, Typography, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";

const ADMIN_LOGIN_SCHEMA = Yup.object().shape({
    email: Yup.string()
        .email('INVALID FORMAT')
        .required('IS REQUIRED'),
    password: Yup.string()
        .required('IS REQUIRED'),
});

function AdminLogin() {

    let history = useHistory();


    useEffect(() => {

        AOS.init();

        let CHEAK_ADMIN_TOKEN = localStorage.getItem("ADMIN_TOKEN");

        if (!CHEAK_ADMIN_TOKEN) {
            history.push('/admin/login')
        }

    }, [])

    const notify = (message) => toast.success(message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });

    const notify_warning = (message) => toast.error(message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });

    return (
        <Container maxWidth="xl">
            <Box sx={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={ADMIN_LOGIN_SCHEMA}
                    onSubmit={async (values, action) => {
                        console.log(values);

                        axios.post("http://localhost:5500/admin/login", values)
                            .then((res) => {
                                console.log(res);
                                notify(res.data.message)
                                localStorage.setItem("ADMIN_TOKEN", res.data.token)

                                setTimeout(() => {
                                    history.push('/admin')
                                }, 1000)

                                action.resetForm();
                            })
                            .catch((err) => {
                                console.log(err);
                                notify_warning(err.response.data.message)
                            })



                    }}
                >
                    <Form className='Carrd' style={{ borderRadius: "0px 0px ", padding: "30px 30px" }} data-aos="zoom-in" >
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "10px" }}>
                                <AccountCircleIcon sx={{ fontSize: "40px" }} />
                                <Typography variant='h5' style={{ textAlign: "center", marginLeft: "5px" }}>ADMIN LOGIN </Typography>
                            </Box>
                            <label htmlFor="email" style={{ marginTop: "15px" }}>
                                <Typography variant="body1"> E - MAIL <ErrorMessage name='email' component={'span'} className='Error' /></Typography>
                            </label>
                            <Field as={TextField} id="email" name="email" placeholder="ENTER VALID E - MAIL" type="email" style={{ width: "400px", marginTop: "10px" }} />
                            <label htmlFor="password" style={{ marginTop: "15px" }}>
                                <Typography variant="body1"> PASSWORD <ErrorMessage name='password' component={'span'} className='Error' /></Typography>
                            </label>
                            <Field as={TextField} id="password" name="password" placeholder="ENTER PASSWORD" type="password" style={{ width: "400px", marginTop: "10px" }} />
                            <Box className="FntFmly" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "28px 0px 0px 0px" }}>
                                <Typography> <Field type="checkbox" name="checked" value="Remember Me" style={{ height: "13px", width: "20px", margin: "0px 5px 0px 0px" }} />Remember Me ! </Typography>
                                <a href="" style={{ textDecoration: "none" }}> Forget Password ? </a>
                            </Box>
                            <Box sx={{ marginTop: "25px", display: "flex", justifyContent: "space-between" }}>
                                <Button variant="contained" color="primary" style={{ width: "47%" }} type="reset">RESET</Button>
                                <Button variant="contained" color="primary" style={{ width: "47%" }} type="submit">SUBMIT</Button>
                            </Box>
                        </Box>
                    </Form>
                </Formik>
            </Box>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            {/* Same as */}
            <ToastContainer />
        </Container>
    )
}

export default AdminLogin;
