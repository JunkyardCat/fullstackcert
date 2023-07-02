import React from "react";
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event/";

test("test for blog creation if it passes the right detail", async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()
    
    const { container } = render(<BlogForm createBlog={createBlog}/>)
    const title = container.querySelector("input[name='title']")
    const author = container.querySelector("input[name='author']")
    const url = container.querySelector("input[name='url']")
    const button = screen.getByText("add blog")
    
    await user.type(title, "title")
    await user.type(author, "author")
    await user.type(url, "https://www.lol.com")
    await user.click(button)
    
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toBe("title")
    expect(createBlog.mock.calls[0][1]).toBe("author")
    expect(createBlog.mock.calls[0][2]).toBe("https://www.lol.com")

})