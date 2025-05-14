import { InjectionToken } from "@angular/core";
import { environment } from "../environments/environment";

export interface AppSettings {
    title: string;
    version: string;
    apiUrl: string;
}

export const appSettings: AppSettings = {
    title: 'My e-shop',
    version: '1.0.0',
    apiUrl: environment.apiUrl,
};

export const APP_SETTINGS = new InjectionToken<AppSettings>('app.settings');