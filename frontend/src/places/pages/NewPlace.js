import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './PlaceForm.css';

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      quantity: {
        value: '',
        isValid: false
      },
      upccode: {
        value: '',
        isValid: false
      },
      creator: {
        value: '',
        isValid: false
      },
      location: {
        value: '',
        isValid: false
      },
      date: {
        value: '',
        isValid: false
      },
      time: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        'http://localhost:5000/api/places',
        'POST',
        JSON.stringify({
          title: formState.inputs.title.value,
          quantity: formState.inputs.quantity.value,
          upccode: formState.inputs.upccode.value,
          creator: auth.userId,
          location: formState.inputs.location.value,
          date: formState.inputs.date.value,
          time: formState.inputs.time.value,
        }),
        { 'Content-Type': 'application/json' }
      );
      history.push('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="quantity"
          element="textarea"
          label="Quantity"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid quantity."
          onInput={inputHandler}
        />
        <Input
          id="upccode"
          element="input"
          label="UPC Code"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid UPC Code."
          onInput={inputHandler}
        />
        <Input
          id="location"
          element="input"
          label="Location"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid location."
          onInput={inputHandler}
        />
        <Input
          id="creator"
          element="textarea"
          label="Creator"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid creator."
          onInput={inputHandler}
        />
        <Input
          id="date"
          element="input"
          label="Date"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid date."
          onInput={inputHandler}
        />
        <Input
          id="time"
          element="textarea"
          label="Time"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid time."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
