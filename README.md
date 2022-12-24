This project was bootstrapped with Create React App template.

# Cat Virtualized List

This project using `react-virtualized` to improves memory consumption and performance of large lists by maintaining a finite render window of active items and replacing all items outside of the render window with appropriately sized blank space.

## Demo

![image](https://github.com/Hsiaok-225/Cat-Virtualized/blob/main/src/assets/cat-virturalized-sm.gif)

## Features

- Virtualized List
- Infinite Scroll
- Lazy Load
- Image Carousel

## Infinite Scroll and Lazy Load

The `Intersection Observer` API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element. Intersection information is needed for many reasons, such as:

- Lazy-loading of images or other content as a page is scrolled.
- Implementing "infinite scrolling" web sites, where more and more content is loaded and rendered as you scroll, so that the user doesn't have to flip through pages.

## react-virtualized

`react-virtualized` is a library for efficiently rendering large lists and tabular data.

- It reduces the amount of work (and time) required to render the initial view and to process updates.
- It reduces the memory footprint by avoiding over-allocation of DOM nodes.
