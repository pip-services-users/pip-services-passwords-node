# HTTP REST Protocol (version 1) <br/> Passwords Microservice

Passwords microservice implements a REST compatible API, that can be accessed on configured port.
All input and output data is serialized in JSON format. Errors are returned in [standard format]().

* [UserPasswordV1 class](#class1)
* [POST /passwords/set_password](#operation1)
* [POST /passwords/delete_password](#operation2)
* [POST /passwords/authenticate](#operation3)
* [POST /passwords/change_password](#operation4)
* [POST /passwords/reset_password](#operation5)
* [POST /passwords/recover_password](#operation6)

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

### <a name="operation1"></a> Method: 'POST', route '/passwords/set_password'

Sets a password for a new user in the system

**Request body:**
- user_id: string - unique user id
- password: string - user password

**Response body:**
Occured error or null for success

### <a name="operation2"></a> Method: 'DELETE', route '/passwords/delete_password'

Deletes user password from the system (use it carefully!)

**Request body:**
- user_id: string - unique user id

**Response body:**
Occurred error or null for success

### <a name="operation3"></a> Method: 'POST', route '/passwords/authenticate'

Authenticates user using ID/password combination and returns user account.
The user can identified either by unique id or primary email.

**Request body:**
- user_id: string - (optional) unique user id
- password: string - user password

**Response body:**
- authenticated: bool - True for authenticated and False or error for failure

### <a name="operation4"></a> Method: 'POST', route '/passwords/change_password'

Changes user password by providing old password.

**Request body:**
- user_id: string - unique user id
- old_password: string - old user password
- new_password: string - new user password

**Response body:**
Occurred error or null for success

### <a name="operation5"></a> Method: 'POST', route '/passwords/reset_password'

Resets user password by providing recovery code

**Request body:**
- user_id: string - unique user id
- password: string - new user password
- code: string - password recovery code

**Response body:**
Occurred error or null for success

### <a name="operation6"></a> Method: 'POST', route '/passwors/recover_password'

Generates password recovery code for the user and sends it via email

**Request body:**
- user_id: string - unique user id

**Response body:**
Occurred error or null for success
