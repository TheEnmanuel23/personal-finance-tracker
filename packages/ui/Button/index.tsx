export function Button({ children, onClick }): JSX.Element {
  return <button onClick={onClick}>{children}</button>;
}
