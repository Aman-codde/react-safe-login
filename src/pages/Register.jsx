const Register = () => {
    return(
        <div className="form-container">
            <h1>Register Form</h1>
            <form className="form-group">
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        required
                    />
                </div>
                <div>
                    <label>Create Password</label>
                    <input
                        type="password"
                        required
                    />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )
};

export default Register;