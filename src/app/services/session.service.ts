import { Injectable } from '@angular/core';
import { Config } from '../models/config';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    private _config: Config | undefined;
    public get config(): Config | undefined {
        return this._config;
    }
    public set config(v: Config | undefined) {
        this._config = v;
    }
}