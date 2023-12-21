import React, { useEffect } from 'react'
import AdminLayout from '../../components/layouts/AdminLayout'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getBookListAction, updateBookAction } from '../../redux/book/bookAction';
import { getBorrowLisByUserIdtAction, getBorrowListAction, updateBorrowAction } from '../../redux/borrowHistory/borrorHistoryAction';
import { formatDate, isClient } from '../../utils';

function History() {
    const dispatch = useDispatch();
    const { borrowList } = useSelector(state => state.borrow);
    const { userInfo } = useSelector(state => state.auth)
    useEffect(() => {
        if (isClient(userInfo)) {
            dispatch(getBorrowLisByUserIdtAction(userInfo?.uid))
        } else {
            dispatch(getBorrowListAction())
        }
    }, [dispatch, userInfo])
    const handleBookReturn = (borrow) => {
        console.log("Handling returned book", borrow)

        // Update Borrow History and also book info
        dispatch(updateBorrowAction({
            id: borrow.id,
            isReturned: true,
            availableFrom: Date.now()
        }))

        // update book
        dispatch(updateBookAction({
            id: borrow.bookId,
            isAvailable: true,
            availableFrom: Date.now()
        }))
    }

    const renderAction = (borrow) => {
        if (isClient(userInfo)) {
            return ""
        }
        if (borrow?.isReturned) {
            return <td><Button variant='warning' disabled>Already Returned</Button></td>
        } else {
            return <td><Button variant='warning' onClick={() => handleBookReturn(borrow)}>Mark as Returned</Button></td>
        }
    }
    return (
        <AdminLayout title="History">
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>BorrowAt</th>
                            <th>Borrowed By</th>
                            <th>ReturnedAt</th>
                            {!isClient(userInfo) ? <th>Action</th> : ""}
                        </tr>
                    </thead>
                    <tbody>
                        {borrowList.map((borrow, i) => (
                            <tr key={borrow.id}>
                                <td>{i + 1}</td>
                                <td>
                                    <img src={borrow.url} alt="" width={"100px"} />
                                </td>
                                <td>
                                    {formatDate(borrow.borrowAt)}
                                </td>
                                <td>{borrow.userName.toUpperCase()}</td>
                                <td>
                                    {borrow?.isReturned ? "Returned:" : "Deadline:"} {formatDate(borrow.availableFrom)}
                                </td>
                                {renderAction(borrow)}


                            </tr>
                        ))}


                    </tbody>
                </Table>
            </div>
        </AdminLayout>
    )
}

export default History