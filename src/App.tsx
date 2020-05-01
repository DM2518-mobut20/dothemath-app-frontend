import React from 'react';
import Tabbar from './components/Tabbar/Tabbar';
import ErrorBoundary from './ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <Tabbar />
    </ErrorBoundary>
  );
}
