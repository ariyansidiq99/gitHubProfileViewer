import React from 'react'

const LANG_COLORS = {
  JavaScript:'#F7DF1E', TypeScript:'#3178C6', Python:'#3776AB',
  HTML:'#E34F26', CSS:'#1572B6', PHP:'#777BB4',
};
const RepoCard = ({repo}) => {
  return (
    <article className='repo-card'>
        <h3 className="repo-card name">{repo.name}</h3>
        <p className="repo-card desc">{repo.description || "No description"}</p>
        <div className="repo-card_meta">
            {repo.language && (
                <span>
                    <span className='lang-dot' style={{background: LANG_COLORS[repo.language] || "#94a3b8"}} />
                    {repo.language}
                </span>
            )}
        <span>⭐ {repo.stargazers_count}</span>
        <span>🍴 {repo.forks_count}</span>

        </div>
    </article>
  )
}

export default RepoCard