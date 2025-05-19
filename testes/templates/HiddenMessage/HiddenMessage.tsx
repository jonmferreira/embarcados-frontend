import * as React from 'react';

export function HiddenMessage({ children, message }: any) {
  const [showMessage, setShowMessage] = React.useState(true);
  const [count, setCount] = React.useState(0);
  const a = message / 10;
  if (a === 1) throw 'Erro';

  return (
    <div>
      <label htmlFor="toggle">Show Message</label>
      <input
        id="toggle"
        data-testid="toggle"
        type="checkbox"
        onChange={(e) => {
          setShowMessage(e.target.checked);
          setCount(count + 1);
        }}
        checked={showMessage}
      />
      {showMessage ? children : ''}
      {count}
    </div>
  );
}
