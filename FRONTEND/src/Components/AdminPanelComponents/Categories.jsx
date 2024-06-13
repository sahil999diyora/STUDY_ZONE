import React, { useState } from 'react';
import SideNavBar from '../SideNavBar';
import Box from '@mui/material/Box';
import NavBarAdmin from '../NavBarAdmin';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import DialogActions from '@mui/material/DialogActions';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { SearchTwoTone } from '@mui/icons-material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Switch from '@mui/material/Switch';

const CATEFORIES_SCHEMA = Yup.object().shape({
    catagoryName: Yup.string()
        .required('IS REQUIRED'),
    categoryImage: Yup.mixed()
        .required('IS REQUIRED'),
    alternamtiveImage: Yup.string()
        .required('IS REQUIRED'),
    Description: Yup.string()
        .required('IS REQUIRED'),
    metaTitle: Yup.string()
        .required('IS REQUIRED'),
    slug: Yup.string()
        .required('IS REQUIRED'),
});

function Categories() {

    let [Data, SetData] = useState([]);

    let [Initial, SetInitial] = useState({
        catagoryName: '',
        categoryImage: '',
        alternamtiveImage: '',
        Description: '',
        metaTitle: '',
        slug: ''
    });

    let [Eid, SetEid] = useState(null);

    let [Search, SetSearch] = useState("")

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    let Get_Data = () => {

        axios.get("http://localhost:5500/catagory/", {
            headers: {
                Authorization: localStorage.getItem("ADMIN_TOKEN")
            }
        })
            .then((res) => {
                console.log(res);
                SetData(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }


    let HISTORY = useHistory();

    useEffect(() => {

        let ADMIN_TOKEN = localStorage.getItem("ADMIN_TOKEN");

        if (!ADMIN_TOKEN) {
            HISTORY.push('/admin/login')
        }

        Get_Data()

        AOS.init();
    }, [])

    let Delete_Handler = (_id) => {
        axios.delete("http://localhost:5500/catagory/" + _id, {
            headers: {
                Authorization: localStorage.getItem("ADMIN_TOKEN")
            }
        })
            .then((res) => {
                console.log(res);
                Get_Data()

            })
            .catch((err) => {
                console.log(err);
            })
    }

    let Edit_Handler = (el, _id) => {

        handleClickOpen()
        SetInitial({
            catagoryName: el.catagoryName,
            categoryImage: el.categoryImage,
            alternamtiveImage: el.alternamtiveImage,
            Description: el.Description,
            metaTitle: el.metaTitle,
            slug: el.slug
        })
        SetEid(_id)

    }

    // Function to handle toggling status
    const handleStatusToggle = (_id, newStatus) => {

        // Update the status in the database
        axios.patch("http://localhost:5500/catagory/" + _id, { status: newStatus }, {
            headers: {
                Authorization: localStorage.getItem("ADMIN_TOKEN"),
                "Content-Type": "multipart/form-data"
            }
        })
            .then((res) => {
                console.log(res);
                Get_Data();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div style={{ marginTop: "65px" }}>
            <NavBarAdmin />
            <Box sx={{ display: 'flex' }}>
                <SideNavBar />
                <Container data-aos="fade-up" data-aos-duration="1000">
                    <Box sx={{ marginTop: "30px" }}> <Typography variant="h4" color="initial"> CATEGORIES </Typography> </Box>
                    <Box sx={{ marginTop: "50px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box>
                            <React.Fragment>
                                <Button variant="contained" onClick={handleClickOpen}>
                                    <FolderCopyIcon sx={{ marginRight: "10px" }} /> ADD CATEGORIES
                                </Button>
                                <Dialog
                                    fullScreen={fullScreen}
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="responsive-dialog-title">
                                    <DialogContent>

                                        <Formik
                                            initialValues={Initial}
                                            enableReinitialize
                                            validationSchema={CATEFORIES_SCHEMA}
                                            onSubmit={async (values, action) => {
                                                console.log(values);

                                                let FORM_DATA = new FormData;

                                                FORM_DATA.append("catagoryName", values.catagoryName);

                                                for (let i = 0; i < values.categoryImage.length; i++) {
                                                    FORM_DATA.append("categoryImage", values.categoryImage[i]);
                                                }

                                                FORM_DATA.append("alternamtiveImage", values.alternamtiveImage);
                                                FORM_DATA.append("Description", values.Description);
                                                FORM_DATA.append("metaTitle", values.metaTitle);
                                                FORM_DATA.append("slug", values.slug);


                                                if (Eid) {
                                                    axios.patch("http://localhost:5500/catagory/" + Eid, FORM_DATA, {
                                                        headers: {
                                                            Authorization: localStorage.getItem("ADMIN_TOKEN"),
                                                            "Content-Type": "multipart/form-data"
                                                        }
                                                    })
                                                        .then((res) => {
                                                            console.log(res);
                                                            Get_Data();
                                                            handleClose();
                                                            SetEid(null)
                                                        })
                                                        .catch((err) => {
                                                            console.log(err);
                                                        })
                                                }
                                                else {

                                                    axios.post("http://localhost:5500/catagory/create", FORM_DATA, {
                                                        headers: {
                                                            Authorization: localStorage.getItem("ADMIN_TOKEN"),
                                                            "Content-Type": "multipart/form-data"
                                                        }
                                                    })
                                                        .then((res) => {
                                                            console.log(res);
                                                            Get_Data();
                                                            handleClose();
                                                        })
                                                        .catch((err) => {
                                                            console.log(err);
                                                        })
                                                }
                                                SetInitial({
                                                    catagoryName: '',
                                                    categoryImage: '',
                                                    alternamtiveImage: '',
                                                    Description: '',
                                                    metaTitle: '',
                                                    slug: ''
                                                })

                                                action.resetForm();

                                            }}
                                        >
                                            {
                                                (props) => (
                                                    <Form style={{ borderRadius: "0px 0px ", padding: "30px 30px" }}>
                                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "10px" }}>
                                                                <FolderCopyIcon sx={{ marginRight: "5px" }} />
                                                                <Typography variant='h5' style={{ textAlign: "center", marginLeft: "5px" }}>  ADD CATEGORIES </Typography>
                                                            </Box>
                                                            <Box sx={{ my: 2 }}>
                                                                <label htmlFor="catagoryName" style={{ marginTop: "15px" }}>
                                                                    <Typography variant="body1"> CATEGORY NAME <ErrorMessage name='catagoryName' component={'span'} className='Error' /></Typography>
                                                                </label>
                                                                <Field as={TextField} id="catagoryName" name="catagoryName" placeholder="ENTER CATEGORY NAME HERE" type="catagoryName" style={{ width: "400px", marginTop: "10px" }} />
                                                            </Box>
                                                            <Box sx={{ mb: 2 }}>
                                                                <label htmlFor="categoryImage" style={{ marginTop: "15px" }}>
                                                                    <Typography variant="body1"> CATEGORY IMAGE <ErrorMessage name='categoryImage' component={'span'} className='Error' /></Typography>
                                                                </label>
                                                                <input type="file" onChange={(e) => props.setFieldValue("categoryImage", e.target.files)} id="categoryImage" name="categoryImage" placeholder="ENTER CATEGORY NAME HERE" style={{ width: "400px", marginTop: "10px" }} multiple />
                                                            </Box>
                                                            <Box sx={{ mb: 2 }}>
                                                                <label htmlFor="alternamtiveImage" style={{ marginTop: "15px" }}>
                                                                    <Typography variant="body1"> CATEGORY ALTERNATIVE IMG <ErrorMessage name='alternamtiveImage' component={'span'} className='Error' /></Typography>
                                                                </label>
                                                                <Field as={TextField} id="alternamtiveImage" name="alternamtiveImage" placeholder="ENTER CATEGORY ALTERNATIVE IMAGE" type="alternamtiveImage" style={{ width: "400px", marginTop: "10px" }} />
                                                            </Box>
                                                            <Box sx={{ mb: 2 }}>
                                                                <label htmlFor="Description" style={{ marginTop: "15px" }}>
                                                                    <Typography variant="body1"> CATEGORY DESCRIPTION <ErrorMessage name='Description' component={'span'} className='Error' /></Typography>
                                                                </label>
                                                                <Field as={TextField} id="Description" name="Description" placeholder="ENTER CATEGORY DESCRIPTION" type="Description" style={{ width: "400px", marginTop: "10px" }} />
                                                            </Box>
                                                            <Box sx={{ mb: 2 }}>
                                                                <label htmlFor="metaTitle" style={{ marginTop: "15px" }}>
                                                                    <Typography variant="body1"> CATEGORY META TITILE <ErrorMessage name='metaTitle' component={'span'} className='Error' /></Typography>
                                                                </label>
                                                                <Field as={TextField} id="metaTitle" name="metaTitle" placeholder="ENTER CATEGORY META TITILE" type="metaTitle" style={{ width: "400px", marginTop: "10px" }} />
                                                            </Box>
                                                            <Box sx={{ mb: 2 }}>
                                                                <label htmlFor="slug" style={{ marginTop: "15px" }}>
                                                                    <Typography variant="body1"> CATEGORY SLUG <ErrorMessage name='slug' component={'span'} className='Error' /></Typography>
                                                                </label>
                                                                <Field as={TextField} id="slug" name="slug" placeholder="ENTER CATEGORY SLUG" type="slug" style={{ width: "400px", marginTop: "10px" }} />
                                                            </Box>
                                                            <Box sx={{ marginTop: "25px", display: "flex", justifyContent: "space-between" }}>
                                                                <Button variant="contained" color="primary" style={{ width: "47%" }} type="reset">RESET</Button>
                                                                <Button variant="contained" color="primary" style={{ width: "47%" }} type="submit"> {Eid ? "UPDATE CATEGORY" : "ADD CATEGORIES"}</Button>
                                                            </Box>
                                                        </Box>
                                                    </Form>
                                                )
                                            }
                                        </Formik>

                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}> CLOSE</Button>
                                    </DialogActions>
                                </Dialog>
                            </React.Fragment>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <SearchTwoTone sx={{ marginRight: "20px", border: "2px solid", color: "#1976d2", p: 1, height: "55px", width: "55px", borderRadius: "5px" }} />
                            <TextField fullWidth label="SEARCH CATEGORIES HERE" id="fullWidth" sx={{ width: "300px" }} onChange={(e) => SetSearch(e.target.value)} />
                            {/*<Button variant="contained" color="primary" sx={{ height: "55px" }}>SEARCH </Button> */}
                        </Box>
                    </Box>
                    <Box sx={{ marginTop: "50px" }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: "#1976d2" }}>
                                        <TableCell sx={{ color: "white" }} align="center">NO</TableCell>
                                        <TableCell sx={{ color: "white" }} align="center">CATEGORIES</TableCell>
                                        <TableCell sx={{ color: "white" }} align="center">IMAGES</TableCell>
                                        <TableCell sx={{ color: "white" }} align="center">DESCRIPTION</TableCell>
                                        {/*<TableCell sx={{ color: "white" }} align="center">META TITLE</TableCell>
                                        <TableCell sx={{ color: "white" }} align="center">SLUG</TableCell>*/}
                                        <TableCell sx={{ color: "white" }} align="center">STATUS</TableCell>
                                        <TableCell sx={{ color: "white" }} align="center">EDIT</TableCell>
                                        <TableCell sx={{ color: "white" }} align="center">DELETE</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        Data.filter((items) => {
                                            if (Search === "") {
                                                return items
                                            }
                                            else if (items.catagoryName.toLowerCase().includes(Search.toLowerCase())) {
                                                return items
                                            }
                                        })
                                            .map((el, index) => {
                                                return (
                                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                        <TableCell component="th" scope="row" align='center'>{index + 1}</TableCell>
                                                        <TableCell align="center">{el.catagoryName}</TableCell>
                                                        <TableCell align="center"><img src={`http://localhost:5500/images/category/${el.categoryImage}`} alt={el.alternamtiveImage} style={{ width: '75%', height: "100px" }} /></TableCell>
                                                        <TableCell align="center">{el.Description}</TableCell>
                                                        {/*<TableCell align="center">{el.metaTitle}</TableCell>
                                                <TableCell align="center">{el.slug}</TableCell>*/}
                                                        <TableCell sx={{ textTransform: "uppercase" }} align="center">
                                                            {el.status}
                                                            <Switch
                                                                defaultChecked={el.status === "on" ? true : false}
                                                                onChange={(event) => handleStatusToggle(el._id, event.target.checked ? "on" : "off")}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Button variant="contained" startIcon={<EditIcon />} onClick={() => { Edit_Handler(el, el._id) }}>
                                                                EDIT
                                                            </Button>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Button variant="contained" startIcon={<DeleteIcon />} onClick={() => { Delete_Handler(el._id) }}>
                                                                DELETE
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Container>
            </Box>
        </div>
    )
}

export default Categories;
