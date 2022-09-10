import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const checkResults = [
  ('initial': 'INITIAL'),
  'inprogress:"IN_PROGRESS',
  ('success': 'SUCCESS'),
  ('failure': 'FAILURE'),
]

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    activeTabId: languageFiltersData[0].id,
    repositoryList: [],
    searchStatus: checkResults[0],
  }

  componentDidMount() {
    this.getRepositoryItems()
  }

  getRepositoryItems = async () => {
    this.setState({searchStatus: checkResults[1]})
    const {activeTabId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`

    const response = await fetch(url)
    const data = await response.json()

    const updatedData = data.popular_repos.map(item => ({
      name: item.name,
      id: item.id,
      issuesCount: item.issues_count,
      forksCount: item.forks_count,
      starsCount: item.stars_count,
      avatarUrl: item.avatar_url,
    }))
    if (response.ok) {
      this.setState({
        repositoryList: updatedData,
        searchStatus: checkResults[2],
      })
    } else {
      this.setState({searchStatus: checkResults[3]})
    }
  }

  selectTabItem = id => {
    this.setState({activeTabId: id}, this.getRepositoryItems)
  }

  getRepository = () => {
    const {repositoryList} = this.state
    return (
      <ul className="all-repos">
        {repositoryList.map(eachRepo => (
          <RepositoryItem eachRepoDetails={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  loadingResults = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={50} width={50} />
    </div>
  )

  failureResults = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Something went wrong</h1>
    </div>
  )

  getRepositoryResults = () => {
    const {searchStatus} = this.state

    switch (searchStatus) {
      case checkResults[1]:
        return this.loadingResults()
      case checkResults[2]:
        return this.getRepository()
      case checkResults[3]:
        return this.failureResults()
      default:
        return null
    }
  }

  render() {
    const {activeTabId, repositoryList} = this.state
    console.log(repositoryList)
    return (
      <div className="bg-container">
        <h1 className="main-heading">Popular</h1>
        <ul className="all-tabItems">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              eachLanguage={eachItem}
              key={eachItem.id}
              selectTabItem={this.selectTabItem}
              isActive={activeTabId === eachItem.id}
            />
          ))}
        </ul>

        {this.getRepositoryResults()}
      </div>
    )
  }
}

export default GithubPopularRepos
