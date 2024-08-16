import { useState } from "react";
import { useGeocodingSearch } from "../../api/hooks/geocoding.hooks";
import { Loader, Select } from "@mantine/core";
import { useDebounce } from "../../tools/useDebounce";
import { useController } from "react-hook-form";

const AddressInput = (props) => {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search);

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

  const { name, control } = props;

  const { field } = useController({
    name,
    control,
  });
  const { value, onChange } = field;

  const handleChange = (placeId) => {
    if (placeId === null) {
      onChange(null);
    }
    const addessSelected = results.find((result) => result.value === placeId);
    onChange(
      addessSelected
        ? {
            placeId,
            label: addessSelected.label,
            lat: addessSelected.latLon.lat,
            lon: addessSelected.latLon.lon,
          }
        : null
    );
  };

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
      onChange={handleChange}
      value={value ? value.placeId : null}
      {...props}
    />
  );
};

export default AddressInput;
