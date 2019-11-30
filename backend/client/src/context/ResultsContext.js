import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const Context = createContext({});

export const Provider = props => {
  // Initial values are obtained from the props
  const {
    selectedResult: initialResult,
    children
  } = props;

  // Use State to keep the values
  const [selectedResult, setSelectedResult] = useState(initialResult);

  // Make the context object:
  const resultsContext = {
    selectedResult,
    setSelectedResult
  };

  // pass the value in provider and return
  return <Context.Provider value={resultsContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;

Provider.propTypes = {
  selectedResult: PropTypes.object
};

Provider.defaultProps = {
  selectedResult: {}
};
