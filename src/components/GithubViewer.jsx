import React, { useState } from 'react'
import GitHubProfile from './GithubProfile' // ✅ fix 4: added missing import

const GithubViewer = () => {
  const [input, setInput] = useState("ariyansidiq99")
  const [username, setUsername] = useState("ariyansidiq99")

  function handleSearch(e) {
    e.preventDefault();
    setUsername(input.trim());
  }

  return (
    <div className='github-viewer'>
      <form onSubmit={handleSearch} className='search-form'>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder='GitHub username...'
        />
        <button type='submit'>Search</button>
      </form>
      <GitHubProfile username={username} />
    </div>
  );
}

export default GithubViewer;