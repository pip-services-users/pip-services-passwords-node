# Seneca Protocol (version 1) <br/> Passwords Microservice

Passwords microservice implements a Seneca compatible API. 
Seneca port and protocol can be specified in the microservice [configuration](Configuration.md/#api_seneca). 

```javascript
var seneca = require('seneca')();

seneca.client({
    type: 'tcp', // Microservice seneca protocol
    localhost: 'localhost', // Microservice localhost
    port: 8813, // Microservice seneca port
});
```

The microservice responds on the following requests:

```javascript
seneca.act(
    {
        role: 'passwords',
        version: 1,
        cmd: ...cmd name....
        ... Arguments ...
    },
    function (err, result) {
        ...
    }
);
```

* [UserPassword class](#class1)
* [cmd: 'set_password'](#operation1)
* [cmd: 'delete_password'](#operation2)
* [cmd: 'authenticate'](#operation3)
* [cmd: 'change_password'](#operation4)
* [cmd: 'reset_password'](#operation5)
* [cmd: 'recover_password'](#operation6)

## Data types

### <a name="class1"></a> UserPassword class

Represents a user password with his ID, name, password and key settings.
It also tracks authentication attempts and recovery codes. 

**Properties:**
- id: string - unique user id
- password: string - SHA256 hash for user password (password isn't stored for security)
- lock: boolean - true if user account was temporary locked after few failed authentication attempts
- lock_until: Date - date and time when lock expires
- pwd_fail_count: int - number of sequential failed attempts
- pwd_last_fail: Date - date and time of the last failed attempt
- pwd_rec_code: string - password recovery code that was sent to user in email message
- pwd_rec_expire: Date - date and time when password recovery code expires
- custom_hdr: Object - custom data summary that is always returned (in list and details)
- custom_dat: Object - custom data details that is returned only when a single object is returned (details)

## Operations

### <a name="operation1"></a> Cmd: 'set_password'

Sets a password for new user in the system

**Arguments:** 
- user_id: string - unique user id
- password: string - user password

**Returns:**
- err: Error - occured error or null for success
- result: UserPassword - created UserPassword object

### <a name="operation2"></a> Cmd: 'delete_password'

Deletes user password from the system (use it carefully!)

**Arguments:** 
- user_id: string - unique user id

**Returns:**
- err: Error - occured error or null for success

### <a name="operation3"></a> Cmd: 'authenticate'

Authenticates user using ID/password combination and returns user object.

**Arguments:** 
- user_id: string - unique user id
- password: string - user password

**Returns:**
- err: Error - occured error or null for success
- result: UserPassword - UserPassword account when authentication was successful

### <a name="operation4"></a> Cmd: 'change_password'

Changes user password by providing old password

**Arguments:** 
- user_id: string - unique user id
- old_password: string - old user password
- new_password: string - new user password

**Returns:**
- err: Error - occured error or null for success
- result: UserPassword - updated UserPassword object

### <a name="operation5"></a> Cmd: 'reset_password'

Resets user password by providing recovery code

**Arguments:** 
- user_id: string - unique user id
- password: string - new user password
- code: string - password recovery code

**Returns:**
- err: Error - occured error or null for success
- result: UserPassword - updated UserPassword object

### <a name="operation6"></a> Cmd: 'recover_password'

Generates password recovery code for the user and sends it via email

**Arguments:** 
- user_id: string - unique user id

**Returns:**
- err: Error - occured error or null for success
- result: string - password recovery code
