import { NumberInput } from "@mantine/core";
import { useController } from "react-hook-form";

const NumberInputRhf = (props) => {
  const { control, name, rules, ...restProps } = props;

  const { field } = useController({
    name,
    control,
    rules,
  });
  const { value, onChange } = field;
  return <NumberInput value={value} onChange={onChange} {...restProps} />;
};

export default NumberInputRhf;
