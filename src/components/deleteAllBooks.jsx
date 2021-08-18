
import { useMutation, gql } from "@apollo/client";
import { ALL_BOOKS } from "./Library";

const DELETE_ALL = gql`
    mutation DELETE_ALL {
        deleteAll{
            id
            message
        }
    }
`
function DeleteAllBooks () {

    const [deleteAll, {data, error, loading}] = useMutation(DELETE_ALL, {
        update(cache, {data : {deleteAll}}) { // this must be deleteAll only. Any other name will give undefined.
            const {books} = cache.readQuery({query : ALL_BOOKS})
            console.log('TO BE DELETED' , books)
            console.log('reveived' , deleteAll, data, error, loading) 
            cache.writeQuery({
                query: ALL_BOOKS, 
                data : {books : []}
            })
        }
    })
    if (error) return <p>Error in deleting</p>
    if (loading) return <p>Delete all in progress</p>

    return (
        <div>
            <button onClick = {() => {
                deleteAll({
                    optimisticResponse : {
                        __typename : 'Mutation', 
                        deleteAll : {
                            id : 124214612451,
                            __typename : 'DeleteMessage', 
                            message : 'Delete in progress in the optimistic response'
                        }
                    }
                })

            }}>Delete all Books</button>
            {data  && <h4 style = {{color: 'yellow'}}>{data.deleteAll.message}</h4>}
        </div>
    )

}

export default DeleteAllBooks