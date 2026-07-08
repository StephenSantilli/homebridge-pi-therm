import I2C from "i2c"

const ADDRESS = 0x44;
const DEVICE = "/dev/i2c-1";

export type SensorReading = {
    temperature: number,
    humidity: number
}

export function initSensor(): Promise<I2C> {

    return new Promise<I2C>(async (res, rej) => {

        const sensor = new I2C(ADDRESS, { device: DEVICE });

        sensor.on("error", rej);

        sensor.on("open", () => res(sensor));

    })

}

export function readSHT(sensor: I2C): Promise<SensorReading> {

    return new Promise<SensorReading>(async (res, rej) => {

        sensor.write([0x2C, 0x06], (err) => {

            if (err)
                return rej(err)

            sensor.read(6, (err, data) => {

                if (err)
                    return rej(err);
                

                const tRaw = (data[0] << 8) | data[1];
                const hRaw = (data[3] << 8) | data[4];

                const tempF = -49.0 + (315.0 * tRaw) / 65535.0;
                const humidity = (100.0 * hRaw) / 65535.0;

                return res({
                    temperature: tempF,
                    humidity: humidity
                })

            });

        });

    })

}