import { useReducer, useCallback } from 'react';

const productReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: formIsValid,
      };
    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.isValid,
      };
    default:
      return state;
  }
};

export const useProductForm = (initialInputs, initialIsValidForm) => {
  const [formState, dispatch] = useReducer(productReducer, {
    inputs: initialInputs,
    isValid: initialIsValidForm,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({ type: 'INPUT_CHANGE', inputId: id, value, isValid });
  }, []);

  const setDataHandler = useCallback((inputsData, isValidForm) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputsData,
      isValid: isValidForm,
    });
  }, []);

  return [formState, inputHandler, setDataHandler];
};
