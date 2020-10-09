export class Credential {
    private email: String;
    private password: String;

    constructor(email:String, password:String) {
        this.email = email;
        this.password = password;
    }

    getEmail():String {
        return this.email
    }

    getPassword(): String {
        return this.password
    }
}