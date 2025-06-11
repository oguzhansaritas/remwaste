import React from 'react';

export default function ErrorMessage({ message }: { message: string }) {
  return <div className="p-4 text-red-600">Error: {message}</div>;
}