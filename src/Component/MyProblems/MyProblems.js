import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useSelector } from 'react-redux'
import { fetchSavedProbList } from '../../Store/Action/fetchDetails'
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, Divider, Paper, Typography } from '@mui/material';
import Loader from '../../helpers/Loader/Loader';
import ProgressBar from 'react-animated-progress-bar';

function MyProblems() {
  const { savedProbList,myProbLoader } = useSelector(state => state.fetchedProblem)
  const { userDetails } = useSelector(state => state.authDetails)
  console.log(userDetails);
  useEffect(() => {
    fetchSavedProbList(userDetails.ref)
  }, [])
  const columns = [
    {
      field: 'id', headerName: 'ID', width: 100,
      renderCell: (cellValues) => {
        return <p>{cellValues.api.getRowIndex(cellValues.row.id) + 1}</p>
        // console.log(cellValues.api.getRowIndex(cellValues.row.id))

      }
    },
    { field: 'Problems', headerName: 'Problems', sortable: false, flex: 2 },
    {
      field: 'tags', headerName: 'Tags', width: 100, flex: 2.5, renderCell: (cellValues) => {

        return <div style={{ display: 'flex' }}>{cellValues.row.tags.map(elem => <p style={{ marginRight: '5px' }}><span style={{ color: "#0077b6" }}>{elem}</span> | </p>)}</div>
      }
    },
    {
      field: 'ContestID',
      headerName: 'Contest ID', flex: 1, sortable: false
    },
    { field: 'Rating', headerName: 'Rating', width: 100 },
    {
      field: "Route",
      renderCell: (cellValues) => {

        return <a href={`${cellValues.row.uri}`} target="_blank"> Link</a>
      }
    },
    {
      field: "Action",
      flex: 1.1,
      renderCell: () => {
        return <div style={{ display: 'flex' }}>
          <IconButton style={{ marginRight: '5px' }} aria-label="Mark as done">
            <CheckIcon />
          </IconButton>
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </div>
      }
    }

  ];

  if(myProbLoader){
    return <Loader/>
  }
  return (

    <div style={{padding:'0vh 3vh'}}>
     
        {/* <Divider sx={{mt:3,mb:3}} /> */}
      <div style={{ height: "65vh", width: "100%" ,display:'flex' ,justifyContent:"space-between"}}>
       <div style={{width:"76%" ,marginTop:"1vmax"}}>

        {savedProbList.length ?
          <DataGrid
            rows={savedProbList}
            getRowId={(row) => (row.id)}
            columns={columns}
            pageSize={50}
            rowsPerPageOptions={[9]}
            // checkboxSelection
            disableColumnMenu={true}
          /> : <div></div>}
       </div>

<div style={{marginTop:'2vh',width:'22%',}}>
      <div style={{display:'flex',padding:'1vmax',justifyContent:'space-between',flexDirection:'column',}}>

        {/* userCArd */}
        <Paper elevation={1} style={{marginBottom:"1.5vmax"}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:"center",padding:"1vmax"}}>
        
        <Avatar
          // alt="Remy Sharp"
          src={userDetails?.photoURL}
          sx={{ width: 50, height: 50 }}
        />
        <div style={{marginLeft:"2vmax"}}>
        <p style={{textTransform:"capitalize"}}>{userDetails.displayName}</p>
        <p>{userDetails.email}</p>
        </div>

        </div>
        </Paper>

        {/* statsCard */}
        <Typography variant='p' style={{fontSize:"1vmax",fontWeight:"550", color:"#515151",marginBottom:"0.5vmax"}}>Your Performance</Typography>
        <Paper elevation={1} style={{padding:"1vmax",}}>
        <ProgressBar   defColor={{
            fair: 'orangered',
            good: 'yellow',
            excellent: 'green',
            poor: 'red',
          }} width="150" trackWidth="13" percentage="10" />

        </Paper>
      </div>
      </div>

      </div>
      
      {/* {true && <Loader />} */}
    

    </div>
  )
}

export default MyProblems