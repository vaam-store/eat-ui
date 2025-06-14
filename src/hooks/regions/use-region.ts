import {useMedusa} from "@vaa/hooks/medusa";
import type {FindParams, HttpTypes, SelectParams} from "@medusajs/types";
import {useSuspenseQuery} from "@tanstack/react-query";

export function useListRegion(query?: FindParams & HttpTypes.StoreRegionFilters) {
    const medusa = useMedusa();
    return useSuspenseQuery({
        queryKey: ['regions', query],
        queryFn: async () => {
            const response = await medusa.store.region.list(query);
            return response.regions;
        },
    })
}

export function useRegion(id: string, query?: SelectParams) {
    const medusa = useMedusa();
    return useSuspenseQuery({
        queryKey: ['region', id, query],
        queryFn: async () => {
            const response = await medusa.store.region.retrieve(id, query);
            return response.region;
        },
    })
}