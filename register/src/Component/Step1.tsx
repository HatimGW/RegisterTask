import React from 'react'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import { Button, MenuItem} from '@mui/material';

const STEP1 = ({errors,register,govType,sex, handleSubmit,Step1}) => {
  return (
    <div className="main2">
    <div className="group">
    <InputLabel className="imp" htmlFor="name">Name</InputLabel>
    <TextField autoComplete="off" className="text2" placeholder="Enter Name" variant="outlined" {...register("name")}/>
    <span className="error">{(errors as Record<string, any>).name && (<ErrorRoundedIcon/>)}{(errors as Record<string, any>).name?.message}</span>
    </div>
    <div className="group">
    <InputLabel className="imp" htmlFor="dob">Date of Birth or Age in Years</InputLabel>
    <TextField autoComplete="off" className="text2" placeholder="DD/MM/YYYY or Age in Years" variant="outlined" {...register("dob")} />
    <span className="error">{(errors as Record<string, any>).dob && (<ErrorRoundedIcon/>)}{(errors as Record<string, any>).dob?.message}</span>
</div>
    <div className="group">
    <InputLabel className="imp" htmlFor="sex" id="named-select" style={{width:"50px"}}>Sex</InputLabel>
    <TextField autoComplete="off" select label="Select Gender" value={sex ? sex : ""} className="text2 selct" {...register("sex")}>
    <MenuItem value="Male">Male</MenuItem>
    <MenuItem value="Female">Female</MenuItem>
    </TextField>
    <span className="error">{(errors as Record<string, any>).sex && (<ErrorRoundedIcon/>)}{(errors as Record<string, any>).sex?.message}</span>
   </div>
   <div className="group">
    <InputLabel className="imp" htmlFor="mobile">Mobile</InputLabel>
    <TextField autoComplete="off" className="text2" placeholder="Enter Mobile" variant="outlined" {...register("mobile")}/>
    <span className="error">{(errors as Record<string, any>).mobile && (<ErrorRoundedIcon/>)}{(errors as Record<string, any>).mobile?.message}</span>
    </div>
    <div className="group">
    <InputLabel className="imp" htmlFor="gov">Govt Issued ID</InputLabel>
    <TextField autoComplete="off" select label="Id Type" value={govType ? govType : ""} className="text2 ID selct" variant="outlined" {...register("govType")}>
    <MenuItem value="Aadhaar">Aadhaar</MenuItem>
    <MenuItem value="PAN">PAN</MenuItem>
    </TextField>
    <span className="error2">{(errors as Record<string, any>).govType && (<ErrorRoundedIcon/>)}{(errors as Record<string, any>).govType?.message}</span>
    <TextField autoComplete="off" className="text2" placeholder="Enter Govt ID" variant="outlined" {...register("govId")}/>
    <span className="error">{(errors as Record<string, any>).govId && (<ErrorRoundedIcon/>)}{(errors as Record<string, any>).govId?.message}</span>
    </div>
    <div style={{justifyContent:"flex-end"}} className="group">
      <Button style={{fontFamily:"math"}} type="submit" onClick={handleSubmit(Step1)} variant="contained" color="success">Next</Button>
      </div>
    </div>
  )
}

export default STEP1