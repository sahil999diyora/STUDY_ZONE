import React, { useState } from 'react';
import SideNavBar from '../SideNavBar';
import Box from '@mui/material/Box';
import NavBarAdmin from '../NavBarAdmin';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Container, Switch, Typography } from '@mui/material';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
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

const CATEGORIES_SCHEMA = Yup.object().shape({
    subCatagoryname: Yup.string()
        .required('IS REQUIRED'),
    catagoryID: Yup.string()
        .required('IS REQUIRED'),
    subCategoryImage: Yup.mixed()
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

function SubCategories() {

    let [Data, SetData] = useState([]);

    let [Initial, SetInitial] = useState({
        subCatagoryname: '',
        catagoryID: '',
        subCategoryImage: '',
        alternamtiveImage: '',
        Description: '',
        metaTitle: '',
        slug: ''
    });
    let [Search, SetSearch] = useState("")

    let [Eid, SetEid] = useState(null);


    let [CategoryData, SetCategoryData] = useState([]);
    console.log(CategoryData);

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

        axios.get("http://localhost:5500/subcatagory/", {
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


    let Categories_DATA = () => {

        axios.get("http://localhost:5500/catagory/", {
            headers: {
                Authorization: localStorage.getItem("ADMIN_TOKEN")
            }
        })
            .then((res) => {
                SetCategoryData(res.data.data);
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

        Categories_DATA()
    }, [])

    let Delete_Handler = (_id) => {
        axios.delete("http://localhost:5500/subcatagory/" + _id, {
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
            subCatagoryname: el.subCatagoryname,
            catagoryID: el.catagoryID._id,
            subCategoryImage: el.subCategoryImage,
            alternamtiveImage: el.alternamtiveImage,
            Description: el.Description,
            metaTitle: el.metaTitle,
            slug: el.slug
        })
        SetEid(_id)

    }

    let ToggleHandler = (_id, NewStatus) => {

        console.log(NewStatus);

        axios.patch("http://localhost:5500/subcatagory/" + _id, { status: NewStatus }, {
            headers: {
                Authorization: localStorage.getItem("ADMIN_TOKEN")
            }
        })
            .then((res) => {
                console.log(res);
                Get_Data();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div style={{ marginTop: "65px" }}>
            <NavBarAdmin />
            <Box sx={{ display: 'flex' }}>
                <SideNavBar />
                <Container data-aos="fade-up" data-aos-duration="1000">
                    <Box sx={{ marginTop: "30px" }}> <Typography variant="h4" color="initial"> SUB CATEGORIES </Typography> </Box>
                    <Box sx={{ marginTop: "50px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box>
                            <React.Fragment>
                                <Button variant="contained" onClick={handleClickOpen}>
                                    <InsertDriveFileIcon sx={{ marginRight: "10px", fontSize: "22px" }} />ADD SUB CATEGORIES
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
                                            validationSchema={CATEGORIES_SCHEMA}
                                            onSubmit={async (values, action) => {

                                                let FORM_DATA = new FormData;

                                                FORM_DATA.append("subCatagoryname", values.subCatagoryname)
                                                FORM_DATA.append("catagoryID", values.catagoryID)
                                                FORM_DATA.append("subCategoryImage", values.subCategoryImage)
                                                FORM_DATA.append("alternamtiveImage", values.alternamtiveImage)
                                                FORM_DATA.append("Description", values.Description)
                                                FORM_DATA.append("metaTitle", values.metaTitle)
                                                FORM_DATA.append("slug", values.slug)

                                                if (Eid) {
                                                    axios.patch("http://localhost:5500/subcatagory/" + Eid, values, {
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

                                                    axios.post("http://localhost:5500/subcatagory/create", FORM_DATA, {
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
                                                    subCatagoryname: '',
                                                    catagoryID: '',
                                                    subCategoryImage: '',
                                                    alternamtiveImage: '',
                                                    Description: '',
                                                    metaTitle: '',
                                                    slug: ''
                                                })
                                                action.resetForm();
                                            }}>
                                            {
                                                (props) => (
                                                    <Form style={{ borderRadius: "0px 0px ", padding: "30px 30px" }}>
                                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "10px" }}>
                                                                <InsertDriveFileIcon sx={{ margincenter: "5px" }} />
                                                                <Typography variant='h5' style={{ textAlign: "center", marginLeft: "5px" }}>  ADD SUB CATEGORIES </Typography>
                                                            </Box>
                                                            <Box sx={{ my: 2 }}>
                                                                <label htmlFor="subCatagoryname" style={{ marginTop: "15px" }}>
                                                                    <Typography variant="body1"> SUB CATEGORY NAME <ErrorMessage name='subCatagoryname' component={'span'} className='Error' /></Typography>
                                                                </label>
                                                                <Field as={TextField} id="subCatagoryname" name="subCatagoryname" placeholder="ENTER SUB CATEGORY NAME HERE" type="subCatagoryname" style={{ width: "400px", marginTop: "10px" }} />
                                                            </Box>
                                                            <Box sx={{ mb: 2 }}>
                                                                <label htmlFor="subCategoryImage" style={{ marginTop: "15px" }}>
                                                                    <Typography variant="body1"> SUB CATEGORY IMAGE <ErrorMessage name='subCategoryImage' component={'span'} className='Error' /></Typography>
                                                                </label>
                                                                <input type="file" multiple onChange={(e) => props.setFieldValue("subCategoryImage", e.target.files[0])} id="subCategoryImage" name="subCategoryImage" placeholder="ENTER SUB CATEGORY IMAGE HERE" style={{ width: "400px", marginTop: "10px" }} />
                                                            </Box>
                                                            <Box sx={{ mb: 2 }}>
                                                                <label htmlFor="catagoryID" style={{ marginTop: "15px" }}>
                                                                    <Typography variant="body1"> CATEGORY ID <ErrorMessage name='catagoryID' component={'span'} className='Error' /></Typography>
                                                                </label>
                                                                <Field as="select" id="catagoryID" name="catagoryID" placeholder="ENTER CATEGORY ID HERE" type="catagoryID" style={{ width: "400px", height: "56px", marginTop: "10px", textTransform: "uppercase", padding: "10px" }} >
                                                                    <option value="NONE" selected >SELECT</option>
                                                                    {
                                                                        CategoryData.map((el, index) => {
                                                                            return (
                                                                                <option key={index} value={el._id} style={{ textTransform: "uppercase" }}>{el.catagoryName}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </Field>
                                                            </Box>
                                                            <Box sx={{ mb: 2 }}>
                                                                <label htmlFor="alternamtiveImage" style={{ marginTop: "15px" }}>
                                                                    <Typography variant="body1"> SUB CATEGORY ALTERNATIVE IMAGE <ErrorMessage name='alternamtiveImage' component={'span'} className='Error' /></Typography>
                                                                </label>
                                                                <Field as={TextField} id="alternamtiveImage" name="alternamtiveImage" placeholder="ENTER SUB CATEGORY ALTERNATIVE IMAGE" type="alternamtiveImage" style={{ width: "400px", marginTop: "10px" }} />
                                                            </Box>
                                                            <Box sx={{ mb: 2 }}>
                                                                <label htmlFor="Description" style={{ marginTop: "15px" }}>
                                                                    <Typography variant="body1"> SUB CATEGORY DESCRIPTION <ErrorMessage name='Description' component={'span'} className='Error' /></Typography>
                                                                </label>
                                                                <Field as={TextField} id="Description" name="Description" placeholder="ENTER SUB CATEGORY DESCRIPTION HERE" type="Description" style={{ width: "400px", marginTop: "10px" }} />
                                                            </Box>
                                                            <Box sx={{ mb: 2 }}>
                                                                <label htmlFor="metaTitle" style={{ marginTop: "15px" }}>
                                                                    <Typography variant="body1"> SUB CATEGORY META TITLE <ErrorMessage name='metaTitle' component={'span'} className='Error' /></Typography>
                                                                </label>
                                                                <Field as={TextField} id="metaTitle" name="metaTitle" placeholder="ENTER SUB CATEGORY META TITLE HERE" type="metaTitle" style={{ width: "400px", marginTop: "10px" }} />
                                                            </Box>
                                                            <Box sx={{ mb: 2 }}>
                                                                <label htmlFor="slug" style={{ marginTop: "15px" }}>
                                                                    <Typography variant="body1"> SUB CATEGORY SLUG <ErrorMessage name='slug' component={'span'} className='Error' /></Typography>
                                                                </label>
                                                                <Field as={TextField} id="slug" name="slug" placeholder="ENTER SUB CATEGORY SLUG HERE" type="slug" style={{ width: "400px", marginTop: "10px" }} />
                                                            </Box>

                                                            <Box sx={{ marginTop: "25px", display: "flex", justifyContent: "space-between" }}>
                                                                <Button variant="contained" color="primary" style={{ width: "47%" }} type="reset">RESET</Button>
                                                                <Button variant="contained" color="primary" style={{ width: "47%" }} type="submit"> {Eid ? "UPDATE SUB CATEGORY" : "ADD SUB CATEGORIES"}</Button>
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
                            <TextField fullWidth label="SEARCH SUB CATEGORIES HERE" id="fullWidth" sx={{ width: "300px" }} onChange={(e) => SetSearch(e.target.value)} />
                            {/*<Button variant="contained" color="primary" sx={{ height: "55px" }}>SEARCH </Button>*/}
                        </Box>
                    </Box>
                    <Box sx={{ marginTop: "50px" }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: "#1976d2" }}>
                                        <TableCell sx={{ color: "white" }} align="center">NO</TableCell>
                                        <TableCell sx={{ color: "white" }} align="left">SUB CATEGORIES</TableCell>
                                        <TableCell sx={{ color: "white" }} align="left">IMAGES</TableCell>
                                        <TableCell sx={{ color: "white" }} align="left">DESCRIPTION</TableCell>
                                        <TableCell sx={{ color: "white" }} align="center">CATEGORY</TableCell>
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
                                            else if (items.subCatagoryname.toLowerCase().includes(Search.toLowerCase())) {
                                                return items
                                            }
                                        })
                                            .map((el, index) => {
                                                return (
                                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                        <TableCell component="th" scope="row" align='center' >{index + 1}</TableCell>
                                                        <TableCell align="left">{el.subCatagoryname}</TableCell>
                                                        <TableCell align="left"> <img src={`http://localhost:5500/images/subcategory/${el.subCategoryImage}`} alt={el.alternamtiveImage} style={{ width: '100%', height: "100px" }} /> </TableCell>
                                                        <TableCell align="left">{el.Description}</TableCell>
                                                        <TableCell align="center">{el.catagoryID.catagoryName}</TableCell>
                                                        <TableCell sx={{ textTransform: "uppercase" }} align="center">
                                                            {el.status}
                                                            <Switch
                                                                defaultChecked={el.status == "on" ? true : false}
                                                                onChange={(e) => ToggleHandler(el._id, e.target.checked ? "on" : "off")} />
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

export default SubCategories;