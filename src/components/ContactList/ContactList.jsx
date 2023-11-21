import { nanoid } from 'nanoid';
import { StyledList, StyledButton } from './ContactList.styled';
import { useDispatch } from 'react-redux';
import { removeContact } from 'redux/phonebook-slice';

export const ContactList = ({ items }) => {
  const dispatch = useDispatch();
  return (
    <StyledList>
      {items.map(item => {
        return (
          <li key={nanoid()}>
            {item.name}: {item.number}{' '}
            <StyledButton
              type="button"
              onClick={() => {
                dispatch(removeContact(item.id));
              }}
            >
              Delete
            </StyledButton>
          </li>
        );
      })}
    </StyledList>
  );
};
