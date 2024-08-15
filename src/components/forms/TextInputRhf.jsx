import { TextInput } from "@mantine/core";
import { useController } from "react-hook-form";

const TextInputRhf = (props) => {
  const { control, name } = props;

  const { field } = useController({
    name,
    control,
  });
  const { value, onChange } = field;

  return <TextInput value={value} onChange={onChange} {...props} />;
};

export default TextInputRhf;
