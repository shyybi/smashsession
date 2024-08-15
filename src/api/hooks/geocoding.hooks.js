import { useQuery } from "@tanstack/react-query";
import { geocodingQueryKeys } from "../query-keys/geocoding.query-keys";
import { geocodeSearch } from "../queries/geocoding.queries";

export const useGeocodingSearch = (search) => {
  const { data: geocodingResults, ...rest } = useQuery({
    queryKey: geocodingQueryKeys.search(search),
    queryFn: () => geocodeSearch(search),
  });
  return { geocodingResults, ...rest };
};
