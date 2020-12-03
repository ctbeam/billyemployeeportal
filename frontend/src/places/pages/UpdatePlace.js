import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import {
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './PlaceForm.css';

const UpdatePlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  const placeId = useParams().placeId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        );
        setLoadedPlace(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true
            },
            quantity: {
              value: responseData.place.quantity,
              isValid: true
            },
            upccode: {
              value: responseData.place.upccode,
              isValid: true
            },
            location: {
              value: responseData.place.location,
              isValid: true
            },
            creator: {
              value: responseData.place.creator,
              isValid: true
            },
            date: {
              value: responseData.date.quantity,
              isValid: true
            },
            time: {
              value: responseData.time.quantity,
              isValid: true
            }
          },
          true
        );

      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  const placeUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          quantity: formState.inputs.quantity.value,
          upccode: formState.inputs.upccode.value,
          creator: auth.userId,
          location: formState.inputs.location.value,
          date: formState.inputs.date.value,
          time: formState.inputs.time.value,
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      history.push('/' + auth.userId + '/places');
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedPlace.title}
            initialValid={true}
          />
          <Input
            id="quantity"
            element="textarea"
            label="Quantity"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid quantity."
            onInput={inputHandler}
            initialValue={loadedPlace.quantity}
            initialValid={true}
          />
          <Input
            id="upccode"
            element="textarea"
            label="UPC Code"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid UPC Code."
            onInput={inputHandler}
            initialValue={loadedPlace.upccode}
            initialValid={true}
          />
          <Input
            id="Location"
            element="textarea"
            label="Location"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid Location."
            onInput={inputHandler}
            initialValue={loadedPlace.upccode}
            initialValid={true}
          />
          <Input
            id="creator"
            element="textarea"
            label="Employee"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid employee name."
            onInput={inputHandler}
            initialValue={loadedPlace.upccode}
            initialValid={true}
          />
          <Input
            id="time"
            element="textarea"
            label="Time"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid time."
            onInput={inputHandler}
            initialValue={loadedPlace.time}
            initialValid={true}
          />
          <Input
            id="date"
            element="textarea"
            label="Date"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid date."
            onInput={inputHandler}
            initialValue={loadedPlace.upccode}
            initialValid={true}
          />
          
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePlace;
