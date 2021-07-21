import React from 'react';

export const getData = (key) =>  localStorage.getItem(key)
export const setData = (key, value) => localStorage.setItem(key, value)