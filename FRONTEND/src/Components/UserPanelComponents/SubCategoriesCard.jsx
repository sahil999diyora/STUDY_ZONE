import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Divider, TextField } from '@mui/material';
import { SearchTwoTone } from '@mui/icons-material';
// import Button from '@mui/material/Button';
// import CardActions from '@mui/material/CardActions';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';


function SubCategoriesCard() {

    let [SubCategories, SetSubCategories] = useState([]);
    let [Search, SetSearch] = useState("")

    let { CategoriesID } = useParams();

    const History = useHistory();

    let SubCateID_Handler = (el) => {

        History.push("/Questions/" + el._id);

    }

    let SUB_CATEGORIES = () => {
        axios.get("http://localhost:5500/subcatagory/", {
            headers: {
                Authorization: localStorage.getItem("ADMIN_TOKEN")
            }
        })
            .then((res) => {

                if (CategoriesID) {

                    const Cate_SubCate_DataFilter = res.data.data.filter((items) => {
                        return (CategoriesID === items.catagoryID._id) && (items.status === "on") && (items.subCatagoryname.toLowerCase().includes(Search.toLowerCase()))
                    })

                    SetSubCategories(Cate_SubCate_DataFilter);
                }
                else {
                    SetSubCategories(res.data.data);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        AOS.init();
        SUB_CATEGORIES()
    }, [CategoriesID])

    return (
        <Container maxWidth="xl">
            <Box sx={{ display: "flex", alignItems: "center", my: 5 }} justifyContent={{ xl: "space-between", lg: "space-between", md: "space-between", sm: "center", xs: "center" }}>
                <Typography variant="h5" color="#013289" display={{ xl: "block", lg: "block", md: "block", sm: "none", sx: "none" }}> EXPLORE OUR SUB CATEGORIES </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <SearchTwoTone sx={{ marginRight: "20px", border: "2px solid", color: "#013289", padding: "8px", fontSize: "35px", borderRadius: "5px" }} />
                    <TextField label="SEARCH SUB CATEGORIES" sx={{ width: "270px" }} onChange={(e) => SetSearch(e.target.value)} />
                </Box>
            </Box>
            <Grid container spacing={4} sx={{ mb: 4 }}>
                {
                    // SubCategories.filter((items) => {

                    // 1ST TRY //

                    // if (Search === "") {
                    //     return items
                    // }
                    // else if (items.subCatagoryname.toLowerCase().includes(Search.toLowerCase())) {
                    //     return items
                    // }

                    // 2ND TRY //

                    //     if (items.status === "on") {
                    //         return Search === "" || items.subCatagoryname.toLowerCase().includes(Search.toLowerCase());
                    //     }
                    //     return false;
                    // })

                    SubCategories.filter((item) => {
                        if (item.status === 'on' && item.catagoryID.status === 'on') {
                            return Search === "" || item.subCatagoryname.toLowerCase().includes(Search.toLowerCase());
                        }
                        return false;
                    }).map((el, index) => {
                        return (
                            <Grid key={index} item xl={3} lg={3} md={6} sm={6} xs={12}>
                                <Box data-aos="zoom-in">
                                    <Card sx={{ minWidth: 275, bgcolor: "#013289", borderRadius: "10px" }} className='CatCards' onClick={() => SubCateID_Handler(el)}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="210px"
                                                image={`http://localhost:5500/images/subcategory/${el.subCategoryImage}`}
                                                alt={el.alternamtiveImage}
                                            />
                                            <CardContent>
                                                <Box sx={{ display: "flex", justifyContent: "start" }}>
                                                    <InsertDriveFileIcon sx={{ color: "white", textAlign: "center", fontSize: "30px", mb: 1, mr: 2 }} />
                                                    <Typography gutterBottom variant="h5" component="div" sx={{ color: "white", mb: 2 }}>
                                                        {el.subCatagoryname}
                                                    </Typography>
                                                </Box>
                                                <Divider sx={{ width: "100%", backgroundColor: "white", mb: 2 }} />
                                                <Typography sx={{ color: "white", mt: 3, mb: 1 }}>
                                                    {el.Description}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Box>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Container>
    )
}

export default SubCategoriesCard;