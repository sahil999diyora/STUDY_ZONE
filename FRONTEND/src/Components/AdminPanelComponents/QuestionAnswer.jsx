import React, { useState } from 'react';
import SideNavBar from '../SideNavBar';
import Box from '@mui/material/Box';
import NavBarAdmin from '../NavBarAdmin';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import DeleteIcon from '@mui/icons-material/Delete';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
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

const CATEFORIES_SCHEMA = Yup.object().shape({
  questions: Yup.string()
    .required('IS REQUIRED'),
  answer: Yup.string()
    .required('IS REQUIRED'),
  subcatagoryID: Yup.string()
    .required('IS REQUIRED'),
  Description: Yup.string()
    .required('IS REQUIRED'),
  metaTitle: Yup.string()
    .required('IS REQUIRED'),
  slug: Yup.string()
    .required('IS REQUIRED'),
});

function QuestionAnswer() {

  let [Data, SetData] = useState([]);

  let [Initial, SetInitial] = useState({
    questions: '',
    answer: '',
    subcatagoryID: '',
    Description: '',
    metaTitle: '',
    slug: ''
  });

  let [Eid, SetEid] = useState(null);

  let [Search, SetSearch] = useState("")

  let [SubCategoriesData, SetSubCategoriesData] = useState([]);

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

    axios.get("http://localhost:5500/questions/", {
      headers: {
        Authorization: localStorage.getItem("ADMIN_TOKEN")
      }
    })
      .then((res) => {
        console.log(res.data.data);
        SetData(res.data.data)

      })
      .catch((err) => {
        console.log(err);
      })
  }

  let Sub_Categories_DATA = () => {

    axios.get("http://localhost:5500/subcatagory/", {
      headers: {
        Authorization: localStorage.getItem("ADMIN_TOKEN")
      }
    })
      .then((res) => {
        console.log(res);
        SetSubCategoriesData(res.data.data)

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

    Get_Data();

    AOS.init();

    Sub_Categories_DATA();
  }, [])

  let Delete_Handler = (_id) => {
    axios.delete("http://localhost:5500/questions//" + _id, {
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
      questions: el.questions,
      answer: el.answer,
      subcatagoryID: el.subcatagoryID._id,
      Description: el.Description,
      metaTitle: el.metaTitle,
      slug: el.slug
    })
    SetEid(_id)

  }

  return (
    <div style={{ marginTop: "65px" }}>
      <NavBarAdmin />
      <Box sx={{ display: 'flex' }}>
        <SideNavBar />
        <Container data-aos="fade-up" data-aos-duration="1000">
          <Box sx={{ marginTop: "30px" }}> <Typography variant="h4" color="initial"> QUESIONS ANSWERS </Typography> </Box>
          <Box sx={{ marginTop: "50px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <React.Fragment>
                <Button variant="contained" onClick={handleClickOpen}>
                  <QuestionAnswerIcon sx={{ marginRight: "10px" }} />  ADD QUESTIONS
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

                        if (Eid) {
                          axios.patch("http://localhost:5500/questions/" + Eid, values, {
                            headers: {
                              Authorization: localStorage.getItem("ADMIN_TOKEN")
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

                          axios.post("http://localhost:5500/questions/create/", values, {
                            headers: {
                              Authorization: localStorage.getItem("ADMIN_TOKEN")
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
                          questions: '',
                          answer: '',
                          subcatagoryID: '',
                          Description: '',
                          metaTitle: '',
                          slug: ''
                        })

                        action.resetForm();

                      }}
                    >
                      <Form style={{ borderRadius: "0px 0px ", padding: "30px 30px" }}>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "10px" }}>
                            <QuestionAnswerIcon sx={{ marginRight: "5px" }} />
                            <Typography variant='h5' style={{ textAlign: "center", marginLeft: "5px" }}>  ADD QUESTIONS </Typography>
                          </Box>

                          <Box sx={{ my: 2 }}>
                            <label htmlFor="questions" style={{ marginTop: "15px" }}>
                              <Typography variant="body1"> QUESTION <ErrorMessage name='questions' component={'span'} className='Error' /></Typography>
                            </label>
                            <Field as={TextField} id="questions" name="questions" placeholder="ENTER QUESTION HERE" type="questions" style={{ width: "400px", marginTop: "10px" }} />
                          </Box>

                          <Box sx={{ mb: 2 }}>
                            <label htmlFor="answer" style={{ marginTop: "15px" }}>
                              <Typography variant="body1"> ANSWER <ErrorMessage name='answer' component={'span'} className='Error' /></Typography>
                            </label>
                            <Field as={TextField} id="answer" name="answer" placeholder="ENTER ANSWER HERE" type="answer" style={{ width: "400px", marginTop: "10px" }} />
                          </Box>

                          <Box sx={{ mb: 2 }}>
                            <label htmlFor="subcatagoryID" style={{ marginTop: "15px" }}>
                              <Typography variant="body1"> SUB CATEGORY ID <ErrorMessage name='subcatagoryID' component={'span'} className='Error' /></Typography>
                            </label>
                            <Field as="select" id="subcatagoryID" name="subcatagoryID" placeholder="ENTER SUB CATEGORY ID HERE" type="subcatagoryID" style={{ width: "400px", height: "56px", marginTop: "10px", textTransform: "uppercase", padding: "10px" }} >
                              <option value="NONE" selected >SELECT</option>
                              {
                                SubCategoriesData.map((el, index) => {
                                  return (
                                    <option key={index} value={el._id} style={{ textTransform: "uppercase" }}>{el.subCatagoryname}</option>
                                  )
                                })
                              }
                            </Field>
                          </Box>

                          <Box sx={{ mb: 2 }}>
                            <label htmlFor="Description" style={{ marginTop: "15px" }}>
                              <Typography variant="body1"> QUESTION DESCRIPTION <ErrorMessage name='Description' component={'span'} className='Error' /></Typography>
                            </label>
                            <Field as={TextField} id="Description" name="Description" placeholder="ENTER QUESTION DESCRIPTION" type="Description" style={{ width: "400px", marginTop: "10px" }} />
                          </Box>

                          <Box sx={{ mb: 2 }}>
                            <label htmlFor="metaTitle" style={{ marginTop: "15px" }}>
                              <Typography variant="body1"> QUESTION META TITILE <ErrorMessage name='metaTitle' component={'span'} className='Error' /></Typography>
                            </label>
                            <Field as={TextField} id="metaTitle" name="metaTitle" placeholder="ENTER QUESTION META TITILE" type="metaTitle" style={{ width: "400px", marginTop: "10px" }} />
                          </Box>

                          <Box sx={{ mb: 2 }}>
                            <label htmlFor="slug" style={{ marginTop: "15px" }}>
                              <Typography variant="body1"> QUESTION SLUG <ErrorMessage name='slug' component={'span'} className='Error' /></Typography>
                            </label>
                            <Field as={TextField} id="slug" name="slug" placeholder="ENTER QUESTION SLUG" type="slug" style={{ width: "400px", marginTop: "10px" }} />
                          </Box>

                          <Box sx={{ marginTop: "25px", display: "flex", justifyContent: "space-between" }}>
                            <Button variant="contained" color="primary" style={{ width: "47%" }} type="reset">RESET</Button>
                            <Button variant="contained" color="primary" style={{ width: "47%" }} type="submit"> {Eid ? "UPDATE QUESTIONS" : "ADD QUESTIONS"}</Button>
                          </Box>

                        </Box>
                      </Form>
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
              <TextField fullWidth label="SEARCH QUESTIONS HERE" id="fullWidth" sx={{ width: "300px" }} onChange={(e) => SetSearch(e.target.value)} />
              {/*<Button variant="contained" color="primary" sx={{ height: "55px" }}>SEARCH </Button> */}
            </Box>
          </Box>
          <Box sx={{ marginTop: "50px" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#1976d2" }}>
                    <TableCell sx={{ color: "white" }} align="left">NO</TableCell>
                    <TableCell sx={{ color: "white" }} align="left">QUESTIONS</TableCell>
                    <TableCell sx={{ color: "white" }} align="left">ANSWERS</TableCell>
                    <TableCell sx={{ color: "white" }} align="left">DESCRIPTION</TableCell>
                    <TableCell sx={{ color: "white" }} align="center">SUB CATEGORIES</TableCell>
                    <TableCell sx={{ color: "white" }} align="right">EDIT</TableCell>
                    <TableCell sx={{ color: "white" }} align="right">DELETE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    Data.filter((items) => {
                      if (Search === "") {
                        return items
                      }
                      else if (items.questions.toLowerCase().includes(Search.toLowerCase())) {
                        return items
                      }
                    }).map((el, index) => {
                      return (
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component="th" scope="row" align='center'>{index + 1}</TableCell>
                          <TableCell align="left" sx={{ textTransform: "uppercase" }} >{el.questions}</TableCell>
                          <TableCell align="justify" sx={{ textTransform: "uppercase" }}>{el.answer}</TableCell>
                          <TableCell align="right" sx={{ textTransform: "uppercase" }}>{el.Description}</TableCell>
                          <TableCell align="center" sx={{ textTransform: "uppercase" }}>{el.subcatagoryID.subCatagoryname}</TableCell>
                          <TableCell align="right">
                            <Button variant="contained" startIcon={<EditIcon />} onClick={() => { Edit_Handler(el, el._id) }}>
                              EDIT
                            </Button>
                          </TableCell>
                          <TableCell align="right">
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
      </Box >
    </div >
  )
}

export default QuestionAnswer;
