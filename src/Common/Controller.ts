import { IDeviceData } from '@ha/IDeviceData';
import { Entity } from '@ha/base/Entity';
import { Dictionary } from '@utils/Dictionary';
import { IBLEDevice } from 'ESPHome/types/IBLEDevice';
import { IController } from './IController';

export class Controller implements IController<number[]> {
  entities: Dictionary<Entity> = {};

  constructor(
    public deviceData: IDeviceData,
    private bleDevice: IBLEDevice,
    public name: string,
    private handle: number,
    private stayConnected?: boolean
  ) {}

  writeCommand = async (bytes: number[]) => {
    await this.bleDevice.connect();
    await this.bleDevice.writeCharacteristic(this.handle, new Uint8Array(bytes));
    if (!this.stayConnected) await this.bleDevice.disconnect();
  };
}
