import { Textarea } from "@mantine/core";
import { useController } from "react-hook-form";

const TextareaRhf = (props) => {
  const { control, name, rules, ...restProps } = props;

  const { field } = useController({
    name,
    control,
    rules,
  });
  const { value, onChange } = field;

  return <Textarea value={value} onChange={onChange} {...restProps} />;
};

export default TextareaRhf;
