import { PARSE_QUERY } from "@src/constants/parse-query";
import { useSearchParams } from "react-router-dom";


const useReadParams = () =>{
    const [searchParams] = useSearchParams();
    const readParams = JSON.parse(JSON.stringify(PARSE_QUERY)) as {[key: string]: string[]};

    searchParams.forEach((value, key) =>{
        readParams[key].push(value);
    });

    return [readParams] as const;
};

export default useReadParams;