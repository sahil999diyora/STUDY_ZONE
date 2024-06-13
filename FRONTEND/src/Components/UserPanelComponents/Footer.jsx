import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import { Container, Button } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import Grid from '@mui/material/Grid';
import SendIcon from '@mui/icons-material/Send';
import HouseIcon from '@mui/icons-material/House';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import KeyboardCommandKeyIcon from '@mui/icons-material/KeyboardCommandKey';

function Footer() {
    return (
        <Box>
            <Container maxWidth="xl" sx={{ backgroundColor: "#0e121a", mt: 10 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 2 }} flexDirection={{ xl: "row", lg: "row", md: "row", sm: "column", xs: "column" }}>
                    <Box sx={{ color: "white", display: 'flex', alignItems: "center" }} >
                        <KeyboardCommandKeyIcon sx={{ fontSize: "30px", mr: 1 }} />
                        <Typography component={"span"} color="white">  GET CONNECTED WITH US ON SOCIAL NETWORKS</Typography>
                        <KeyboardCommandKeyIcon sx={{ fontSize: "30px", ml: 1 }} />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <FacebookIcon sx={{ mx: 1, color: "white" }} />
                        <InstagramIcon sx={{ mx: 1, color: "white" }} />
                        <TwitterIcon sx={{ mx: 1, color: "white" }} />
                        <LinkedInIcon sx={{ mx: 1, color: "white" }} />
                        <GitHubIcon sx={{ mx: 1, color: "white" }} />
                        <GoogleIcon sx={{ mx: 1, color: "white" }} />
                    </Box>
                </Box>
            </Container>
            <Container maxWidth="xl" sx={{ backgroundColor: "#1D2331", mt: 4 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={4}>
                        <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                            <Box sx={{ color: "white" }}>
                                <Typography component={"span"} sx={{ borderBottom: "2px solid white" }}> COMPONY NAME </Typography>
                                <Box sx={{ my: 5 }}>
                                    <Box sx={{ display: "flex", mt: 2 }}>
                                        <SendIcon sx={{ mr: 2 }} />
                                        <Typography component={"p"} sx={{ textAlign: "justify", pr: 4 }}>
                                            We offer modern solutions for growing your Career.
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", mt: 2 }}>
                                        <SendIcon sx={{ mr: 2 }} />
                                        <Typography component={"p"} sx={{ textAlign: "justify", pr: 4 }}>
                                            We are The team of talented Faculty ( Sir / Mam ) making Your Interview Easy with Our interview Infotech .
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                            <Box sx={{ color: "white" }}>
                                <Typography component={"span"} sx={{ borderBottom: "2px solid white" }}> PRODUCTS </Typography>
                                <Box sx={{ my: 5 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                        <SendIcon sx={{ mr: 2 }} />
                                        <Typography component={"p"} sx={{ fontSize: "14px" }}> MONGODB </Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                        <SendIcon sx={{ mr: 2 }} />
                                        <Typography component={"p"} sx={{ fontSize: "14px" }}> EXPRESS JS </Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                        <SendIcon sx={{ mr: 2 }} />
                                        <Typography component={"p"} sx={{ fontSize: "14px" }}> NODE JS </Typography>

                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                        <SendIcon sx={{ mr: 2 }} />
                                        <Typography component={"p"} sx={{ fontSize: "14px" }}> REACT JS </Typography>

                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                        <SendIcon sx={{ mr: 2 }} />
                                        <Typography component={"p"} sx={{ fontSize: "14px" }}> VS CODE </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                            <Box sx={{ color: "white" }}>
                                <Typography component={"span"} sx={{ borderBottom: "2px solid white" }}>USEFULL WEBSITE </Typography>
                                <Box sx={{ my: 5 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                        <SendIcon sx={{ mr: 2 }} />
                                        <Typography component={"p"} sx={{ fontSize: "14px" }}> W3SCHOOLS </Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                        <SendIcon sx={{ mr: 2 }} />
                                        <Typography component={"p"} sx={{ fontSize: "14px" }}> GEEKS FOR GEEKS </Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                        <SendIcon sx={{ mr: 2 }} />
                                        <Typography component={"p"} sx={{ fontSize: "14px" }}> CODE WARS </Typography>

                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                        <SendIcon sx={{ mr: 2 }} />
                                        <Typography component={"p"} sx={{ fontSize: "14px" }}> GOOGLE </Typography>

                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                        <SendIcon sx={{ mr: 2 }} />
                                        <Typography component={"p"} sx={{ fontSize: "14px" }}> GITHUB </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xl={3} lg={3} md={6} sm={6} xs={12}>
                            <Box sx={{ color: "white" }}>
                                <Typography component={"span"} sx={{ borderBottom: "2px solid white" }}> CONTACT </Typography>
                                <Box sx={{ my: 5 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                        <HouseIcon sx={{ mr: 2 }} />
                                        <Typography component={"p"} sx={{ fontSize: "14px" }}> INDIA , NY12100 , IN  </Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                        <LocalPostOfficeIcon sx={{ mr: 2 }} />
                                        <Typography component={"p"} sx={{ fontSize: "14px" }}> INTERVIEW@GMAIL.COM </Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                        <PhoneInTalkIcon sx={{ mr: 2 }} />
                                        <Typography component={"p"} sx={{ fontSize: "14px" }}> +91 9878987897 </Typography>

                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                        <WhatsAppIcon sx={{ mr: 2 }} />
                                        <Typography component={"p"} sx={{ fontSize: "14px" }}> +91 9673543827 </Typography>

                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                        <GitHubIcon sx={{ mr: 2 }} />
                                        <Typography component={"p"} sx={{ fontSize: "14px" }}> @ INTERVIEW </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Container maxWidth="xl" sx={{ backgroundColor: "#0e121a" }}>
                <Box sx={{ py: 2, textAlign: "center" }}>
                    <Typography component={"span"} color="white">  @ 2024 COPYRIGHT : SAHIL DIYORA </Typography>
                </Box>
            </Container>
        </Box>
    )
}

export default Footer;
