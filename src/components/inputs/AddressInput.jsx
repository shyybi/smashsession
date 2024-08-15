import { useState } from "react";
import { useGeocodingSearch } from "../../api/hooks/geocoding.hooks";
import { Loader, Select } from "@mantine/core";
import { useDebounce } from "../../tools/useDebounce";

const AddressInput = () => {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const { geocodingResults, isLoading } = useGeocodingSearch(debouncedSearch);

  const results =
    geocodingResults?.map((result) => {
      return {
        value: result.place_id.toString(),
        label: result.display_name,
        latLon: {
          lat: result.lat,
          lon: result.lon,
        },
      };
    }) ?? [];

  return (
    <Select
      data={results}
      placeholder="Rechercher une adresse"
      label="Adresse"
      // Disable default search filter, we want to use our own
      filter={({ options }) => options}
      searchable
      searchValue={search}
      onSearchChange={(value) => {
        setSearch(value);
      }}
      rightSection={isLoading ? <Loader size="xs" /> : null}
    />
  );
};

export default AddressInput;
