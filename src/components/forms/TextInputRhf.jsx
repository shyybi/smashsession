import { TextInput } from "@mantine/core";
import { useController } from "react-hook-form";

const TextInputRhf = (props) => {
  const { control, name, rules, ...restProps } = props;

  const { field } = useController({
    name,
    control,
    rules,
  });
  const { value, onChange } = field;

  return <TextInput value={value} onChange={onChange} {...restProps} />;
};

export default TextInputRhf;
