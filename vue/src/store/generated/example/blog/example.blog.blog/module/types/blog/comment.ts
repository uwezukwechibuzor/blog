/* eslint-disable */
import * as Long from 'long'
import { util, configure, Writer, Reader } from 'protobufjs/minimal'

export const protobufPackage = 'example.blog.blog'

export interface Comment {
  creator: string
  id: string
  body: string
  postID: string
}

export interface MsgCreateComment {
  creator: string
  body: string
  postID: string
  t: number
}

const baseComment: object = { creator: '', id: '', body: '', postID: '' }

export const Comment = {
  encode(message: Comment, writer: Writer = Writer.create()): Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator)
    }
    if (message.id !== '') {
      writer.uint32(18).string(message.id)
    }
    if (message.body !== '') {
      writer.uint32(26).string(message.body)
    }
    if (message.postID !== '') {
      writer.uint32(34).string(message.postID)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Comment {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseComment } as Comment
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string()
          break
        case 2:
          message.id = reader.string()
          break
        case 3:
          message.body = reader.string()
          break
        case 4:
          message.postID = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Comment {
    const message = { ...baseComment } as Comment
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id)
    } else {
      message.id = ''
    }
    if (object.body !== undefined && object.body !== null) {
      message.body = String(object.body)
    } else {
      message.body = ''
    }
    if (object.postID !== undefined && object.postID !== null) {
      message.postID = String(object.postID)
    } else {
      message.postID = ''
    }
    return message
  },

  toJSON(message: Comment): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = message.creator)
    message.id !== undefined && (obj.id = message.id)
    message.body !== undefined && (obj.body = message.body)
    message.postID !== undefined && (obj.postID = message.postID)
    return obj
  },

  fromPartial(object: DeepPartial<Comment>): Comment {
    const message = { ...baseComment } as Comment
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id
    } else {
      message.id = ''
    }
    if (object.body !== undefined && object.body !== null) {
      message.body = object.body
    } else {
      message.body = ''
    }
    if (object.postID !== undefined && object.postID !== null) {
      message.postID = object.postID
    } else {
      message.postID = ''
    }
    return message
  }
}

const baseMsgCreateComment: object = { creator: '', body: '', postID: '', t: 0 }

export const MsgCreateComment = {
  encode(message: MsgCreateComment, writer: Writer = Writer.create()): Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator)
    }
    if (message.body !== '') {
      writer.uint32(18).string(message.body)
    }
    if (message.postID !== '') {
      writer.uint32(26).string(message.postID)
    }
    if (message.t !== 0) {
      writer.uint32(32).int64(message.t)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateComment {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgCreateComment } as MsgCreateComment
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string()
          break
        case 2:
          message.body = reader.string()
          break
        case 3:
          message.postID = reader.string()
          break
        case 4:
          message.t = longToNumber(reader.int64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgCreateComment {
    const message = { ...baseMsgCreateComment } as MsgCreateComment
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator)
    } else {
      message.creator = ''
    }
    if (object.body !== undefined && object.body !== null) {
      message.body = String(object.body)
    } else {
      message.body = ''
    }
    if (object.postID !== undefined && object.postID !== null) {
      message.postID = String(object.postID)
    } else {
      message.postID = ''
    }
    if (object.t !== undefined && object.t !== null) {
      message.t = Number(object.t)
    } else {
      message.t = 0
    }
    return message
  },

  toJSON(message: MsgCreateComment): unknown {
    const obj: any = {}
    message.creator !== undefined && (obj.creator = message.creator)
    message.body !== undefined && (obj.body = message.body)
    message.postID !== undefined && (obj.postID = message.postID)
    message.t !== undefined && (obj.t = message.t)
    return obj
  },

  fromPartial(object: DeepPartial<MsgCreateComment>): MsgCreateComment {
    const message = { ...baseMsgCreateComment } as MsgCreateComment
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator
    } else {
      message.creator = ''
    }
    if (object.body !== undefined && object.body !== null) {
      message.body = object.body
    } else {
      message.body = ''
    }
    if (object.postID !== undefined && object.postID !== null) {
      message.postID = object.postID
    } else {
      message.postID = ''
    }
    if (object.t !== undefined && object.t !== null) {
      message.t = object.t
    } else {
      message.t = 0
    }
    return message
  }
}

declare var self: any | undefined
declare var window: any | undefined
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis
  if (typeof self !== 'undefined') return self
  if (typeof window !== 'undefined') return window
  if (typeof global !== 'undefined') return global
  throw 'Unable to locate global object'
})()

type Builtin = Date | Function | Uint8Array | string | number | undefined
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER')
  }
  return long.toNumber()
}

if (util.Long !== Long) {
  util.Long = Long as any
  configure()
}
