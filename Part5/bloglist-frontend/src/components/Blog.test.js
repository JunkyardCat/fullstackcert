import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import Blog from "./Blog";
import userEvent from '@testing-library/user-event'
describe('blog test', () => {
    const blog = {
        title:'this is a title',
        author:'this is a author',
        url:'this is a url',
        likes: 0,
        user: {
            username: 'username',
    
        }
    }
    let component
    const likeMockHandler = jest.fn()

    beforeEach(() => {
        component = render(<Blog blog={blog} updateLikes={likeMockHandler}/>)
    })

    test('render title author but not the other fields', () => {
        //screen.debug()
        expect(component.container.querySelector(".title")).toHaveTextContent(blog.title)
        expect(component.container.querySelector(".author")).toHaveTextContent(blog.author)
        expect(component.queryByText(blog.url)).not.toBeInTheDocument()
        expect(component.queryByText("like")).not.toBeInTheDocument()
        
    })
    
    test('should show url and likes', () => {
        const button = component.container.querySelector("button")
        fireEvent.click(button)
        const details = component.container.querySelector(".blog-details")
        expect(details).toBeInTheDocument()
    })
    
    test('if like is clicked twice the event handler is fired twice', () => {
        const button = component.container.querySelector("button")

        fireEvent.click(button)

        const likeButton = component.queryByText("like")
        screen.debug()
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)
        expect(likeMockHandler.mock.calls).toHaveLength(2)
    })
    

})



