// package: passwords_v1
// file: passwords_v1.proto

import * as jspb from "google-protobuf";

export class ErrorDescription extends jspb.Message {
  getType(): string;
  setType(value: string): void;

  getCategory(): string;
  setCategory(value: string): void;

  getCode(): string;
  setCode(value: string): void;

  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getStatus(): string;
  setStatus(value: string): void;

  getMessage(): string;
  setMessage(value: string): void;

  getCause(): string;
  setCause(value: string): void;

  getStackTrace(): string;
  setStackTrace(value: string): void;

  getDetailsMap(): jspb.Map<string, string>;
  clearDetailsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ErrorDescription.AsObject;
  static toObject(includeInstance: boolean, msg: ErrorDescription): ErrorDescription.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ErrorDescription, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ErrorDescription;
  static deserializeBinaryFromReader(message: ErrorDescription, reader: jspb.BinaryReader): ErrorDescription;
}

export namespace ErrorDescription {
  export type AsObject = {
    type: string,
    category: string,
    code: string,
    correlationId: string,
    status: string,
    message: string,
    cause: string,
    stackTrace: string,
    detailsMap: Array<[string, string]>,
  }
}

export class PagingParams extends jspb.Message {
  getSkip(): number;
  setSkip(value: number): void;

  getTake(): number;
  setTake(value: number): void;

  getTotal(): boolean;
  setTotal(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PagingParams.AsObject;
  static toObject(includeInstance: boolean, msg: PagingParams): PagingParams.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PagingParams, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PagingParams;
  static deserializeBinaryFromReader(message: PagingParams, reader: jspb.BinaryReader): PagingParams;
}

export namespace PagingParams {
  export type AsObject = {
    skip: number,
    take: number,
    total: boolean,
  }
}

export class PasswordInfo extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getChangeTime(): string;
  setChangeTime(value: string): void;

  getLocked(): boolean;
  setLocked(value: boolean): void;

  getLockTime(): string;
  setLockTime(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PasswordInfo.AsObject;
  static toObject(includeInstance: boolean, msg: PasswordInfo): PasswordInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PasswordInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PasswordInfo;
  static deserializeBinaryFromReader(message: PasswordInfo, reader: jspb.BinaryReader): PasswordInfo;
}

export namespace PasswordInfo {
  export type AsObject = {
    id: string,
    changeTime: string,
    locked: boolean,
    lockTime: string,
  }
}

export class PasswordIdRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PasswordIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PasswordIdRequest): PasswordIdRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PasswordIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PasswordIdRequest;
  static deserializeBinaryFromReader(message: PasswordIdRequest, reader: jspb.BinaryReader): PasswordIdRequest;
}

export namespace PasswordIdRequest {
  export type AsObject = {
    correlationId: string,
    userId: string,
  }
}

export class PasswordValueRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PasswordValueRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PasswordValueRequest): PasswordValueRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PasswordValueRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PasswordValueRequest;
  static deserializeBinaryFromReader(message: PasswordValueRequest, reader: jspb.BinaryReader): PasswordValueRequest;
}

export namespace PasswordValueRequest {
  export type AsObject = {
    correlationId: string,
    password: string,
  }
}

export class PasswordIdAndValueRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PasswordIdAndValueRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PasswordIdAndValueRequest): PasswordIdAndValueRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PasswordIdAndValueRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PasswordIdAndValueRequest;
  static deserializeBinaryFromReader(message: PasswordIdAndValueRequest, reader: jspb.BinaryReader): PasswordIdAndValueRequest;
}

export namespace PasswordIdAndValueRequest {
  export type AsObject = {
    correlationId: string,
    userId: string,
    password: string,
  }
}

export class PasswordIdAndValuesRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  getOldPassword(): string;
  setOldPassword(value: string): void;

  getNewPassword(): string;
  setNewPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PasswordIdAndValuesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PasswordIdAndValuesRequest): PasswordIdAndValuesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PasswordIdAndValuesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PasswordIdAndValuesRequest;
  static deserializeBinaryFromReader(message: PasswordIdAndValuesRequest, reader: jspb.BinaryReader): PasswordIdAndValuesRequest;
}

