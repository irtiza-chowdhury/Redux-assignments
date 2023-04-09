/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

export default function ThreeDot() {
  return (
    <ThreeDots
      height="25"
      width="35"
      radius="10"
      color="#545454"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible
    />
  );
}
