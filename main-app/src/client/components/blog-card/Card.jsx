class Card extends React.Component {
  constructor (props) {
    super(props)

    // Define inline styles
    this.styles = { backgroundColor: props.data.color || '#000' }
  }

  render () {
    const { title, icon, details } = this.props.data

    return (
      <div className="card-body" style={this.styles}>
        <div className="icon-wrapper section">
          <span className="icon">
            <i className={icon} aria-hidden="true"></i>
          </span>
        </div>
        <div className="text-wrapper section">
          <div className="title"><span>{ title }</span></div>
          <div className="details"><span>{ details }</span></div>
        </div>
      </div>
    )
  }
}

class CardGridView extends React.Component {
  render () {
    return (
      <div className="card-grid-view">
        {
          this.props.data.map((cardData, index) => (
            <Card data={ cardData } key={ 'card-id-' + index } />
          ))
        }
      </div>
    )
  }
}
