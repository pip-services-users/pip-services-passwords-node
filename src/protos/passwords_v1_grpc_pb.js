// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2015 gRPC authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
'use strict';
var grpc = require('grpc');
var passwords_v1_pb = require('./passwords_v1_pb.js');

function serialize_passwords_v1_PasswordAuthenticateReply(arg) {
  if (!(arg instanceof passwords_v1_pb.PasswordAuthenticateReply)) {
    throw new Error('Expected argument of type passwords_v1.PasswordAuthenticateReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_passwords_v1_PasswordAuthenticateReply(buffer_arg) {
  return passwords_v1_pb.PasswordAuthenticateReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_passwords_v1_PasswordEmptyReply(arg) {
  if (!(arg instanceof passwords_v1_pb.PasswordEmptyReply)) {
    throw new Error('Expected argument of type passwords_v1.PasswordEmptyReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_passwords_v1_PasswordEmptyReply(buffer_arg) {
  return passwords_v1_pb.PasswordEmptyReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_passwords_v1_PasswordIdAndCodeAndValueRequest(arg) {
  if (!(arg instanceof passwords_v1_pb.PasswordIdAndCodeAndValueRequest)) {
    throw new Error('Expected argument of type passwords_v1.PasswordIdAndCodeAndValueRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_passwords_v1_PasswordIdAndCodeAndValueRequest(buffer_arg) {
  return passwords_v1_pb.PasswordIdAndCodeAndValueRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_passwords_v1_PasswordIdAndCodeRequest(arg) {
  if (!(arg instanceof passwords_v1_pb.PasswordIdAndCodeRequest)) {
    throw new Error('Expected argument of type passwords_v1.PasswordIdAndCodeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_passwords_v1_PasswordIdAndCodeRequest(buffer_arg) {
  return passwords_v1_pb.PasswordIdAndCodeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_passwords_v1_PasswordIdAndValueRequest(arg) {
  if (!(arg instanceof passwords_v1_pb.PasswordIdAndValueRequest)) {
    throw new Error('Expected argument of type passwords_v1.PasswordIdAndValueRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_passwords_v1_PasswordIdAndValueRequest(buffer_arg) {
  return passwords_v1_pb.PasswordIdAndValueRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_passwords_v1_PasswordIdAndValuesRequest(arg) {
  if (!(arg instanceof passwords_v1_pb.PasswordIdAndValuesRequest)) {
    throw new Error('Expected argument of type passwords_v1.PasswordIdAndValuesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_passwords_v1_PasswordIdAndValuesRequest(buffer_arg) {
  return passwords_v1_pb.PasswordIdAndValuesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_passwords_v1_PasswordIdRequest(arg) {
  if (!(arg instanceof passwords_v1_pb.PasswordIdRequest)) {
    throw new Error('Expected argument of type passwords_v1.PasswordIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_passwords_v1_PasswordIdRequest(buffer_arg) {
  return passwords_v1_pb.PasswordIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_passwords_v1_PasswordInfoReply(arg) {
  if (!(arg instanceof passwords_v1_pb.PasswordInfoReply)) {
    throw new Error('Expected argument of type passwords_v1.PasswordInfoReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_passwords_v1_PasswordInfoReply(buffer_arg) {
  return passwords_v1_pb.PasswordInfoReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_passwords_v1_PasswordValidReply(arg) {
  if (!(arg instanceof passwords_v1_pb.PasswordValidReply)) {
    throw new Error('Expected argument of type passwords_v1.PasswordValidReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_passwords_v1_PasswordValidReply(buffer_arg) {
  return passwords_v1_pb.PasswordValidReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_passwords_v1_PasswordValueReply(arg) {
  if (!(arg instanceof passwords_v1_pb.PasswordValueReply)) {
    throw new Error('Expected argument of type passwords_v1.PasswordValueReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_passwords_v1_PasswordValueReply(buffer_arg) {
  return passwords_v1_pb.PasswordValueReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_passwords_v1_PasswordValueRequest(arg) {
  if (!(arg instanceof passwords_v1_pb.PasswordValueRequest)) {
    throw new Error('Expected argument of type passwords_v1.PasswordValueRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_passwords_v1_PasswordValueRequest(buffer_arg) {
  return passwords_v1_pb.PasswordValueRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// The passwords service definition.
var PasswordsService = exports.PasswordsService = {
  get_password_info: {
    path: '/passwords_v1.Passwords/get_password_info',
    requestStream: false,
    responseStream: false,
    requestType: passwords_v1_pb.PasswordIdRequest,
    responseType: passwords_v1_pb.PasswordInfoReply,
    requestSerialize: serialize_passwords_v1_PasswordIdRequest,
    requestDeserialize: deserialize_passwords_v1_PasswordIdRequest,
    responseSerialize: serialize_passwords_v1_PasswordInfoReply,
    responseDeserialize: deserialize_passwords_v1_PasswordInfoReply,
  },
  validate_password: {
    path: '/passwords_v1.Passwords/validate_password',
    requestStream: false,
    responseStream: false,
    requestType: passwords_v1_pb.PasswordValueRequest,
    responseType: passwords_v1_pb.PasswordEmptyReply,
    requestSerialize: serialize_passwords_v1_PasswordValueRequest,
    requestDeserialize: deserialize_passwords_v1_PasswordValueRequest,
    responseSerialize: serialize_passwords_v1_PasswordEmptyReply,
    responseDeserialize: deserialize_passwords_v1_PasswordEmptyReply,
  },
  set_password: {
    path: '/passwords_v1.Passwords/set_password',
    requestStream: false,
    responseStream: false,
    requestType: passwords_v1_pb.PasswordIdAndValueRequest,
    responseType: passwords_v1_pb.PasswordEmptyReply,
    requestSerialize: serialize_passwords_v1_PasswordIdAndValueRequest,
    requestDeserialize: deserialize_passwords_v1_PasswordIdAndValueRequest,
    responseSerialize: serialize_passwords_v1_PasswordEmptyReply,
    responseDeserialize: deserialize_passwords_v1_PasswordEmptyReply,
  },
  set_temp_password: {
    path: '/passwords_v1.Passwords/set_temp_password',
    requestStream: false,
    responseStream: false,
    requestType: passwords_v1_pb.PasswordIdRequest,
    responseType: passwords_v1_pb.PasswordValueReply,
    requestSerialize: serialize_passwords_v1_PasswordIdRequest,
    requestDeserialize: deserialize_passwords_v1_PasswordIdRequest,
    responseSerialize: serialize_passwords_v1_PasswordValueReply,
    responseDeserialize: deserialize_passwords_v1_PasswordValueReply,
  },
  delete_password: {
    path: '/passwords_v1.Passwords/delete_password',
    requestStream: false,
    responseStream: false,
    requestType: passwords_v1_pb.PasswordIdRequest,
    responseType: passwords_v1_pb.PasswordEmptyReply,
    requestSerialize: serialize_passwords_v1_PasswordIdRequest,
    requestDeserialize: deserialize_passwords_v1_PasswordIdRequest,
    responseSerialize: serialize_passwords_v1_PasswordEmptyReply,
    responseDeserialize: deserialize_passwords_v1_PasswordEmptyReply,
  },
  authenticate: {
    path: '/passwords_v1.Passwords/authenticate',
    requestStream: false,
    responseStream: false,
    requestType: passwords_v1_pb.PasswordIdAndValueRequest,
    responseType: passwords_v1_pb.PasswordAuthenticateReply,
    requestSerialize: serialize_passwords_v1_PasswordIdAndValueRequest,
    requestDeserialize: deserialize_passwords_v1_PasswordIdAndValueRequest,
    responseSerialize: serialize_passwords_v1_PasswordAuthenticateReply,
    responseDeserialize: deserialize_passwords_v1_PasswordAuthenticateReply,
  },
  change_password: {
    path: '/passwords_v1.Passwords/change_password',
    requestStream: false,
    responseStream: false,
    requestType: passwords_v1_pb.PasswordIdAndValuesRequest,
    responseType: passwords_v1_pb.PasswordEmptyReply,
    requestSerialize: serialize_passwords_v1_PasswordIdAndValuesRequest,
    requestDeserialize: deserialize_passwords_v1_PasswordIdAndValuesRequest,
    responseSerialize: serialize_passwords_v1_PasswordEmptyReply,
    responseDeserialize: deserialize_passwords_v1_PasswordEmptyReply,
  },
  validate_code: {
    path: '/passwords_v1.Passwords/validate_code',
    requestStream: false,
    responseStream: false,
    requestType: passwords_v1_pb.PasswordIdAndCodeRequest,
    responseType: passwords_v1_pb.PasswordValidReply,
    requestSerialize: serialize_passwords_v1_PasswordIdAndCodeRequest,
    requestDeserialize: deserialize_passwords_v1_PasswordIdAndCodeRequest,
    responseSerialize: serialize_passwords_v1_PasswordValidReply,
    responseDeserialize: deserialize_passwords_v1_PasswordValidReply,
  },
  reset_password: {
    path: '/passwords_v1.Passwords/reset_password',
    requestStream: false,
    responseStream: false,
    requestType: passwords_v1_pb.PasswordIdAndCodeAndValueRequest,
    responseType: passwords_v1_pb.PasswordEmptyReply,
    requestSerialize: serialize_passwords_v1_PasswordIdAndCodeAndValueRequest,
    requestDeserialize: deserialize_passwords_v1_PasswordIdAndCodeAndValueRequest,
    responseSerialize: serialize_passwords_v1_PasswordEmptyReply,
    responseDeserialize: deserialize_passwords_v1_PasswordEmptyReply,
  },
  recover_password: {
    path: '/passwords_v1.Passwords/recover_password',
    requestStream: false,
    responseStream: false,
    requestType: passwords_v1_pb.PasswordIdRequest,
    responseType: passwords_v1_pb.PasswordEmptyReply,
    requestSerialize: serialize_passwords_v1_PasswordIdRequest,
    requestDeserialize: deserialize_passwords_v1_PasswordIdRequest,
    responseSerialize: serialize_passwords_v1_PasswordEmptyReply,
    responseDeserialize: deserialize_passwords_v1_PasswordEmptyReply,
  },
};

exports.PasswordsClient = grpc.makeGenericClientConstructor(PasswordsService);
