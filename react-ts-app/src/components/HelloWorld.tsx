import React from 'react'

interface HelloWorldProps {
  message?: string
}

const HelloWorld: React.FC<HelloWorldProps> = ({ message = 'Hello World!' }) => {
  return <h1>{message}</h1>
}

export default HelloWorld