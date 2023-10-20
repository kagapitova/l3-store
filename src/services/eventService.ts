export class EventService {
    apiUrl: string
    apiMethod: string;

    constructor() {
        this.apiUrl = '/api/sendEvent';
        this.apiMethod = 'POST';
    }
    send(data: object) {
        fetch(this.apiUrl, {
            method: this.apiMethod,
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }
}