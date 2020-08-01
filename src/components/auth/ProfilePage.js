import React, {useState, useEffect} from 'react'
import {useOktaAuth} from '@okta/okta-react'

export default function ProfilePage(props){
    const {authService} = useOktaAuth()
    const [user, setUser] = useState(null)

    useEffect(() => {
        authService.getUser().then(returnedUser => setUser(returnedUser))
    }, [authService])

    if (!user) return null
    return(
        <section>
            <h1>User Profile</h1>
            <div>
                <label>Email:</label>
                <span>{user.email}</span>
            </div>
        </section>
    )

}