import './index.css'

const LanguageFilterItem = props => {
  const {eachLanguage, selectTabItem, isActive} = props
  const {language, id} = eachLanguage

  const activeBtn = isActive ? 'active-btn' : ''

  const onClickTabItem = () => {
    selectTabItem(id)
  }

  return (
    <li className="each-tab">
      <button
        type="button"
        className={`tab-button ${activeBtn}`}
        onClick={onClickTabItem}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
