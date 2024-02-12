import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import './Pharmacy.css'
import { Medicine } from "../Medicine/Medicine";
import { getDrugs } from "../../features/drug/drugActions";
import DrugDetails from "../../components/DrugDetails/DrugDetails";

const Pharmacy = () => {

    const dispatch = useDispatch();

    const {
        loading,
        drugs,
        drug,
        error,
        success,
    } = useSelector((state) => state.drug);


    const [showDrugDetails, setShowDrugDetails] = useState(null);

    useEffect(() => {
        dispatch(getDrugs({}))
    }, []);

    return (

        <div className="pharmacy-main" >
            <p
                style={{
                    fontSize: "4rem",
                    marginTop: "2rem",
                    fontWeight: "bolder",
                    fontFamily: "sans-serif",
                    textShadow:
                        "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                }}
            >
                Pharmacy
            </p>

            {showDrugDetails != null ?
                < div style={{width:"70%"}}>
                    <DrugDetails

                        showDrugDetails={showDrugDetails}
                        setShowDrugDetails={setShowDrugDetails} />

                </div>

                :
                <div className="products">
                    {drugs?.length != null ? drugs?.map((drug) => (
                        <div onClick={() => {

                            console.log('clicking')
                            setShowDrugDetails(drug)
                        }}>

                            <Medicine data={drug} />
                        </div>
                    ))
                        :
                        'No Drug Found!'
                    }
                </div>
            }

        </div>
    )
}

export default Pharmacy;
