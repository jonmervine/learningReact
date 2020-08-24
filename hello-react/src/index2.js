import React from 'react';



const Book = ({title, author, pages, freeBookmark}) => {
    return (
        <section>
            <h2>{title}</h2>
            <p>by: {author}</p>
            <p>Pages: {pages} pages</p>
            <p>Free Bookmark Today: {freeBookmark ? 'yes!' : 'no")'}</p>
        </section>
    )
}

const Hiring = () =>
    <div>
        <p>The Library is hiring. Go to www.library.com/jobs for more.</p>
    </div>

const NotHiring = () =>
    <div>
        <p>The library is not hiring. Check back later</p>
    </div>

class Library extends React.Component {
    state = {
        open: true,
        freeBookmark: false,
        hiring: true,
        data: [],
        loading: false
    }

    componentDidMount() {
        console.log("The component is now mounted!")
        this.setState({loading: true})
        fetch('https://hplussport.com/api/products/order/price/sort/asc/qty/1')
            .then(data => data.json())
            .then(data => this.setState({data, loading: false}))
    }

    componentDidUpdate() {
        console.log("The component just updated")
    }

    toggleOpenClosed = () => {
        this.setState(prevState => ({
            open: !prevState.open
        }))
    }

    render() {
        const {books} = this.props
        return (
            <div>
                {this.state.hiring ? <Hiring/> : <NotHiring/>}
                {this.state.loading
                    ? "loading..."
                    : <div>
                        {this.state.data.map(product => {
                            return (
                                <div key={product.id}>
                                    <h3>Library product of the week!</h3>
                                    <h4>{product.name}</h4>
                                    <img alt={product.name} src={product.image} height={100}/>
                                </div>
                            )
                        })}
                    </div>
                }
                <h1>The library is {this.state.open ? 'open' : 'closed'} </h1>
                <button onClick={this.toggleOpenClosed}>Change</button>
                {books.map(
                    (book, i) =>
                        <Book key={i}
                              title={book.title}
                              author={book.author}
                              pages={book.pages}
                              freeBookMark={this.state.freeBookmark}/>
                )}
            </div>
        )
    }
}

export default Library;