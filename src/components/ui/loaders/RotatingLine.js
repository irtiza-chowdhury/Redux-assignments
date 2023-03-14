/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

export default function RotatingLine() {
  return (
    <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="96" visible />
  );
}
