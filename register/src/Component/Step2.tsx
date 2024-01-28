import React from 'react'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import { Button, MenuItem } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const STEP2 = ({errors,register,selectedCountry,setSelectedCountry,countryOptions,handleSubmit,onSubmit,setStep}) => {
  return (
    <div className="main2">
    <div className="group">
    <InputLabel className="imp" htmlFor="address">Address</InputLabel>
    <TextField autoComplete="new-password" className="text2" placeholder="Enter address" variant="outlined" {...register("address")}/>
    <span className="error">{(errors as Record<string, any>).address && (<ErrorRoundedIcon/>)}{(errors as Record<string, any>).address?.message}</span>
    </div>
    <div className="group">
    <InputLabel className="imp" htmlFor="country">Select Country</InputLabel>
    <Autocomplete
       className="text3"
       value={selectedCountry}
       onChange={(e,value) => setSelectedCountry(value)}
       options={countryOptions}
       renderInput={(params) => (
         <TextField {...params} label="Select" className='selct' autoComplete="new-password" name="country" type="text"  margin="normal" {...register("country")}/>
       )}
       renderOption={(props, option) => (
         <MenuItem {...props}>
           {option}
         </MenuItem>
       )}
       autoComplete={false}
     />
    <span className="error">{(errors as Record<string, any>).country && (<ErrorRoundedIcon/>)}{(errors as Record<string, any>).country?.message}</span>
    </div>
    <div className="group">
    <InputLabel className="imp" htmlFor="State">State</InputLabel>
    <TextField autoComplete="new-password" className="text2" placeholder="Enter State" variant="outlined"  {...register("state")}/>
    <span className="error">{(errors as Record<string, any>).state && (<ErrorRoundedIcon/>)}{(errors as Record<string, any>).state?.message}</span>
    </div>
    <div className="group">
    <InputLabel className="imp" htmlFor="City">City</InputLabel>
    <TextField autoComplete="new-password" className="text2" placeholder="Enter city/town/village" variant="outlined" {...register("city")}/>
    <span className="error">{(errors as Record<string, any>).city && (<ErrorRoundedIcon/>)}{(errors as Record<string, any>).city?.message}</span>
    </div>
    <div className="group">
    <InputLabel className="imp" htmlFor="Pin">Pincode</InputLabel>
    <TextField autoComplete="new-password" className="text2"  placeholder="Enter Pincode" variant="outlined" {...register("pin")}/>
    <span className="error">{(errors as Record<string, any>).pin && (<ErrorRoundedIcon/>)}{(errors as Record<string, any>).pin?.message}</span>
    </div>
    <div className="group back">
    <Button style={{paddingRight:"0",paddingLeft:"0",zIndex:"2",borderRadius:"18%"}} onClick={()=>setStep(1)} type="submit" variant="contained" color="success"><ArrowBackIosIcon style={{color:"azure",paddingLeft:"7px"}}/></Button>
    </div>
    <div style={{justifyContent:"center"}} className="group">
    <Button style={{fontFamily:"math"}} onClick={handleSubmit(onSubmit)} type="submit" variant="contained" color="success">Submit</Button>
    </div>
    </div>
  )
}

export default STEP2