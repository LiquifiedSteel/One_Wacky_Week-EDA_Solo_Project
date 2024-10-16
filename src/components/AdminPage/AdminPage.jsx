

function AdminPage() {


    return(
        <div id="admin">
            <h2>Admin</h2>

            <div className="grid">
        
                <div className="grid-col grid-col_6">
                    <table>
                        <thead>
                            <tr>
                                <th>Usernames</th>
                                <th>Passwords</th>
                                <th>Password Recovery Questions</th>
                                <th>Flagged for deletion</th>
                                <th>Delete User</th>
                            </tr>
                        </thead>
                    </table>
                </div>

                <div className="grid-col grid-col_6">
                    <table>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Date Purchased</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminPage;