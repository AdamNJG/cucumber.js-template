import { Guid } from "guid-typescript";
import { SettingDto } from "./SettingDto";


export class SettingsDto{

    SubjectGuid: Guid;
    Settings : SettingDto[];

    constructor(subjectGuid: Guid, settings: SettingDto[]){
        this.SubjectGuid = subjectGuid;
        this.Settings = settings;
    }
}