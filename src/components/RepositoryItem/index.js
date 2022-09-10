import './index.css'

const RepositoryItem = props => {
  const {eachRepoDetails} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = eachRepoDetails

  return (
    <li className="repo-item">
      <button type="button" className="button">
        <div>
          <img src={avatarUrl} alt={name} className="repo-image" />
          <h1 className="repo-heading">{name}</h1>
        </div>
        <div className="stars-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="stars"
          />
          <p className="stars-count">{starsCount} stars</p>
        </div>
        <div className="stars-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="stars"
          />
          <p className="stars-count">{forksCount} forks</p>
        </div>
        <div className="stars-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="stars"
          />
          <p className="stars-count">{issuesCount} open issues</p>
        </div>
      </button>
    </li>
  )
}

export default RepositoryItem
