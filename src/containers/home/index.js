import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  addItem,
  deleteItem,
  toggleItem,
  clearCompleted
} from '../../modules/counter'
import './home.scss'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keyWord: '',
      status: 'all'
    }
  }

  renderToDoList = () => {
    const { todoList, doDeleteItem } = this.props
    const { status } = this.state

    if (todoList.length > 0)
      if (status === 'all')
        return (
          <div className="todo__form__list">
            <div className="list">
              <ul>
                {todoList.map(item => {
                  return (
                    <li
                      key={item.id}
                      className={item.status ? 'done' : 'will-do'}>
                      <input
                        type="checkbox"
                        onChange={() => this.handleChangeItem(item)}
                        className="check_box"
                      />
                      <p>{item.content}</p>
                      <button onClick={() => doDeleteItem(item)}>X</button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        )
    if (status === 'active') {
      const activeList = todoList.filter(i => i.status === false)
      return (
        <div className="todo__form__list">
          <div className="list">
            <ul>
              {activeList.map(item => {
                return (
                  <li
                    key={item.id}
                    className={item.status ? 'done' : 'will-do'}>
                    <input
                      type="checkbox"
                      onChange={() => this.handleChangeItem(item)}
                      className="check_box"
                    />
                    <p>{item.content}</p>
                    <button onClick={() => doDeleteItem(item)}>X</button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )
    }
    if (status === 'completed') {
      const activeList = todoList.filter(i => i.status === true)
      return (
        <div className="todo__form__list">
          <div className="list">
            <ul>
              {activeList.map(item => {
                return (
                  <li
                    key={item.id}
                    className={item.status ? 'done' : 'will-do'}>
                    <input
                      type="checkbox"
                      onChange={() => this.handleChangeItem(item)}
                      className="check_box"
                      checked={item.status}
                    />
                    <p>{item.content}</p>
                    <button onClick={() => doDeleteItem(item)}>X</button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )
    }
  }
  handldeActive = () => {
    this.setState({ status: 'active' })
  }
  handleCompleted = () => {
    this.setState({ status: 'completed' })
  }
  handleAll = () => {
    this.setState({ status: 'all' })
  }
  onChange = e => {
    const { value } = e.target
    this.setState({ keyWord: value })
  }

  handleChangeItem = async item => {
    const { doToggleItem } = this.props
    await doToggleItem(item)
  }

  handleAddItem = async e => {
    e.preventDefault()
    const { keyWord } = this.state
    const { doAddItem } = this.props
    if (keyWord === '' || keyWord === null)
      alert('Plese enter something you want to do')
    else {
      await doAddItem({ id: Math.random(), content: keyWord, status: false })
      this.setState({ keyWord: '' })
    }
  }
  handleClearCompleted = async () => {
    const { doClearCompleted } = this.props
    await doClearCompleted()
  }

  render() {
    const { keyWord, status } = this.state
    const { todoList } = this.props

    return (
      <div className="container">
        <div className="todo">
          <form
            action=""
            className="todo__form"
            onSubmit={e => this.handleAddItem(e)}>
            <input
              type="text"
              onChange={this.onChange}
              value={keyWord}
              placeholder="What needs to be done?"
            />
          </form>
          {this.renderToDoList()}
          {todoList.length > 0 ? (
            <div className="feature">
              <p className="col">
                {todoList.length === 1
                  ? todoList.length + ' item'
                  : todoList.length + ' items'}{' '}
                left
              </p>
              <ul className="col">
                <li
                  onClick={this.handleAll}
                  className={status === 'all' ? 'active' : ''}>
                  All
                </li>
                <li
                  onClick={this.handldeActive}
                  className={status === 'active' ? 'active' : ''}>
                  Acive
                </li>
                <li
                  onClick={this.handleCompleted}
                  className={status === 'completed' ? 'active' : ''}>
                  Completed
                </li>
              </ul>
              <p className="col" onClick={this.handleClearCompleted}>
                Clear Completed
              </p>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({ ...state.counter })

export default connect(mapStateToProps, {
  doAddItem: addItem,
  doDeleteItem: deleteItem,
  doToggleItem: toggleItem,
  doClearCompleted: clearCompleted
})(Home)
