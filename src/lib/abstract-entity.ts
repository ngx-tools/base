import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject
export abstract class AbstractEntity {
    public _name: string;

    @JsonProperty('id', Number)
    public id: number = undefined;
    actions = true;

    abstract init();

    toString(): string {
        return String(this.id);
    }
}
