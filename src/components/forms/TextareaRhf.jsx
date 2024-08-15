import { Textarea } from "@mantine/core";
import { useController } from "react-hook-form";

const TextareaRhf = (props) => {
  const { control, name } = props;

  const { field } = useController({
    name,
    control,
  });
  const { value, onChange } = field;

  return <Textarea value={value} onChange={onChange} {...props} />;
};

export default TextareaRhf;
