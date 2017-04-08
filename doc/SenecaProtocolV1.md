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

* [UserPasswordV1 class](#class1)
* [cmd: 'set_password'](#operation1)
* [cmd: 'delete_password'](#operation2)
* [cmd: 'authenticate'](#operation3)
* [cmd: 'change_password'](#operation4)
* [cmd: 'reset_password'](#operation5)
* [cmd: 'recover_password'](#operation6)

## Data types

### <a name="class1"></a> UserPasswordV1 class

Represents a user password with his ID, name, password and key settings.
It also tracks authentication attempts and recovery codes. 

**Properties:**
- id: string - unique user id
- password: string - SHA256 hash for user password (password isn't stored for security)
- locked: boolean - true if user account was temporary locked after few failed authentication attempts
- lock_time: Date - date and time when lock expires
- fail_count: int - number of sequential failed attempts
- fail_time: Date - date and time of the last failed attempt
- rec_code: string - password recovery code that was sent to user in email message
- rec\_expire\_time: Date - date and time when password recovery code expires
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
- result: Object - Object with authentication result
    - authenticated: boolean - True if authenticated successfully

### <a name="operation4"></a> Cmd: 'change_password'

Changes user password by providing old password

**Arguments:** 
- user_id: string - unique user id
- old_password: string - old user password
- new_password: string - new user password

**Returns:**
- err: Error - occured error or null for success

### <a name="operation5"></a> Cmd: 'reset_password'

Resets user password by providing recovery code

**Arguments:** 
- user_id: string - unique user id
- password: string - new user password
- code: string - password recovery code

**Returns:**
- err: Error - occured error or null for success

### <a name="operation6"></a> Cmd: 'recover_password'

Generates password recovery code for the user and sends it via email

**Arguments:** 
- user_id: string - unique user id

**Returns:**
- err: Error - occured error or null for success
