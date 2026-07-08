declare module "i2c" {
    import { EventEmitter } from "events";

    type I2CCallback<T = void> = (err: Error | null, result: T) => void;
    type I2CVoidCallback = (err: Error | null) => void;

    interface I2COptions {
        device?: string;
        _DeviceClass?: unknown;
    }

    interface I2CStreamData {
        address: number;
        data: Buffer;
        cmd: number;
        length: number;
        timestamp: number;
    }

    class I2C extends EventEmitter {
        constructor(address: number, options?: I2COptions);

        address: number;
        options: Required<Pick<I2COptions, "device">> & Omit<I2COptions, "device">;

        scan(callback?: I2CCallback<number[]>): void;

        setAddress(address: number): void;

        open(device: string, callback?: I2CVoidCallback): void;

        close(): void;

        write(buffer: Buffer | number[], callback?: I2CVoidCallback): void;

        writeByte(byte: number, callback?: I2CVoidCallback): void;

        writeBytes(
            command: number,
            buffer: Buffer | number[],
            callback?: I2CVoidCallback
        ): void;

        read(length: number, callback?: I2CCallback<Buffer>): void;

        readByte(callback?: I2CCallback<number>): void;

        readBytes(
            command: number,
            length: number,
            callback?: I2CCallback<Buffer>
        ): void;

        stream(command: number, length: number, delay?: number): void;

        stopStream(): void;

        on(event: "open", listener: () => void): this;
        on(event: "error", listener: (err: Error) => void): this;
        on(event: "data", listener: (data: I2CStreamData) => void): this;
        on(event: string | symbol, listener: (...args: any[]) => void): this;

        once(event: "open", listener: () => void): this;
        once(event: "error", listener: (err: Error) => void): this;
        once(event: "data", listener: (data: I2CStreamData) => void): this;
        once(event: string | symbol, listener: (...args: any[]) => void): this;

        emit(event: "open"): boolean;
        emit(event: "error", err: Error): boolean;
        emit(event: "data", data: I2CStreamData): boolean;
        emit(event: string | symbol, ...args: any[]): boolean;
    }

    export = I2C;
}