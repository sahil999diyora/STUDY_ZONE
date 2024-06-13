import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import WindowIcon from '@mui/icons-material/Window';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function NavUser() {
    return (
        <Box sx={{ flexGrow: 1, position: "sticky", top: 0, zIndex: 9999 }}>
            <AppBar position="static" sx={{ backgroundColor: 'white', color: '#013289' }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex" }}>
                        <Link to="/">
                            <WindowIcon sx={{ fontSize: '30px', marginRight: "5px", color: '#013289' }} />
                        </Link>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} display={{ lg: "block", md: "block", xs: "none" }}>
                            <Link to="/" style={{ textDecoration: "none", color: '#013289' }}> INTERVIEW INFOTECH </Link>
                        </Typography>
                    </Box>
                    <Box>
                        <Link to="/"><Button color="inherit" sx={{ fontSize: "18px", color: '#013289' }}>HOME</Button></Link>
                        <Link to="/Categories"><Button color="inherit" sx={{ fontSize: "18px", color: '#013289' }}> CATEGORIES</Button></Link>
                        <Link to="/SubCategories"><Button color="inherit" sx={{ fontSize: "18px", color: '#013289' }}> SUB CATEGORIES</Button></Link>
                        <Link to="/Questions"><Button color="inherit" sx={{ fontSize: "18px", color: '#013289' }}> QUESTIONS </Button></Link>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavUser;