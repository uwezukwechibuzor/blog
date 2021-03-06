/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';
export const protobufPackage = 'example.blog.blog';
const baseComment = { creator: '', id: '', body: '', postID: '' };
export const Comment = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (message.id !== '') {
            writer.uint32(18).string(message.id);
        }
        if (message.body !== '') {
            writer.uint32(26).string(message.body);
        }
        if (message.postID !== '') {
            writer.uint32(34).string(message.postID);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseComment };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.id = reader.string();
                    break;
                case 3:
                    message.body = reader.string();
                    break;
                case 4:
                    message.postID = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseComment };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        if (object.id !== undefined && object.id !== null) {
            message.id = String(object.id);
        }
        else {
            message.id = '';
        }
        if (object.body !== undefined && object.body !== null) {
            message.body = String(object.body);
        }
        else {
            message.body = '';
        }
        if (object.postID !== undefined && object.postID !== null) {
            message.postID = String(object.postID);
        }
        else {
            message.postID = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.id !== undefined && (obj.id = message.id);
        message.body !== undefined && (obj.body = message.body);
        message.postID !== undefined && (obj.postID = message.postID);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseComment };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        if (object.id !== undefined && object.id !== null) {
            message.id = object.id;
        }
        else {
            message.id = '';
        }
        if (object.body !== undefined && object.body !== null) {
            message.body = object.body;
        }
        else {
            message.body = '';
        }
        if (object.postID !== undefined && object.postID !== null) {
            message.postID = object.postID;
        }
        else {
            message.postID = '';
        }
        return message;
    }
};
const baseMsgCreateComment = { creator: '', body: '', postID: '' };
export const MsgCreateComment = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (message.body !== '') {
            writer.uint32(18).string(message.body);
        }
        if (message.postID !== '') {
            writer.uint32(26).string(message.postID);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateComment };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.body = reader.string();
                    break;
                case 3:
                    message.postID = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgCreateComment };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        if (object.body !== undefined && object.body !== null) {
            message.body = String(object.body);
        }
        else {
            message.body = '';
        }
        if (object.postID !== undefined && object.postID !== null) {
            message.postID = String(object.postID);
        }
        else {
            message.postID = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.body !== undefined && (obj.body = message.body);
        message.postID !== undefined && (obj.postID = message.postID);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgCreateComment };
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        if (object.body !== undefined && object.body !== null) {
            message.body = object.body;
        }
        else {
            message.body = '';
        }
        if (object.postID !== undefined && object.postID !== null) {
            message.postID = object.postID;
        }
        else {
            message.postID = '';
        }
        return message;
    }
};
