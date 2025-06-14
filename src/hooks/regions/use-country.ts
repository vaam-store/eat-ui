import {useListRegion} from "@vaa/hooks/regions/use-region";
import _ from "lodash";
import {useMemo} from "react";

export function useCountries() {
    const {data} = useListRegion();
    return useMemo(() => {
        const countries = data.flatMap(i => i.countries).filter(Boolean);
        return _.unionBy(countries, 'id');
    }, [data]);
}
