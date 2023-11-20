import { Formik } from 'formik';
import { nanoid } from 'nanoid';
import * as Yup from 'yup';
import {
  StyledForm,
  StyledLabel,
  StyledButton,
  StyledField,
  StyledErrorMessage,
} from './ContactForm.styled';
import { addContact } from 'redux/phonebook-slice';
import { useDispatch } from 'react-redux';

const phonebookSchema = Yup.object().shape({
  name: Yup.string().required('This field is required!'),
  number: Yup.string()
    .matches(/^[0-9-+]+$/, 'Please enter digits, "-" or "+"')
    .required('This field is required!'),
});

export const ContactForm = () => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={phonebookSchema}
      onSubmit={(values, actions) => {
        dispatch(addContact({ ...{ id: nanoid() }, ...values }));
        actions.resetForm();
      }}
    >
      <StyledForm>
        <StyledLabel>
          Name
          <StyledField name="name" />
          <StyledErrorMessage name="name" component="div" />
        </StyledLabel>
        <StyledLabel>
          Number
          <StyledField name="number" />
          <StyledErrorMessage name="number" component="div" />
        </StyledLabel>
        <StyledButton type="submit">Add contact</StyledButton>
      </StyledForm>
    </Formik>
  );
};
