import axios from "axios";
import {GOOGLE_MAP_KEY} from '../config/constants';

export const getAddress = async (latitude, longitude) => {
    try{
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAP_KEY}`);
        if(response.status === 200){
            const results = response.data.results;
            if(Boolean(results.length)){
                const completeAddress =  results[0].formatted_address ?? "";
                if(Boolean(completeAddress)){
                    const address = completeAddress.split(",");
                    if(Boolean(address)){
                        return address[0];
                    }else{
                        return "";
                    }
                }else{
                    return "";
                }
            }else{
                return "";
            }
        }else{
            return "";
        }
    }catch(e){
        return "";
    }
    
}