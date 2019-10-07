class Auth {
    constructor() {
        this.authenticated = false;
    }

    login(cb, creds) {
        fetch('https://fierce-eyrie-43107.herokuapp.com/', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: creds.email,
                password: creds.password
            })
        })
        .then(res => {
            if (res.ok) {
                this.authenticated = true;
                cb();
            }
        })
        .catch(res => console.log('err unable to authenticate'));
    }

    logout(cb) {
        this.authenticated = false;
        cb();
    }

    register(cb, creds) {
        //push credentials into database
        fetch('https://fierce-eyrie-43107.herokuapp.com/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: creds.email,
                password: creds.password,
                name: creds.name
            })
        })
        .then(res => {
            
            if (res.ok) {
                this.authenticated = true;
                cb();
            }
        })
        .catch(console.log);
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();