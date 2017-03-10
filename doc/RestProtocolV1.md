# HTTP REST Protocol (version 1) <br/> Passwords Microservice

Passwords microservice implements a REST compatible API, that can be accessed on configured port.
All input and output data is serialized in JSON format. Errors are returned in [standard format]().

* [UserPassword class](#class1)
* [POST /passwords](#operation1)
* [DELETE /passwords/:user_id](#operation2)
* [GET /passwords/:user_id/authenticate](#operation3)
* [POST /passwords/:user_id/change](#operation4)
* [POST /passwords/:user_id/reset](#operation5)
* [POST /passwords/:user_id/recover](#operation6)

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

### <a name="operation1"></a> Method: 'POST', route '/passwords'

Sets a password for a new user in the system

**Request body:**
Data info that includes
- user_id: string - unique user id
- password: string - user password

**Response body:**
Created UserPassword object or error

### <a name="operation2"></a> Method: 'DELETE', route '/passwords/user_id'

Deletes user password from the system (use it carefully!)

**Parameters:** 
- user_id: string - unique user id

**Response body:**
Ocurred error or null for success

### <a name="operation3"></a> Method: 'GET', route '/passwords/user_id/authenticate'

Authenticates user using ID/password combination and returns user account.
The user can identified either by unique id or primary email.

**Parameters:**
- user_id: string - (optional) unique user id
- password: string - user password

**Response body:**
UserPassword object or error

### <a name="operation4"></a> Method: 'POST', route '/passwords/user_id/change'

Changes user password by providing old password.

**Parameters:**
- user_id: string - unique user id
- old_password: string - old user password
- new_password: string - new user password

**Response body:**
Updated UserPassword object or error

### <a name="operation5"></a> Method: 'POST', route '/passwords/user_id/reset'

Resets user password by providing recovery code

**Parameters:**
- user_id: string - unique user id
- password: string - new user password
- code: string - password recovery code

**Response body:**
Updated UserPassword object or error

### <a name="operation6"></a> Method: 'POST', route '/passwors/user_id/recover'

Generates password recovery code for the user and sends it via email

**Parameters:**
- user_id: string - unique user id

**Response body:**
UserPassword object or error
