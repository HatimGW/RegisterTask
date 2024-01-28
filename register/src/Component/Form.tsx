import React, { useEffect, useState } from 'react'
import "../register.css"
import { useForm} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector,useDispatch } from 'react-redux'
import { addData } from '../Redux/Action';
import { DATA } from '../Redux/types';
import { RootState } from '../Redux/Combine';
import DataTable from "./DataTable";
import STEP1 from './Step1';
import STEP2 from './Step2';

const Form :React.FC= () => {

 interface FormDataStep1{
    name: string;
    sex: string;
    dob?: any | undefined;
    mobile: string;
    govType: string;
    govId: string;
  }
  interface FormDataStep2{
    address: string;
    country: string;
    state: string;
    city: string;
    pin: string;
  }
  interface Country {
    name: {
      common: string;
    };
  }
    const [step, setStep] = useState<number>(1);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [countryOptions, setOptions] = useState<string[]>([]);

    const Data = useSelector((state: RootState) => state.Data.Data);
    const dispatch = useDispatch()

    console.log(Data)

    const schema2: yup.ObjectSchema<FormDataStep2> = yup.object().shape({
      address: yup.string().required("Address is required").min(5, "Address requires 5+ characters"),
      country: yup.string().required("Country is required"),
      state: yup.string().required("State is required").matches(/^[A-Za-z .]+$/, 'Alphabetic characters only').min(2, "State needs 2+ characters"),
      city: yup.string().required("City is required").matches(/^[A-Za-z ]+$/, 'Alphabetic characters only').min(3, "City needs 3+ characters"),
      pin: yup.string().required("Pincode is required").matches(/^\d{6}$/, "PIN must be a 6-digit number"),
  })

    const createSchema = (isStep2: boolean): yup.ObjectSchema<FormDataStep1> | yup.ObjectSchema<FormDataStep2> => {
      if (isStep2) {
        return schema2;
      } else {
        return yup.object().shape({
          name: yup.string().required("Name is required").matches(/^[A-Za-z ]+$/, 'Alphabetic characters only').min(3, "Name needs 3+ characters"),
          sex: yup.string().required("Gender is required").oneOf(["Male", "Female"], "Invalid gender selection"),
          dob: yup.mixed().transform((value, originalValue) => {
       if (originalValue === undefined || originalValue === null) {
      return "";
    }
    return String(originalValue) as string;
  }).test("dob", "Use DD/MM/YYYY format", function (value) {
    const isDate = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/.test(value as string);
    const isAge = !isNaN(parseFloat(value as string)) && isFinite(parseFloat(value as string)) && parseFloat(value as string) > 0;
    if(value === ""){
      throw this.createError({ message: "Date of birth/Age is required" });
    }
    if (isDate || isAge) {
      return true;
    }
    return false;
  }),
  mobile: yup.string().required("Mobile is required").matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Invalid Indian mobile number"),
  govType: yup.string().oneOf(["Aadhaar", "PAN"], "Invalid ID Type").required("ID Type is required"),
  govId: yup.string().test({ 
  name: "conditional-validation",
  exclusive: false,
  message: "Invalid Government ID",
  test: function (this: yup.TestContext, govId: string | undefined) {
    if (govId !== undefined) {
      const govType = this.parent.govType;
    if (govType === "Aadhaar") {
      return /^[2-9]\d{11}$/.test(govId);
      } else if (govType === "PAN") {
      return /^[A-Z]{5}\d{4}[A-Z]$/.test(govId);
      }
      }
    return true;
        },
    }).required("Government ID is required"),
  });
      }
    };

  const schema: yup.ObjectSchema<FormDataStep1 | FormDataStep2> = createSchema(step === 2);

  const { handleSubmit, formState: { errors }, register, trigger, reset, watch } = useForm({
      resolver: yupResolver(schema),
    });
  
  const govType = watch("govType");
  const sex = watch("sex");

    
  const Step1 = async () => {
      try {
        await trigger();
        if (Object.keys(errors).length === 0) {
           setStep(2);
        }
      } catch (error) {
        console.log(error)
      }
       
     };

  const onSubmit = (formData: DATA | any)=> {
      setStep(1)
      setSelectedCountry(null)
      reset()
      dispatch<any>(addData(formData))
      };

    useEffect(() => {
        const fetchCountries = async () => {
          try {
            const response = await fetch("https://restcountries.com/v3.1/all");
            const data: Country[] = await response.json();
            const countryNames = data.map((country) => country.name.common);
            setOptions(countryNames);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchCountries();
      }, []);
      
  return (
    <>
    <section>
    <div className="main">
    <form>
    <fieldset id="field">
    <legend id='legnd'>Register</legend>
    <div className="statusDiv">
    <div className={`status-bar step${step}`} >
      <div style={{backgroundColor: step === 1 ? "#4caf50" : step === 2 ? "#4caf50" : ""}} className="circle start">1</div>
      <div style={{backgroundColor: step === 1 ? "#929497" :  "#4caf50"}} className="circle end">2</div>
      </div>
      <div className="status"><span>User Details</span><span>Additional details</span></div>
      </div>
      {step === 1 && <STEP1 Step1={Step1} handleSubmit={handleSubmit} sex={sex} govType={govType} errors={errors} register={register}/>}
      {step === 2 && <STEP2 errors={errors} register={register} countryOptions={countryOptions} setSelectedCountry={setSelectedCountry} selectedCountry={selectedCountry} handleSubmit={handleSubmit} setStep={setStep} onSubmit={onSubmit}/>
      }
     </fieldset>
     </form>
    </div>
   </section>
    <DataTable />
    </>
  )
}

export default Form