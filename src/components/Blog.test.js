import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('testing blog component', () => {
  const component = render(
    <Blog
      title={'testTitle'}
      author={'testAuthor'}
      url={'test.com'}
      likes={11}
    />
  )
  //debug the component
  component.debug()
  const li = component.container.querySelector('li')
  console.log(prettyDOM(li))

  // method 1
  expect(component.container).toHaveTextContent('testTitle')

  // method 2
  const element = component.getByText('testAuthor')
  expect(element).toBeDefined()

  // method 3
  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent('test.com')
})

test('clicking the button calls event handler once', () => {
  const mockHandler = jest.fn()

  const component = render(
    <Blog
      title={'testTitle'}
      author={'testAuthor'}
      url={'test.com'}
      likes={11}
      updateLikes={mockHandler}
    />
  )

  const likeButton = component.getByText('Like')
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls.length).toBe(1)
})

//TODO add show button for each blog
// test('renders blog title and author by defauly but not url and likes', () => {
//   const component = render()
// })

// test('likes and url are rendered when clicked on show',()=>{

// })

test('like button clicked twice', () => {
  const mockHandler = jest.fn()
  const component = render(
    <Blog
      title={'testTitle'}
      author={'testAuthor'}
      url={'test.com'}
      likes={11}
      updateLikes={mockHandler}
    />
  )

  const likeButton = component.getByText('Like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  expect(mockHandler.mock.calls.length).toBe(2)
})
