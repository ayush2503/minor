import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { fetchProblems } from '../../Store/Action/fetchDetails';
import { useSelector } from 'react-redux'
import Loader from '../../helpers/Loader/Loader';
import { toast } from 'react-toastify';
import { addProblems } from '../../Store/Action/userAuthAction';
import { Box } from '@mui/system';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'Problems', headerName: 'Problems', sortable: false, flex: 2 },
  
  { field: 'tags', headerName: 'Tags', width: 100 ,flex:3.1,renderCell:(cellValues)=>{

    return <div style={{display:'flex'}}>{cellValues.row.tags.map(elem=><p style={{marginRight:'5px'}}><span style={{color:"#0077b6"}}>{elem}</span> | </p>)}</div>
  }},
  
  { field: 'ContestID', headerName: 'Contest ID',flex:0.5, sortable: false },
  { field: 'Rating', headerName: 'Rating', width: 100 },
  {
    field: "Route",
    renderCell: (cellValues) => {
     
      return <a href={`${cellValues.row.uri}`} target="_blank"> Link</a>
    }
  }

];

function Home() {
  const [text, setText] = useState("Fefer_Ivan")

  const [selectedProb, setselectedProb] = useState([])
  const { prob, probLoader } = useSelector(state => state.fetchedProblem)
  const { userDetails, authLoader ,isAuthenticated} = useSelector(state => state.authDetails)

  const handleCellClick = (param, event) => {
    console.log(event.stopPropagation());
    event.stopPropagation();

  }
  const handleRowClick = (param, event) => {
    event.stopPropagation();
  };

  const handleAddProblems = () => {
    if (selectedProb.length > 0) {
      const res = prob?.filter((d) => {
        return selectedProb.includes(d.id)
      })
      console.log("userDetails",userDetails);
      addProblems({selection:res,current:userDetails.myProblems,ref:userDetails.ref})
      setselectedProb([])
    }


  }
  return (
    <div style={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>


      <div style={{ padding: '2vmax', width: "40%", display: 'flex', justifyContent: "space-between" }}>
        <TextField style={{ width: "80%" }} placeholder={"Enter CodeChef User id"}
          onChange={(val => setText(val.target.value))}
          value={text}
        />
        <Button variant="contained" size="small" onClick={() => {
          fetchProblems(text)

        }}>
          search
        </Button>
      </div>

        {/* <div className="row" style={{}}> */}
        { prob.length > 0 ?
      <div style={{ height: "65vh", width: "100%" }}>
        {/* <div> */}
          <DataGrid
            rows={prob}
            getRowId={(row) => row.id}
            columns={columns}
            pageSize={50}
            rowsPerPageOptions={[9]}
            checkboxSelection
            onSelectionModelChange={(selection) => {
              console.log("aaaaaa", selection)
              setselectedProb(selection)
              // handleAddProblems(selection)
            }}
            selectionModel={selectedProb}
            onCellClick={handleCellClick}
            onRowClick={handleRowClick}
          />
          <Box sx={{ display:'flex',justifyContent: 'center',mt:2 }}>
          <Button variant="contained" size="small" onClick={() => {
        if(!isAuthenticated)
        {
          return toast.error("Please Login to continue!!")
        }
        handleAddProblems()
      }

      }>
        ADD
      </Button >

          </Box>
        </div> : 
        
        <div></div>}
        {/* </div> */}
      {/* </div> */}
      
      {(probLoader || authLoader) && <Loader />}

    </div>
  )
}

export default Home