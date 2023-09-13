import React, { useState } from 'react';
import '../styles/98.scss';
import '../styles/xp.scss';
import '../styles/fonts.scss';

const ThemeSelector = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState('style-xp');

  return (
    <div className={theme}>
      {theme === 'style-7' && (
        <link rel="stylesheet" href="https://unpkg.com/7.css@0.5.0/dist/7.css"></link>
      )}
      <select
        value={theme}
        onChange={(event) => {
          setTheme(event.target.value);
        }}
      >
        <option value="style-7">Windows 7</option>
        <option value="style-xp">Windows XP</option>
        <option value="style-98">Windows 98</option>
      </select>
      {children}
    </div>
  );
};

export default ThemeSelector;
