import {AbstractEntity} from './abstract-entity';
import {Toast, ToasterService} from 'angular2-toaster';
import {JsonConvert, ValueCheckingMode} from 'json2typescript';
import * as jMoment from 'moment-jalaali';

export class Helper {
    static equals(a, b) {
        if (a && b) {
            if (typeof a === typeof b && a instanceof AbstractEntity) {
                return a.id === b.id;
            } else {
                return a === b;
            }
        }
        return false;
    }
    static parse_jwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    static showToast(toasterService: ToasterService, type: string, title: string, body: string) {

        const toast: Toast = {
            type: type,
            title: title,
            body: body,
        };
        toasterService.popAsync(toast);
    }

    static toastError(toasterService: ToasterService, error) {
        const errors = error.error.errors;
        if (errors) {
            Object.keys(errors).forEach(function (v) {
                let message = '<ul>';
                errors[v].forEach(function (text) {
                    message += '<li>' + text + '</li>';
                });
                message += '</ul>';
                Helper.showToast(toasterService, 'error', v, message);
            });
        } else {
            Helper.showToast(toasterService, 'error', '', error.error.message);
        }
    }

    static convertToEntities(data, entityType) {
        const entities = [];
        const jsonConvert: JsonConvert = new JsonConvert();
        jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
        data.forEach(function (v) {
            const entity = jsonConvert.deserialize(v, entityType);
            entity.init();
            entities.push(entity);
        });
        return entities;
    }

    static convertToEntity(data, entityType) {
        const jsonConvert: JsonConvert = new JsonConvert();
        jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
        const entity = jsonConvert.deserialize(data, entityType);
        entity.init();
        return entity;
    }

    static toJalali(date, format = 'YYYY-MM-DD HH:mm:ss') {
        return jMoment(date, 'YYYY-MM-DD HH:mm:ss').locale('fa').format(format);
    }
}