import { useController } from "react-hook-form";
import { DateTimePicker } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";

const DateTimePickerRhf = (props) => {
  const { control, name, rules, ...restProps } = props;

  const { field } = useController({
    name,
    control,
    rules,
  });
  const { value, onChange } = field;

  return (
    <DateTimePicker
      leftSection={<IconClock color="black" size="1.2rem" />}
      value={value}
      onChange={onChange}
      {...restProps}
    />
  );
};

export default DateTimePickerRhf;
