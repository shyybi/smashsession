import { NumberInput } from "@mantine/core";
import { useController } from "react-hook-form";

const NumberInputRhf = (props) => {
  const { control, name } = props;

  const { field } = useController({
    name,
    control,
  });
  const { value, onChange } = field;
  return <NumberInput value={value} onChange={onChange} {...props} />;
};

export default NumberInputRhf;
