// Backdrop.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './backdrop.module.css';
import { closeBackdrop, selectBackdropState } from '../../../store/backdropSlice';

export const Backdrop = ({ children, ...otherProps }) => {
  const isOpen = useSelector(selectBackdropState);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(closeBackdrop());
  };

  return (
    <>
      {isOpen && (
        <div className={classes.container} onClick={handleClick} {...otherProps}>
          {children}
        </div>
      )}
    </>
  );
};
