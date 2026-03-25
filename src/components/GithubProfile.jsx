import React, { useEffect, useState } from 'react'
import RepoCard from './RepoCard' // ✅ fix 3: added missing import

const GithubProfile = ({username}) => {
  const [profile, setProfile] = useState(null);
  const [repos,   setRepos]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!username) return;
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    async function fetchProfile() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`,  { signal: controller.signal }),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, { signal: controller.signal }),
        ]);
        if(!profileRes.ok) throw new Error(`User '${username}' not found!`); // ✅ fix 1
        const [profileData, reposData] = await Promise.all([
          profileRes.json(),
          reposRes.json()
        ]);
        setProfile(profileData);
        setRepos(reposData); // ✅ fix 2
      } catch (err) {
        if(err.name !== 'AbortError') setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
    return () => controller.abort();
  }, [username]);

  if(loading) return <div className='skeleton-profile'/>
  if(error) return <div className='error'>{error}</div>
  if(!profile) return null;

  return (
    <div className='github-profile'>
      <div className='profile-header'>
        <img className='avatar' src={profile.avatar_url} alt={profile.login} />
        <div>
          <h2>{profile.name || profile.login}</h2>
          <p>{profile.bio}</p>
          <p>📍 {profile.location} · 🏢 {profile.company}</p>
          <div className='profile-stats'>
            <span><strong>{profile.public_repos}</strong> repos</span>
            <span><strong>{profile.followers}</strong> followers</span>
          </div>
        </div>
      </div>
      <div className='repos-grid'>
        {repos.map(repo => <RepoCard key={repo.id} repo={repo} />)}
      </div>
    </div>
  )
}

export default GithubProfile