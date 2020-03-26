import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  let component
  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="show">
        <div className="testDiv"></div>
      </Togglable>
    )
  })

  //tests
  test('renders its childrens', () => {
    expect(component.container.querySelector('.testDiv')).toBeDefined()
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display:none')
  })

  test('after the clicking the button, the children are displayed', () => {
    const button = component.getByText('show')
    fireEvent.click(button)
    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display:none')
  })

  test('toggled content can be closed', () => {
    const showButton = component.getByText('show')
    fireEvent.click(showButton)
    const closeButton = component.getByText('cancel')
    fireEvent.click(closeButton)
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display:none')
  })
})
