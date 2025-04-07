import { useState } from 'react';

interface Props {
  onSubmit: (steamid: string) => void;
}

function SteamIdInput({ onSubmit }: Props) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='steamid'>Enter Steam ID:</label>
      <input
        type='text'
        id='steamid'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='e.g. 76561198000000000'
      />
      <button type='submit'>Submit</button>
    </form>
  );
}

export default SteamIdInput;