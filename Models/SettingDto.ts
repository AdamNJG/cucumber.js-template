
export class SettingDto{

    SettingType : string;
    ValueOf: string;

    constructor(settingType: string, valueOf: string){
        this.SettingType = settingType;
        this.ValueOf = valueOf;
    }
}