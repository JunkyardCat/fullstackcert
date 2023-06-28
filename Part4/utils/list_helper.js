const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    //temp = blogs.map(blog => {return likes = blog.likes})
    const temp = blogs.reduce((likes, blog) => {
        return likes+blog.likes
    },0)
    return temp
}

const favoriteBlog = (blogs) => {
    const liked = blogs.reduce((prev,curr) => {
        //console.log('favoriteBlog values',prev,curr)
        return prev.likes > curr.likes ? prev : curr
    })
    return {
        title: liked.title,
        author: liked.author,
        likes: liked.likes
    }
}

const mostBlogs = (blogs) => {
    const authorCount = lodash.countBy(blogs, 'author')
    //console.log(authorCount)
    const topAuthor = Object.keys(authorCount).reduce((a, b) => {
        //console.log("inside author a", authorCount[a] , "author b",authorCount[b],"a",a,"b",b)
        return authorCount[a]>authorCount[b] ? a:b
    })
    //console.log("topAuthor",topAuthor)
    return{
        author: topAuthor,
        blogs: authorCount[topAuthor],
    }
}

const mostLikes = (blogs) => {
    const likeCount = lodash(blogs).groupBy('author').map((a, b) => ({
        author: b,
        likes: lodash.sumBy(a, 'likes')
    })
    ).value()
    //console.log('likeCount',likeCount)
    //console.log('lodash',lodash(blogs).groupBy('author').value())
    /*
    lodash(blogs).groupBy('author').map((a, b) => {
        console.log('map',a,b)
        return a
    })
    */
    return likeCount.reduce((a,b) => {
        return a.likes > b.likes ? a:b
    })
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}