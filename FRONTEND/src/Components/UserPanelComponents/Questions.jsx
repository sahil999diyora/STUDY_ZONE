import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Box, Container } from '@mui/material';
// import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { SearchTwoTone } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { useParams } from 'react-router-dom';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `2px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '5px solid rgba(0, 0, 0, .125)',
}));

export default function Questions() {

  let [accordionData, SetaccordionData] = useState([]);

  let [Search, SetSearch] = useState("");

  let { SubCategoriesID } = useParams();

  let Question_Data = () => {

    axios.get("http://localhost:5500/questions/", {
      headers: {
        Authorization: localStorage.getItem("ADMIN_TOKEN")
      }
    })
      .then((res) => {

        if (SubCategoriesID) {

          let SubCate_Questions_DataFilter = res.data.data.filter((items) => {
            return (SubCategoriesID === items.subcatagoryID._id) && (items.questions.toLowerCase().includes(Search.toLowerCase()))
          })

          SetaccordionData(SubCate_Questions_DataFilter)
        }
        else {
          SetaccordionData(res.data.data)
        }

      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    Question_Data();
  }, [SubCategoriesID])

  const [expanded, setExpanded] = React.useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ marginBottom: "25px" }}>
        <Box sx={{ display: "flex", alignItems: "center" }} justifyContent={{ xl: "space-between", lg: "space-between", md: "space-between", sm: "center", xs: "center" }}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "50px 0px 45px 0px" }}>
            {/*<AutoStoriesIcon sx={{ fontSize: "30px", mr: 2, color: "#013289" }} />*/}
            <Typography variant="h5" color="#013289"> READ INTERVIEW QUESTIONS HERE</Typography>
            {/*<AutoStoriesIcon sx={{ fontSize: "30px", ml: 2, color: "#013289" }} />*/}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SearchTwoTone sx={{ marginRight: "20px", border: "2px solid", color: "#013289", padding: "8px", fontSize: "35px", borderRadius: "5px" }} />
            <TextField label="SEARCH QUESTIONS HERE" sx={{ width: "270px" }} onChange={(e) => SetSearch(e.target.value)} />
          </Box>
        </Box>
        {
          // accordionData.filter((items) => {

          // 1ST TRY //

          //   if (Search === "") {
          //     return items
          //   }
          //   else if (items.questions.toLowerCase().includes(Search.toLowerCase())) {
          //     return items
          //   }
          // })

          // 2ND TRY //

          // accordionData.filter((item) => {
          //   if (item.subcatagoryID.status === 'on') {
          //     return Search === "" || item.questions.toLowerCase().includes(Search.toLowerCase());
          //   }
          // })

          accordionData.filter((item) => {
            if (item.subcatagoryID.status === 'on' && item.subcatagoryID.catagoryID.status === 'on') {
              return Search === "" || item.questions.toLowerCase().includes(Search.toLowerCase());
            }
            return false
          })
            .map((el, index) => (
              <Accordion
                key={index}
                expanded={expanded === index}
                onChange={handleChange(index)}
              >
                <AccordionSummary aria-controls={`panel${index}d-content`} id={`panel${index}d-header`}>
                  <Typography sx={{ textTransform: "uppercase", textAlign: "justify" }}> {index + 1} . {el.questions} ( {el.subcatagoryID.subCatagoryname} ) </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ textTransform: "uppercase", textAlign: "justify", lineHeight: "35px" }}>{el.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))
        }
      </Box>
    </Container>
  );
}
