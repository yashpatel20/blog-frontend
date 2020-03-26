import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm />', () => {
  const createBlog = jest.fn()
  const component = render(<BlogForm createBlog={createBlog} />)
  const input = component.container.querySelector('input')
  const form = component.container.querySelector('form')
  fireEvent.change(input, {
    target: { value: 'testing of forms could be easier' }
  })
  fireEvent.submit(form)
  expect(createBlog.mock.calls.length).toBe(1)
  expect(createBlog.mock.calls[0][0].title).toBe(
    'testing of forms could be easier'
  )
})

test('form calls the props event handler with the right details', () => {
  const createBlog = jest.fn()
  const component = render(<BlogForm createBlog={createBlog} />)
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const likes = component.container.querySelector('#likes')
  const form = component.container.querySelector('form')
  fireEvent.change(title, {
    target: { value: 'title' }
  })
  fireEvent.change(author, {
    target: { value: 'author' }
  })
  fireEvent.change(url, {
    target: { value: 'url' }
  })
  fireEvent.change(likes, {
    target: { value: 'likes' }
  })
  fireEvent.submit(form)
  expect(createBlog.mock.calls[0][0].title).toBe('title')
  expect(createBlog.mock.calls[0][0].author).toBe('author')
  expect(createBlog.mock.calls[0][0].url).toBe('url')
  expect(createBlog.mock.calls[0][0].likes).toBe('likes')
})
