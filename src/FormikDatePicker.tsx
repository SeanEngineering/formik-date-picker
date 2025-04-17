import React, { useEffect, useState } from 'react';
import { AdapterProps, AdapterType, FormikDatePickerProps } from './props';
import DatePicker from 'react-datepicker';
import { dateFormatter } from './util';

const FormikDatePicker = ({
  formik,
  field,
  defaultValue,
  formatter = dateFormatter,
  ...rest
}: FormikDatePickerProps<any>) => {
  if (!formik) throw new Error('This component must be provided with formik');
  const [localDate, setLocalDate] = useState<{
    date: Date | null;
    input: string | undefined;
  }>({
    date: null,
    input: defaultValue || '',
  });

  const onSelectChange = (selectedDate: Date | null) => {
    setLocalDate((prev) =>
      prev.date !== selectedDate ? { ...prev, date: selectedDate } : prev
    );
  };

  const onInputChange = (inputValue?: string) => {
    setLocalDate((prev) =>
      prev.input !== inputValue ? { ...prev, input: inputValue } : prev
    );
  };
  const handleRawInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>
  ) => {
    onInputChange(e.target.value);

    if (rest.onChangeRaw) {
      rest.onChangeRaw(e as unknown as AdapterProps);
    }
  };

  useEffect(() => {
    if (defaultValue !== localDate.input) {
      setLocalDate((prev) => {
        return {
          ...prev,
          input: !defaultValue ? '' : defaultValue,
        };
      });
    }
  });

  useEffect(() => {
    if (localDate.date) {
      const formattedDate = formatter.format(localDate.date);
      if (formik.values[field] !== formattedDate) {
        formik.setFieldValue(field, formattedDate);
      }
    }
  }, [localDate.date]);

  useEffect(() => {
    if (formik.values[field] !== localDate.input) {
      formik.setFieldValue(field, localDate.input);
    }
  }, [localDate.input]);

  return (
    <DatePicker
      onSelect={onSelectChange}
      {...rest}
      onChangeRaw={handleRawInputChange as unknown as AdapterType}
    />
  );
};

export default FormikDatePicker;
