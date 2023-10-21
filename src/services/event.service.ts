type EventType = {
    type: string,
    payload: object,
    timestamp: number
}

export class EventService {
    apiUrl: string
    apiMethod: string;

    constructor() {
        this.apiUrl = '/api/sendEvent';
        this.apiMethod = 'POST';
    }
    send(event: EventType) {
        fetch(this.apiUrl, {
            method: this.apiMethod,
            body: JSON.stringify(event)
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }
}