export namespace PasswordIdAndValuesRequest {
  export type AsObject = {
    correlationId: string,
    userId: string,
    oldPassword: string,
    newPassword: string,
  }
}

export class PasswordIdAndCodeRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  getCode(): string;
  setCode(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PasswordIdAndCodeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PasswordIdAndCodeRequest): PasswordIdAndCodeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PasswordIdAndCodeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PasswordIdAndCodeRequest;
  static deserializeBinaryFromReader(message: PasswordIdAndCodeRequest, reader: jspb.BinaryReader): PasswordIdAndCodeRequest;
}

export namespace PasswordIdAndCodeRequest {
  export type AsObject = {
    correlationId: string,
    userId: string,
    code: string,
  }
}

export class PasswordIdAndCodeAndValueRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  getCode(): string;
  setCode(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PasswordIdAndCodeAndValueRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PasswordIdAndCodeAndValueRequest): PasswordIdAndCodeAndValueRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PasswordIdAndCodeAndValueRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PasswordIdAndCodeAndValueRequest;
  static deserializeBinaryFromReader(message: PasswordIdAndCodeAndValueRequest, reader: jspb.BinaryReader): PasswordIdAndCodeAndValueRequest;
}

export namespace PasswordIdAndCodeAndValueRequest {
  export type AsObject = {
    correlationId: string,
    userId: string,
    code: string,
    password: string,
  }
}

export class PasswordInfoReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  hasInfo(): boolean;
  clearInfo(): void;
  getInfo(): PasswordInfo | undefined;
  setInfo(value?: PasswordInfo): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PasswordInfoReply.AsObject;
  static toObject(includeInstance: boolean, msg: PasswordInfoReply): PasswordInfoReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PasswordInfoReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PasswordInfoReply;
  static deserializeBinaryFromReader(message: PasswordInfoReply, reader: jspb.BinaryReader): PasswordInfoReply;
}

export namespace PasswordInfoReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
    info?: PasswordInfo.AsObject,
  }
}

export class PasswordEmptyReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PasswordEmptyReply.AsObject;
  static toObject(includeInstance: boolean, msg: PasswordEmptyReply): PasswordEmptyReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PasswordEmptyReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PasswordEmptyReply;
  static deserializeBinaryFromReader(message: PasswordEmptyReply, reader: jspb.BinaryReader): PasswordEmptyReply;
}

export namespace PasswordEmptyReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
  }
}

export class PasswordValueReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PasswordValueReply.AsObject;
  static toObject(includeInstance: boolean, msg: PasswordValueReply): PasswordValueReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PasswordValueReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PasswordValueReply;
  static deserializeBinaryFromReader(message: PasswordValueReply, reader: jspb.BinaryReader): PasswordValueReply;
}

export namespace PasswordValueReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
    password: string,
  }
}

export class PasswordAuthenticateReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  getAuthenticated(): boolean;
  setAuthenticated(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PasswordAuthenticateReply.AsObject;
  static toObject(includeInstance: boolean, msg: PasswordAuthenticateReply): PasswordAuthenticateReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PasswordAuthenticateReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PasswordAuthenticateReply;
  static deserializeBinaryFromReader(message: PasswordAuthenticateReply, reader: jspb.BinaryReader): PasswordAuthenticateReply;
}

export namespace PasswordAuthenticateReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
    authenticated: boolean,
  }
}

export class PasswordValidReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  getValid(): boolean;
  setValid(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PasswordValidReply.AsObject;
  static toObject(includeInstance: boolean, msg: PasswordValidReply): PasswordValidReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PasswordValidReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PasswordValidReply;
  static deserializeBinaryFromReader(message: PasswordValidReply, reader: jspb.BinaryReader): PasswordValidReply;
}

export namespace PasswordValidReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
    valid: boolean,
  }
}

