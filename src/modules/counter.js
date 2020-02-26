//Action variable
const ADD_ITEM = 'ADD_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'
const TOGGLE_ITEM = 'TOGGLE_ITEM'
const CLEAR_COMPLETED = 'CLEAR_COMPLETED'

const initState = {
  todoList: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return { ...state, todoList: action.payload }
    case DELETE_ITEM:
      return { ...state, todoList: action.payload }
    case TOGGLE_ITEM:
      return { ...state, todoList: action.payload }
    case CLEAR_COMPLETED:
      return { ...state, todoList: action.payload }
    default:
      return state
  }
}

//Action creator

//add item
export const addItem = item => (dispatch, getState) => {
  try {
    const { todoList } = getState().counter
    const newToDoList = [...todoList, item]
    dispatch({
      type: ADD_ITEM,
      payload: newToDoList
    })
  } catch (e) {
    console.log(e)
  }
}
//deleteitem
export const deleteItem = item => (dispatch, getState) => {
  try {
    const { todoList } = getState().counter
    const newToDoList = todoList.filter(i => i !== item)
    dispatch({
      type: DELETE_ITEM,
      payload: newToDoList
    })
  } catch (e) {
    console.log(e)
  }
}
//toggle item
export const toggleItem = item => async (dispatch, getState) => {
  try {
    const { todoList } = getState().counter
    const index = todoList.findIndex(i => i.id === item.id) // ?them 1 truong` vao` de dinh. danh no

    todoList[index].status = !!!todoList[index].status

    await dispatch({
      type: TOGGLE_ITEM,
      payload: [...todoList] //2 object|array ko so sanh dc => ko thay doi => ko render lai => tao. 1 array moi' => render lai
    })
  } catch (e) {
    console.log(e)
  }
}
//clear completed
export const clearCompleted = () => async (dispatch, getState) => {
  try {
    const { todoList } = getState().counter
    const newList = todoList.filter(i => i.status === false)
    await dispatch({
      type: CLEAR_COMPLETED,
      payload: newList
    })
  } catch (e) {
    console.log(e)
  }
}
