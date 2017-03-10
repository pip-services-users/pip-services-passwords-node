# Configuration Guide <br/> Passwords Microservice

Passwords microservice configuration structure follows the 
[standard configuration](https://github.com/pip-services/pip-services-runtime-node/doc/Configuration.md) 
structure. 

* [config](#config)
* [log](#log)
* [counters](#counters)
* [db](#db)
* [deps](#deps)
  - [email](#deps_email)
  - [activities](#deps_activities)
* [ctrl](#ctrl)
* [ints](#ints)
* [api](#api)
  - [rest](#api_rest)
  - [seneca](#api_seneca)
* [addons](#addons)

## <a name="config"></a> Config

The **Config** section is used to set parameters for the microservice configurator component. 
In most cases this section is not used and can be omitted. The only situation where this is 
applicable is when a microservice configuration requires being loaded from a centralized configuration repository.

Example to retrieve microservice configuration remote repository by key 'pip-services-passwords':
```javascript
{
    "config": {
        "type": "remote",
        "transport": {
            "type": "rest",
            "host": "config.mydomain.com",
            "port": "8020"
        },
        "key": "pip-services-passwords" // Microservice config key
    } 
    ...
}
```

This is an optional section and can be omitted in the configuration.

For more information on this section read
[Pip.Services Configuration Guide](https://github.com/pip-services/pip-services-runtime-node/doc/Configuration.md#config)

## <a name="log"></a> Log

The **Log** section defines configuration of the microservice logger component. 
Based on the needs of the application,  logging can be configured to support different logging mechanisms:
- **null**: disable logging completely 
- **console**: log output to the console
- **file**: log output to a file
- **remote**: logs output to a centralized remote location.

The logging level is also configurable, which will allow output of more or less detailed logs.

Example to disable log:
```javascript
{
    ...
    "log": {
        "type": "null" // Disable log
    } 
    ...
}
```

Example to output detailed logs to console:
```javascript
{
    ...
    "log": {
        "type": "console",
        "level": 5  // All except trace
    } 
    ...
}
```
 
Example to send logs to remote logging server 
```javascript
{
    ...
    "log": {
        "type": "remote",
        "transport": {
            "type": "rest",
            "host": "log.mydomain.com",
            "port": "8021"
        },
        "level": 3 // Only fatal, error and warn
    } 
    ...
}
```

This is an optional section and can be omitted in the configuration.

For more information on this section read 
[Pip.Services Configuration Guide](https://github.com/pip-services/pip-services-runtime-node/doc/Configuration.md#log)

## <a name="counters"></a> Counters

The **Counters** section defines configuration of the microservice performance counters component. 
Based on the needs of the application, performances counters can be configured to output to different locations:
- **null**: disable performance counters completely
- **log**: output performance counters to a log
- **remote**: output performance counters to a remote monitoring service

Example to disable counters:
```javascript
{
    ...
    "counters": {
        "type": "null" // Disable counters
    } 
    ...
}
```

Example to output counters to log:
```javascript
{
    ...
    "counters": {
        "type": "log"
    } 
    ...
}
```
 
Example to send performance metrics to remote server 
```javascript
{
    ...
    "counters": {
        "type": "remote",
        "transport": {
            "type": "rest",
            "host": "log.mydomain.com",
            "port": "8022"
        }
    } 
    ...
}
```

This is an optional section and can be omitted in the configuration.

For more information on this section read 
[Pip.Services Configuration Guide](https://github.com/pip-services/pip-services-runtime-node/doc/Configuration.md#counters)

## <a name="db"></a> Db

The **Db** section defines configuration of the microservice data access component. The current microservices support 
two types of persistence: flat files or MongoDB. Flat files are great for development and testing, 
while MongoDB is a good option with outstanding performance and scalability, suitable for demanding production installations. 
You can choose and configure the option that suits your needs.

For more information on this section read 
[Pip.Services Configuration Guide](https://github.com/pip-services/pip-services-runtime-node/doc/Configuration.md#db)

### <a name="db_file"></a> File

Flat file persistence has the following configuration properties:
- type: 'file' - type that designates flat file persistence
- path: string - file path where User objects are stored. The object are written into the file in JSON format.
- data: [User] - (optional) array of User objects which is used to initialize the dataset. This option is only used in testing to set a known state on test start.

Example:
```javascript
{
    ...
    "db": {
        "type": "file",
        "path": "passwords.json",
        "data": []
    }
    ...
}
```

### <a name="db_mongodb"></a> MongoDB

MongoDB persistence has the following configuration properties:
- type: 'mongodb' - type that designates mongodb persistence
- uri: string - MongoDB connection uri formatted as: 'mongodb://[&lt;user&gt;[:&lt;password&gt;]]&lt;host&gt;[:&lt;port&gt;]/&lt;database&gt;' 
- options: object - (optional) MongoDB connection options. See: http://mongoosejs.com/docs/connections.html for more details.
- debug: boolean - (optional) Enables or disables connection debugging

Example:
```javascript
{
    ...
    "db": {
        "type": "mongodb",
        "uri": "mongodb://localhost/pipservicestest",
        "options": {
            "server": {
                "poolSize": 4,
                "socketOptions": {
                    "keepAlive": 1,
                    "connectTimeoutMS": 5000
                },
                "auto_reconnect": true
            }
        },
        "debug": false        
    }
    ...
}
```

## <a name="deps"></a> Deps

The **Deps** section defines configuration of the client dependencies to external microservices. 
Users microservice depends on **Email** and **Activities** microservices. 

For more information on this section read 
[Pip.Services Configuration Guide](https://github.com/pip-services/pip-services-runtime-node/doc/Configuration.md#deps)

### <a name="deps_email"></a> Email

Defines [client properties](https://github.com/pip-services/pip-clients-email-node) 
to connect to **pip-services-email** microservice. It can specify **rest**, **seneca** 
or any other protocol supported by the microservice. Configuration parameters in this section must match 
[api configuration](https://github.com/pip-services/pip-services-email/doc/Configuration.md#api) 
of the dependent microservice.

This is an optional dependency. If its not set, then email notifications won't be sent to users.

Example of the email dependency configuration
```javascript
{
    ...
    "deps": [
        {
            "name": "email",
            "type": "rest",
            "transport": {
                "type": "http",
                "host": "localhost",
                "port": 8005
            }
        },
        ...
    ],
    ...
}
```

### <a name="deps_activities"></a> Activities

Defines [client properties](https://github.com/pip-services/pip-clients-activities-node) 
to connect to **pip-services-activities** microservice. It can specify **rest**, **seneca** 
or any other protocol supported by the microservice. Configuration parameters in this section must match 
[api configuration](https://github.com/pip-services/pip-services-activities/doc/Configuration.md#api) 
of the dependent microservice.

This is an optional dependency. If it's not set disabling user activities won't be tracked by the system.

Example of the activities dependency configuration
```javascript
{
    ...
    "deps": [
        {
            "name": "activities",
            "type": "rest",
            "transport": {
                "type": "http",
                "host": "localhost",
                "port": 8007
            }
        },
        ...
    ],
    ...
}
```

## <a name="ctrl"></a> Ctrl

The **Ctrl** section defines configuration of the microservice business logic controller. 

In addition to the standard properties, this section main include the following properties:
- magicCode: string - Administrative code that allows to change any account. It's purpose mainly for testing. Be very careful when use it in production since it opens a back door to your system to anyone who knows the code. (Default: '' / disabled)
- lockTimeout: int - Timeout in milliseconds to keep user account locked (default: 1800000 / 30 min)
- attemptTimeout: int - Timeout in milliseconds to count multiple failed attempts a sequence (default: 60000 / 1 min)
- attemptCount: int - Number of failed attempts in a sequence before account is locked (default: 4)
- codeExpirationTimeout: int - Timeout in milliseconds before issues password recovery code expire (default: 24*3600000 / 24 hours)
- lockEnabled: boolean - Enables or disables temporary password locking after few failed attempts (default: true)

Example of controller configuration
```javascript
{
    ...
    "ctrl": {
        "magicCode": "magic",
        "lockTimeout": 1800000,
        "attemptTimeout": 120000,
        "attemptCount": 3
    },
    ...
}
```

For more information on this section read 
[Pip.Services Configuration Guide](https://github.com/pip-services/pip-services-runtime-node/doc/Configuration.md#ctrl)

## <a name="ints"></a> Ints

The Ints section defines configuration of custom interceptors to the microservice business logic. They decorate the controller 
and modify its behavior by intercepting calls before and after the invocation. 

This is an optional section and can be omitted in the configuration.

For more information on this section read 
[Pip.Services Configuration Guide](https://github.com/pip-services/pip-services-runtime-node/doc/Configuration.md#ints)

## <a name="api"></a> Api

The **Api** section defines configuration of the microservice services (also called endpoints) to provide API for the consumers. 
Each microservice can expose multiple APIs (HTTP/REST or Seneca) and multiple versions of the same API type.
At least one API service is required for the microservice to initialize successfully.

### <a name="api_rest"></a> Rest

HTTP/REST API has the following configuration properties:
- type: 'rest' - type that designates HTTP/REST API
- version: int - API version (default is 1). Currently only version 1 is supported
- transport: object - HTTP transport configuration options
  - type: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

A detailed description of HTTP/REST protocol version 1 can be found [here](RestProtocolV1.md)

Example:
```javascript
{
    ...
    "api": [
        ...
        {
            "type": "rest",
            "version": 1,
            "transport": {
                "type": "http",
                "host": "localhost",
                "port": 8013
            }
        }
        ...
    ]
    ...
}
```

### <a name="api_seneca"></a> Seneca

Seneca API for Node.js has the following configuration properties:
- type: 'seneca' - type that designates Seneca API
- version: int - API version (default is 1). Currently only version 1 is supported
- transport: object - Seneca transport configuration options. See http://senecajs.org/api/ for details.
  - type: string - Seneca transport type 
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - Seneca port number

Detail description of the Seneca protocol version 1 can be found [here](SenecaProtocolV1.md)

Example:
```javascript
{
    ...
    "api": [
        ...
        {
            "type": "seneca",
            "transport": {
                "type": "tcp",
                "host": "localhost",
                "port": 8813
            }
        }
        ...
    ]
    ...
}
```

For more information on this section read 
[Pip.Services Configuration Guide](https://github.com/pip-services/pip-services-runtime-node/doc/Configuration.md#api)

## <a name="addons"></a> Addons

The **Addons** section defines configuration of optional addon components. 
Addon components can help to register new servers on microservice start, 
send microservice usage stats to the Pip.Services team, or do accomplish custom tasks 
that go beyond the standard microservice architecture.

This is an optional section and can be omitted in the configuration.

For more information on this section and standard addons read 
[Pip.Services Configuration Guide](https://github.com/pip-services/pip-services-runtime-node/doc/Configuration.md#addons)

